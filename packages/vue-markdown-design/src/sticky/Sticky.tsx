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
    const wrapperStyle = computed(() => {
      const { flow, posY, posX } = props
      if (flow) return
      const keys = posY === 'bottom' ? 'marginTop' : 'marginBottom'
      const rightStyle = posX === 'right' ? { display: 'flex', justifyContent: 'right' } : {}
      return {
        [keys]: `-${addUnit(wrapperBounding.height.value)}`,
        ...rightStyle
      }
    })

    return () => (
      <div
        class={name}
        style={{ [props.posY]: addUnit(Number(props.offset)), zIndex: props.zIndex }}
      >
        <div ref={wrapper} style={wrapperStyle.value}>
          {slots.default?.()}
        </div>
      </div>
    )
  }
})
