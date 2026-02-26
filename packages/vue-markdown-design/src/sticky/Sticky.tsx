import './index.less'
import { computed, defineComponent, shallowRef, type PropType } from 'vue'
import { addUnit, createNamespace } from '../utils/format'
import type { UnionStr } from '../utils/types'
import { useElementBounding } from '@vueuse/core'

const { name } = createNamespace('sticky')

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
    zIndex: {
      type: [String, Number],
      default: 'var(--vmd-base-z-index)'
    }
  },
  setup(props, { slots }) {
    const wrapper = shallowRef<HTMLDivElement>()
    const wrapperBounding = useElementBounding(wrapper)

    const rootStyle = computed(() => {
      const { flow, posY, posX, zIndex, offset } = props
      const style = { [posY]: addUnit(Number(offset)), zIndex }
      if (!flow) {
        style[posX === 'right' ? 'marginLeft' : 'marginRight'] = 'auto'
        const width = wrapperBounding.width.value
        if (width) style.width = addUnit(width)
      }
      return style
    })

    const wrapperStyle = computed(() => {
      const { flow, posY } = props
      if (flow) return
      const margin = posY === 'bottom' ? 'marginTop' : 'marginBottom'
      return {
        [margin]: `-${addUnit(wrapperBounding.height.value)}`,
        display: 'table'
      }
    })

    return () => (
      <div class={name} style={rootStyle.value}>
        <div ref={wrapper} style={wrapperStyle.value}>
          {slots.default?.()}
        </div>
      </div>
    )
  }
})
