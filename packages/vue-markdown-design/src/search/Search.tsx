import './index.less'
import Mark from 'mark.js'
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  ref,
  shallowRef,
  watch,
  withKeys,
  type PropType
} from 'vue'
import { createNamespace } from '../utils/format'
import type { UnionStr } from '../utils/types'
import { useVModels, type MaybeElement } from '@vueuse/core'
import { chain, debounce, escapeRegExp, isNumber, isString, last, omit, upperFirst } from 'lodash'
import { useElement } from '../hooks/use-element'
import { scrollToEl } from '../utils/dom'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown, faAngleUp, faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons'

const { name, addPrefix } = createNamespace('search')

export const searchProps = {
  modelValue: {
    type: [String, Number],
    default: ''
  },
  clearable: {
    type: Boolean,
    default: true
  },
  border: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<UnionStr<'huge' | 'large' | 'normal' | 'small'>>,
    default: 'huge'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: String,
  current: {
    type: Number,
    default: 0
  },
  target: [String, Object] as PropType<string | Exclude<MaybeElement, SVGAElement>>,
  offset: {
    type: [String, Number] as PropType<UnionStr<ScrollLogicalPosition> | number>,
    default: 'center'
  },
  smooth: Boolean,
  closeIcon: {
    type: Boolean,
    default: true
  },
  inputAttrs: {
    type: Object,
    default: () => ({})
  }
}
export const searchEmits = {
  'update:modelValue': (payload: string) => isString(payload),
  'update:current': (payload: number) => isNumber(payload),
  input: (payload: Event) => payload instanceof Event,
  blur: (payload: FocusEvent) => payload instanceof FocusEvent,
  focus: (payload: FocusEvent) => payload instanceof FocusEvent,
  change: (payload: Event) => payload instanceof Event,
  clear: () => true,
  close: () => true,
  toggle: (payload: UnionStr<'prev' | 'next'>) => ['prev', 'next'].includes(payload),
  totalChange: (payload: number) => isNumber(payload)
}

export default defineComponent({
  name,
  props: searchProps,
  emits: searchEmits,
  setup(props, { emit, expose, attrs }) {
    const rootClass = computed(() => {
      const { size, disabled, border } = props
      return [
        name,
        addPrefix(`--${size}`),
        { [addPrefix('--disabled')]: disabled, [addPrefix('--border')]: border }
      ]
    })

    const { modelValue, current } = useVModels(props, emit, { passive: true })

    const onToggle = (direction: 'prev' | 'next') => {
      if (props.disabled) return
      const directionMap = new Map([
        ['prev', total.value - 1],
        ['next', 1]
      ])
      const directionNum = directionMap.get(direction) as number
      current.value = (current.value + directionNum) % total.value
      selectMark()
      emit('toggle', direction)
    }

    const eventAttrs = chain(['input', 'blur', 'focus', 'change'])
      .map((key) => [`on${upperFirst(key)}`, (...arg: [any]) => emit(key as any, ...arg)])
      .fromPairs()
      .value()
    const inputAttrs = computed(() => {
      const { inputAttrs, disabled, placeholder } = props
      return {
        ...omit(attrs, ['class', 'style']),
        ...inputAttrs,
        ...eventAttrs,
        disabled,
        placeholder
      }
    })
    const onKeydown = withKeys(
      (event) => !(event.target as any)?.composing && onToggle('next'), // composing 此处的值为vue3源码中的赋值
      ['enter']
    )

    const onClear = () => {
      if (props.disabled) return
      modelValue.value = ''
      emit('clear')
    }

    let markList: HTMLElement[][] = []
    const escapedVal = computed(() => escapeRegExp(String(modelValue.value)))
    const setMarkList = (el: HTMLElement) => {
      const item = last(markList)
      const keyword = item?.map((item) => item.innerText).join('') || ''
      const regexp = new RegExp(`^${escapedVal.value}$`, 'i')
      !item || regexp.test(keyword) ? markList.push([el]) : item.push(el)
    }

    const total = ref(0)
    const setTotal = () => {
      total.value = markList.length
      emit('totalChange', total.value)
    }

    const matchesCount = computed(
      // modelValue.value !== '' 不直接判断防止值为0的情况
      () => modelValue.value !== '' && total.value && `${current.value + 1}/${total.value}`
    )

    const { targetEl } = useElement(() => props.target || document.documentElement)
    const markInstance = computed(() => {
      if (targetEl.value instanceof HTMLElement) return new Mark(targetEl.value)
      console.error('[vue-markdown-design] Target is not of the HTMLElement type.')
      return undefined
    })

    let isMounted = false
    const reset = () => {
      if (!isMounted) {
        // 防止首次赋值被重置
        isMounted = true
        return
      }
      current.value = 0
      total.value = 0
      markInstance.value?.unmark()
      markList = []
    }

    const highlightClass = addPrefix('--highlight')
    const selectMark = () => {
      // 高亮选中
      targetEl.value
        ?.querySelectorAll(`.${highlightClass}`)
        .forEach((el) => el.classList.remove(highlightClass))
      const currentMark = markList.find((_, index) => index === current.value)
      if (!currentMark) return
      currentMark.forEach((el) => el.classList.add(highlightClass))
      // 滚动到选中
      const { offset, smooth } = props
      scrollToEl(currentMark[0], {
        offset,
        smooth,
        scrollMode: 'if-needed'
      })
    }
    // watch(current, selectMark)

    const setMark = debounce(() => {
      reset()
      if (!targetEl.value) return
      const regexp = new RegExp(escapedVal.value, 'gi')
      markInstance.value?.markRegExp(regexp, {
        className: addPrefix('--mark'),
        acrossElements: true,
        each: setMarkList,
        done: () => {
          setTotal()
          selectMark()
        }
      })
    }, 200)
    watch(() => [modelValue.value, targetEl.value], setMark, { immediate: true })
    onBeforeUnmount(reset)

    const inputRef = shallowRef<HTMLInputElement>()
    expose({
      ...chain(['focus', 'blur'] as const)
        .map((key) => [key, () => inputRef.value?.[key]()])
        .fromPairs()
        .value(),
      clear: onClear
    })

    return () => (
      <div class={rootClass.value}>
        <input
          {...inputAttrs.value}
          v-model={modelValue.value}
          class={addPrefix('__input')}
          ref={inputRef}
          onKeydown={onKeydown}
        />
        {modelValue.value && (
          <>
            {props.clearable && (
              <span class={[addPrefix('__clearable'), addPrefix('__btn')]} onClick={onClear}>
                <FontAwesomeIcon size="xs" icon={faCircleXmark} />
              </span>
            )}
            <span class={addPrefix('__count')}>{matchesCount.value}</span>
            <span
              class={[addPrefix('__prev'), addPrefix('__btn')]}
              onClick={() => onToggle('prev')}
            >
              <FontAwesomeIcon icon={faAngleUp} />
            </span>
            <span
              class={[addPrefix('__next'), addPrefix('__btn')]}
              onClick={() => onToggle('next')}
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </>
        )}
        {props.closeIcon && (
          <span class={[addPrefix('__close'), addPrefix('__btn')]} onClick={() => emit('close')}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        )}
      </div>
    )
  }
})
