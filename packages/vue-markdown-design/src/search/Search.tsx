import './index.less'
import Mark from 'mark.js'
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  ref,
  shallowRef,
  watch,
  watchEffect,
  withKeys,
  type PropType
} from 'vue'
import { createNamespace } from '../utils/format'
import type { UnionStr } from '../utils/types'
import { useVModel, type MaybeElement } from '@vueuse/core'
import { chain, debounce, escapeRegExp, isNumber, isString, last, omit, upperFirst } from 'lodash'
import { useElement } from '../hooks/use-element'
import { scrollToEl } from '../utils/dom'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown, faAngleUp, faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons'
import type { SearchIndex } from './type'

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
  input: (payload: Event) => payload instanceof Event,
  blur: (payload: FocusEvent) => payload instanceof FocusEvent,
  focus: (payload: FocusEvent) => payload instanceof FocusEvent,
  change: (payload: Event) => payload instanceof Event,
  clear: () => true,
  close: () => true,
  stepClick: (payload: 'prev' | 'next') => ['prev', 'next'].includes(payload),
  totalChange: (payload: number) => isNumber(payload),
  indexChange: (index: number) => isNumber(index)
}

export default defineComponent({
  name,
  props: searchProps,
  emits: searchEmits,
  setup(props, { emit, expose, attrs }) {
    const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

    const rootClass = computed(() => {
      const { size, disabled, border } = props
      return [
        name,
        addPrefix(`--${size}`),
        { [addPrefix('--disabled')]: disabled, [addPrefix('--border')]: border }
      ]
    })

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

    const onClear = () => {
      if (props.disabled) return
      modelValue.value = ''
      emit('clear')
    }

    const rawIndex = ref(0)

    const markList = ref<HTMLElement[][]>([])
    const escapedVal = computed(() => escapeRegExp(String(modelValue.value)))
    const setMarkList = (el: HTMLElement) => {
      const item = last(markList.value)
      const keyword = item?.map((item) => item.innerText).join('') || ''
      const regexp = new RegExp(`^${escapedVal.value}$`, 'i')
      !item || regexp.test(keyword) ? markList.value.push([el]) : item.push(el)
    }

    const total = computed(() => markList.value.length)
    watch(total, (val) => emit('totalChange', val))

    const matchesIndex = computed(() => {
      return total.value && ((rawIndex.value % total.value) + total.value) % total.value
    })
    watch(matchesIndex, (val) => emit('indexChange', val))

    const matchesCount = computed(
      // modelValue.value !== '' 不直接判断防止值为0的情况
      () => modelValue.value !== '' && total.value && `${matchesIndex.value + 1}/${total.value}`
    )

    const stepMap = new Map([
      ['prev', -1],
      ['next', 1]
    ])
    const toggle = (index: SearchIndex, checkDisabled?: boolean) => {
      if (checkDisabled && props.disabled) return
      const offsetVal = stepMap.get(String(index))
      rawIndex.value = offsetVal ? matchesIndex.value + offsetVal : Number(index)
    }
    const onStepClick = (direction: 'prev' | 'next') => {
      if (props.disabled) return // 同时禁用 stepClick 事件
      toggle(direction)
      emit('stepClick', direction)
    }
    const onKeydown = withKeys(
      (event) => !(event.target as any)?.composing && onStepClick('next'), // composing 此处的值为vue3源码中的赋值
      ['enter']
    )

    const { targetEl } = useElement(() => props.target || document.documentElement)
    const markInstance = computed(() => {
      if (targetEl.value instanceof HTMLElement) return new Mark(targetEl.value)
      console.error('[vue-markdown-design] Target is not of the HTMLElement type.')
      return undefined
    })

    const highlightClass = addPrefix('--highlight')
    watchEffect(() => {
      // 高亮选中
      targetEl.value
        ?.querySelectorAll(`.${highlightClass}`)
        .forEach((el) => el.classList.remove(highlightClass))
      const currentMark = markList.value.find((_, index) => index === matchesIndex.value)
      if (!currentMark) return
      currentMark.forEach((el) => el.classList.add(highlightClass))
      // 滚动到选中
      const { offset, smooth } = props
      scrollToEl(currentMark[0], {
        offset,
        smooth,
        scrollMode: 'if-needed'
      })
    })

    let isFirst = true
    const reset = () => {
      if (isFirst) {
        // 防止首次赋值 rawIndex 被重置
        isFirst = false
        return
      }
      rawIndex.value = 0
      markInstance.value?.unmark()
      markList.value = []
    }
    const setMark = debounce(() => {
      reset()
      if (!targetEl.value) return
      const regexp = new RegExp(escapedVal.value, 'gi')
      markInstance.value?.markRegExp(regexp, {
        className: addPrefix('--mark'),
        acrossElements: true,
        each: setMarkList
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
      clear: onClear,
      toggle
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
              onClick={() => onStepClick('prev')}
            >
              <FontAwesomeIcon icon={faAngleUp} />
            </span>
            <span
              class={[addPrefix('__next'), addPrefix('__btn')]}
              onClick={() => onStepClick('next')}
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
