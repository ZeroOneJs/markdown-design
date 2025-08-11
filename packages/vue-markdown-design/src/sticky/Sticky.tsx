import './index.less'
import { computed, defineComponent, ref, shallowRef, watchEffect, type PropType } from 'vue'
import { addUnit, allToArray, createNamespace } from '../utils/format'
import type { UnionStr } from '../utils/types'
import {
  clamp,
  useElementBounding,
  useResizeObserver,
  useWindowSize,
  type MaybeElement
} from '@vueuse/core'
import { useElement } from '../hooks/use-element'
import { useScrollParent } from '../hooks/use-scroll-element'
import type { StickyPosX, StickyPosY } from './type'

const { name, addPrefix } = createNamespace('sticky')

export const stickyProps = {
  posY: {
    type: String as PropType<UnionStr<StickyPosY>>,
    default: 'top'
  },
  posX: {
    type: String as PropType<UnionStr<StickyPosX>>,
    default: 'left'
  },
  offset: {
    type: [Number, String, Array] as PropType<string | number | (string | number)[]>,
    default: () => []
  },
  flow: {
    type: Boolean,
    default: true
  },
  target: [String, Object] as PropType<string | MaybeElement>,
  zIndex: {
    type: [String, Number],
    default: 'var(--vmd-base-z-index)'
  }
}

export default defineComponent({
  name,
  props: stickyProps,
  setup(props, { slots }) {
    const transform = ref(0)

    const fixed = ref(false)

    const { width: windowWidth, height: windowHeight } = useWindowSize()

    const content = shallowRef<HTMLDivElement>()
    const { height: contentHeight } = useElementBounding(content)
    const contentStyle = computed(() =>
      fixed.value && transform.value ? { transform: `translateY(${addUnit(transform.value)})` } : {}
    )

    const root = shallowRef<HTMLElement>()
    const { width: rootWidth, top: rootTop, bottom: rootBottom } = useElementBounding(root)
    const rootStyle = computed(() =>
      fixed.value && props.flow ? { height: addUnit(contentHeight.value) } : {}
    )

    const { targetEl } = useElement(() => props.target)
    const targetRect = useElementBounding(targetEl)

    const { scrollEl } = useScrollParent(root, { onlyParent: false })

    const isBottom = (posY: typeof props.posY) => posY === 'bottom'

    const isPosBottom = computed(() => isBottom(props.posY))
    const movingRect = ref({
      top: 0,
      bottom: 0
    })
    const rectRight = computed(() => {
      const { flow, posX, target } = props
      if (flow || posX !== 'right') return
      if (target) return targetRect.right.value
      const { right = 0 } = scrollEl.value[0]?.getBoundingClientRect() || {} // 默认值为 0 表示默认紧贴窗口右侧
      return right
    })
    const wrapperStyle = computed(() => {
      if (!fixed.value) return {}
      const { top, bottom } = movingRect.value
      const { flow, zIndex } = props
      const base = {
        right: rectRight.value && addUnit(windowWidth.value - rectRight.value),
        [flow ? 'width' : `maxWidth`]: addUnit(rootWidth.value), // width 模拟正常 div 宽度；maxWidth 使没有宽度且内容宽度过大的子元素不至于超出 root 的宽度
        height: addUnit(clamp(bottom - top, 0, contentHeight.value)),
        position: 'fixed',
        zIndex
      }
      if (isPosBottom.value) {
        return {
          ...base,
          display: 'grid',
          alignContent: 'end',
          bottom: addUnit(windowHeight.value - bottom)
        }
      }
      return {
        ...base,
        top: addUnit(top)
      }
    })

    const offsetArr = computed(() => allToArray(props.offset).map(Number))
    const getBoundaryValues = (posY: StickyPosY) => {
      const curIsBottom = isBottom(posY)
      const rawValues = [
        ...scrollEl.value.map((el) => el.getBoundingClientRect()[posY]),
        curIsBottom ? windowHeight.value : 0
      ]
      const mathFn = Math[curIsBottom ? 'min' : 'max']
      if (posY !== props.posY) return [mathFn(...rawValues)]
      const offsetValues = rawValues.map((item, index) => {
        const offset = offsetArr.value[index] || 0
        const sign = isPosBottom.value ? -1 : 1
        return item + offset * sign
      })
      const target = mathFn(...offsetValues)
      return [target, rawValues[offsetValues.indexOf(target)]]
    }
    const elPositions = computed(() => {
      const [scrollTop, scrollRawTop] = getBoundaryValues('top')
      const [scrollBottom, scrollRawBottom] = getBoundaryValues('bottom')
      return {
        rootTop: rootTop.value,
        rootBottom: rootBottom.value,
        targetTop: targetRect.top.value,
        targetBottom: targetRect.bottom.value,
        scrollTop,
        scrollBottom,
        scrollRawVal: scrollRawTop ?? scrollRawBottom
      }
    })
    const getTransform = (top: number, bottom: number) => {
      return Math.max(contentHeight.value - (bottom - top), 0)
    }
    const update = () => {
      const { target, flow } = props
      const {
        rootTop,
        rootBottom,
        targetTop,
        targetBottom,
        scrollTop,
        scrollBottom,
        scrollRawVal
      } = elPositions.value
      if (isPosBottom.value) {
        fixed.value = !flow || (scrollBottom < rootBottom && (!target || scrollRawVal > targetTop))
        if (!fixed.value) return
        if (target) {
          transform.value = getTransform(targetTop, scrollRawVal)
          const contentBottom = clamp(targetTop + contentHeight.value, scrollBottom, scrollRawVal)
          movingRect.value = {
            top: Math.max(scrollTop, targetTop),
            bottom: Math.min(contentBottom, targetBottom)
          }
        } else {
          movingRect.value = { top: scrollTop, bottom: scrollBottom }
        }
        return
      }
      fixed.value = !flow || (scrollTop > rootTop && (!target || targetBottom > scrollRawVal))
      if (!fixed.value) return
      if (target) {
        transform.value = -getTransform(scrollRawVal, targetBottom)
        const contentTop = clamp(targetBottom - contentHeight.value, scrollRawVal, scrollTop)
        movingRect.value = {
          top: Math.max(contentTop, targetTop),
          bottom: Math.min(scrollBottom, targetBottom)
        }
      } else {
        movingRect.value = { top: scrollTop, bottom: scrollBottom }
      }
    }

    watchEffect(update)
    useResizeObserver(scrollEl, update)

    return () => (
      <div class={name} ref={root} style={rootStyle.value}>
        <div class={addPrefix('__wrapper')} style={wrapperStyle.value}>
          <div ref={content} style={contentStyle.value}>
            {slots.default?.()}
          </div>
        </div>
      </div>
    )
  }
})
