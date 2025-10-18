import './index.less'
import {
  computed,
  defineComponent,
  ref,
  shallowRef,
  watchEffect,
  type CSSProperties,
  type MaybeRefOrGetter,
  type PropType
} from 'vue'
import { addUnit, createNamespace } from '../utils/format'
import type { UnionStr } from '../utils/types'
import {
  clamp,
  toValue,
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
    target: [String, Object, Function] as PropType<MaybeRefOrGetter<string | MaybeElement>>,
    zIndex: {
      type: [String, Number],
      default: 'var(--vmd-base-z-index)'
    }
  },
  setup(props, { slots }) {
    const fixed = ref(false)
    const ceilingHeight = ref(0)

    const { width: windowWidth, height: windowHeight } = useWindowSize()

    const content = shallowRef<HTMLDivElement>()
    const { height: contentHeight } = useElementBounding(content)
    const contentStyle = computed(() => {
      if (!fixed.value) return
      const translateY = ceilingHeight.value - contentHeight.value
      return !!translateY && { transform: `translateY(${addUnit(translateY)})` }
    })

    const root = shallowRef<HTMLElement>()
    const { width: rootWidth, top: rootTop, bottom: rootBottom } = useElementBounding(root)
    const rootStyle = computed(() =>
      fixed.value && props.flow ? { height: addUnit(contentHeight.value) } : {}
    )

    const { targetEl } = useElement(() => toValue(props.target))
    const {
      top: targetTop,
      bottom: targetBottom,
      right: targetRight
    } = useElementBounding(targetEl)

    const boundingStyle = ref<CSSProperties>({})
    const wrapperStyle = computed(() => {
      const { flow, zIndex, posX } = props
      if (!fixed.value) return !flow && { height: 0 } // 高度为 0 防止内容消失时闪烁问题
      const right =
        !flow && posX === 'right'
          ? targetRight.value && addUnit(windowWidth.value - targetRight.value)
          : undefined
      return {
        right,
        [flow ? 'width' : `maxWidth`]: addUnit(rootWidth.value), // width 模拟正常 div 宽度；maxWidth 使没有宽度且内容宽度过大的子元素不至于超出 root 的宽度
        position: 'fixed' as const,
        zIndex,
        ...boundingStyle.value
      }
    })

    const { scrollEl } = useScrollParent(root, { onlyParent: false })

    const getScrollY = () => {
      const domRects = scrollEl.value.map((el) => el.getBoundingClientRect())
      const scrollTops = [...domRects.map((el) => el.top), 0]
      const scrollBottoms = [...domRects.map((el) => el.bottom), windowHeight.value]
      return {
        scrollTop: Math.max(...scrollTops),
        scrollBottom: Math.min(...scrollBottoms),
        scrollTops,
        scrollBottoms
      }
    }
    const offsetWithNum = computed(() => Number(props.offset))
    const update = () => {
      const { scrollTop, scrollBottom, scrollTops, scrollBottoms } = getScrollY()
      const { flow, posY } = props

      const dynamicTop = Math.max(scrollTop, targetTop.value)
      const dynamicBottom = Math.min(scrollBottom, targetBottom.value)

      fixed.value = dynamicBottom > dynamicTop
      if (!fixed.value) return
      const safeHeight = clamp(scrollBottom - scrollTop, 0, contentHeight.value)

      if (posY === 'bottom') {
        const [parentBottom, ...others] = scrollBottoms
        const offsetBottom = parentBottom - offsetWithNum.value

        const getBottom = (minBottom: number, maxBottom: number) => {
          const relativeBottom = clamp(targetTop.value + contentHeight.value, minBottom, maxBottom)
          return Math.min(relativeBottom, targetBottom.value)
        }

        const scrollOffsetBottom = Math.min(offsetBottom, ...others)
        const bottom = getBottom(scrollOffsetBottom, scrollBottom)

        const relativeTop = getBottom(offsetBottom, parentBottom) - contentHeight.value

        const getHeight = (...tops: number[]) => clamp(bottom - Math.max(...tops), 0, safeHeight)

        // 相关顶部：scrollTop, targetTop.value, relativeTop
        const height = getHeight(dynamicTop, relativeTop)

        if (flow) {
          // Math.max(offsetBottom, scrollTop) < rootBottom.value === offsetBottom < rootBottom.value && scrollTop < rootBottom.value
          fixed.value =
            Math.max(offsetBottom, scrollTop) < rootBottom.value && relativeTop < scrollBottom
        } else {
          fixed.value = height > 0
        }
        if (!fixed.value) return

        // 相关顶部：scrollTop
        ceilingHeight.value = getHeight(scrollTop)

        boundingStyle.value = {
          bottom: addUnit(windowHeight.value - bottom),
          height: addUnit(height)
        }
      } else {
        const [parentTop, ...others] = scrollTops
        const offsetTop = parentTop + offsetWithNum.value

        const getTop = (minTop: number, maxTop: number) => {
          const relativeTop = clamp(targetBottom.value - contentHeight.value, minTop, maxTop)
          return Math.max(relativeTop, targetTop.value)
        }

        const scrollOffsetTop = Math.max(offsetTop, ...others)
        const top = getTop(scrollTop, scrollOffsetTop)

        const relativeBottom = getTop(parentTop, offsetTop) + contentHeight.value

        const getHeight = (...bottoms: number[]) => clamp(Math.min(...bottoms) - top, 0, safeHeight)

        // 相关底部：scrollBottom, targetBottom.value, relativeBottom
        const height = getHeight(dynamicBottom, relativeBottom)

        if (flow) {
          // Math.min(offsetTop, scrollBottom) > rootTop.value === offsetTop > rootTop.value && scrollBottom > rootTop.value
          fixed.value =
            Math.min(offsetTop, scrollBottom) > rootTop.value && relativeBottom > scrollTop
        } else {
          fixed.value = height > 0
        }
        if (!fixed.value) return

        // 相关底部：targetBottom.value, relativeBottom
        ceilingHeight.value = getHeight(targetBottom.value, relativeBottom)

        boundingStyle.value = {
          top: addUnit(top),
          height: addUnit(height)
        }
      }
    }

    watchEffect(update)
    useResizeObserver(scrollEl, update)

    return () => (
      <div class={name} ref={root} style={rootStyle.value}>
        <div class={addPrefix('__wrapper')} style={wrapperStyle.value}>
          <div class={addPrefix('__content')} ref={content} style={contentStyle.value}>
            {slots.default?.()}
          </div>
        </div>
      </div>
    )
  }
})
