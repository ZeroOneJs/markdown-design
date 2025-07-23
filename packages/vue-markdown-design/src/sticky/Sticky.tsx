import './index.less'
import { computed, defineComponent, ref, shallowRef, watchEffect, type PropType } from 'vue'
import { addUnit, createNamespace } from '../utils/format'
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

const { name, addPrefix } = createNamespace('sticky')

export default defineComponent({
  name,
  props: {
    posY: {
      type: String as PropType<UnionStr<'top' | 'bottom'>>,
      default: 'top'
    },
    posX: {
      type: String as PropType<UnionStr<'left' | 'right'>>,
      default: 'left'
    },
    offset: {
      type: [String, Number],
      default: 0
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
  },
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
    const getScrollRect = () => {
      const tops = [0]
      const bottoms = [windowHeight.value]
      scrollEl.value.forEach((el) => {
        const { top, bottom } = el.getBoundingClientRect()
        tops.push(top)
        bottoms.push(bottom)
      })
      return {
        top: Math.max(...tops),
        bottom: Math.min(...bottoms)
      }
    }

    const isBottom = computed(() => props.posY === 'bottom')
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
      if (isBottom.value) {
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

    const elPositions = computed(() => {
      const { top, bottom } = getScrollRect()
      return {
        rootTop: rootTop.value,
        rootBottom: rootBottom.value,
        targetTop: targetRect.top.value,
        targetBottom: targetRect.bottom.value,
        scrollTop: top,
        scrollBottom: bottom
      }
    })
    const offsetWithNum = computed(() => Number(props.offset))
    const getTransform = (top: number, bottom: number) => {
      return Math.max(contentHeight.value - (bottom - top), 0)
    }
    const update = () => {
      const { target, flow } = props
      const { rootTop, rootBottom, targetTop, targetBottom, scrollTop, scrollBottom } =
        elPositions.value
      if (isBottom.value) {
        const bottomOffset = scrollBottom - offsetWithNum.value
        fixed.value = !flow || (bottomOffset < rootBottom && (!target || scrollBottom > targetTop))
        if (!fixed.value) return
        if (target) {
          transform.value = getTransform(targetTop, scrollBottom)
          const contentBottom = clamp(targetTop + contentHeight.value, bottomOffset, scrollBottom)
          movingRect.value = {
            top: Math.max(scrollTop, targetTop),
            bottom: Math.min(contentBottom, targetBottom)
          }
        } else {
          movingRect.value = { top: scrollTop, bottom: bottomOffset }
        }
        return
      }
      const topOffset = scrollTop + offsetWithNum.value
      fixed.value = !flow || (topOffset > rootTop && (!target || targetBottom > scrollTop))
      if (!fixed.value) return
      if (target) {
        transform.value = -getTransform(scrollTop, targetBottom)
        const contentTop = clamp(targetBottom - contentHeight.value, scrollTop, topOffset)
        movingRect.value = {
          top: Math.max(contentTop, targetTop),
          bottom: Math.min(scrollBottom, targetBottom)
        }
      } else {
        movingRect.value = { top: topOffset, bottom: scrollBottom }
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
