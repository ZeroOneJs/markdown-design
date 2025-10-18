import './index.less'
import { headers, type MditHeadersEnv } from '@markdown-design/markdown-it-headers'
import {
  chain,
  clamp,
  inRange,
  isObject,
  isString,
  isUndefined,
  lte,
  range,
  throttle
} from 'lodash'
import { computeOffset, createNamespace } from '../utils/format'
import type { TOC, TOCItem } from './type'
import {
  computed,
  defineComponent,
  nextTick,
  ref,
  watchEffect,
  type MaybeRefOrGetter,
  type PropType
} from 'vue'
import { useElement } from '../hooks/use-element'
import MarkdownIt from 'markdown-it'
import { toValue, useEventListener, type MaybeElement } from '@vueuse/core'
import type { Offset } from '../utils/types'
import { compute } from 'compute-scroll-into-view'
import { useScrollParent } from '../hooks/use-scroll-element'
import { scrollToEl } from '../utils/dom'
import { DATA_ANCHOR } from '../utils/constant'

const START_LEVEL = 1
const END_LEVEL = 6

const { name, addPrefix } = createNamespace('toc')

export const tocProps = {
  startLevel: {
    type: [Number, String],
    default: START_LEVEL
  },
  endLevel: {
    type: [Number, String],
    default: END_LEVEL
  },
  orderedList: Boolean,
  plainText: Boolean,
  changeHash: {
    type: Boolean,
    default: true
  },
  target: [String, Object, Function] as PropType<MaybeRefOrGetter<string | MaybeElement>>,
  offset: {
    type: [String, Number, Function] as PropType<Offset>,
    default: 'start'
  },
  bound: {
    type: Number,
    default: 0
  },
  ignore: {
    type: Array as PropType<(number | string)[]>,
    default: []
  },
  emptyText: {
    type: String,
    default: 'No Data'
  },
  markdown: {
    type: String,
    default: ''
  },
  smooth: Boolean
}

export const tocEmits = {
  click: (payload: TOCItem) => isObject(payload),
  change: (payload?: string) => isString(payload) || isUndefined(payload)
}

export default defineComponent({
  name,
  props: tocProps,
  emits: tocEmits,
  setup(props, { emit, expose, slots }) {
    const { targetEl } = useElement(() => toValue(props.target) || document.documentElement)

    const levelWithNum = computed(() => {
      const { startLevel, endLevel, ignore } = props
      return chain([startLevel, endLevel])
        .map((level) => clamp(Number(level), START_LEVEL, END_LEVEL)) // clamp 兼容超出范围的值
        .thru(([start, end]) => range(start, end + 1))
        .difference(ignore.map(Number))
        .value()
    })
    watchEffect(() => {
      const { startLevel, endLevel } = props
      const levels = [startLevel, endLevel].map(Number)
      if (!levels.every((level) => inRange(level, START_LEVEL, END_LEVEL + 1))) {
        console.warn(
          '[vue-markdown-design] The start-level or end-level is outside the valid range.'
        )
      }
      if (!lte(...(levels as [number, number]))) {
        console.warn('[vue-markdown-design] The start-level must be less than the end-level.')
      }
    })

    const md = new MarkdownIt({ html: true })
    md.use(headers)
    const mdTOC = computed(() => {
      const env: MditHeadersEnv = {}
      md.render(props.markdown, env)
      const { headings = [] } = env
      return headings.filter((item) => levelWithNum.value.includes(item.level))
    })
    const isMd = computed(() => !toValue(props.target) && !!props.markdown)
    const isPlainText = computed(() => isMd.value || props.plainText)

    const headings = ref<HTMLHeadingElement[]>([])
    const setHeading = () => {
      if (headings.value.length && headings.value.every((heading) => document.contains(heading)))
        return
      const selectors = levelWithNum.value.map((level) => `h${level}`).join(',')
      const headingEl = targetEl.value?.querySelectorAll<HTMLHeadingElement>(selectors)
      headings.value = Array.from(headingEl || [])
    }

    const offsetResult = computed(() => computeOffset(props.offset))
    const topMap = ref(new Map<string, number>())
    const setTop = () => {
      const { block, getOffset } = offsetResult.value
      headings.value.forEach((heading) => {
        const [scrollAction] = compute(heading, { block })
        const curOffset = getOffset(scrollAction, true)
        const val = scrollAction.top - curOffset - props.bound
        topMap.value.set(heading.id, Math.floor(val))
      })
    }

    const setTOC = () => {
      if (isMd.value || !targetEl.value) return
      setHeading()
      setTop()
    }
    watchEffect(setTOC)

    const getText = (el: HTMLElement) => {
      const node = el.cloneNode(true) as HTMLElement
      const anchors = node.querySelectorAll(`[${DATA_ANCHOR}]`)
      anchors.forEach((item) => node.removeChild(item))
      return node.innerText.trim() // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent#与_innertext_的区别
    }
    const listData = computed<TOC[]>(() => {
      if (isMd.value) return mdTOC.value
      return headings.value.map((heading) => {
        const { id, tagName } = heading
        return {
          id,
          text: getText(heading),
          level: Number(tagName[1]),
          top: topMap.value.get(id)
        }
      })
    })
    const runtimeLevel = computed(() => {
      if (!listData.value.length) return [0, 0]
      const level = listData.value.map((item) => item.level)
      return [Math.min(...level), Math.max(...level)]
    })

    const wait = 16
    enum ScrollStatus {
      Start,
      Update,
      Done
    }
    let scrollStatus = ScrollStatus.Done // 默认值 ScrollStatus.Done 为可阻止默认事件
    const setScrollStatus = (key: keyof typeof ScrollStatus) => {
      const status = ScrollStatus[key]
      if (scrollStatus !== status) {
        scrollStatus = status
      }
    }

    const { scrollEl } = useScrollParent(targetEl)
    const resolvedScrollEl = computed(
      () => scrollEl.value || targetEl.value?.ownerDocument.documentElement
    )
    const activeId = ref<string>()
    const onChange = () => {
      if (scrollStatus === ScrollStatus.Done) {
        emit('change', activeId.value)
      }
    }
    const onScroll = throttle(() => {
      if (scrollStatus === ScrollStatus.Start || isPlainText.value) return
      setTOC()
      const scrollTop = Math.floor(resolvedScrollEl.value?.scrollTop || 0)
      const current = listData.value
        .map((item) => ({
          ...item,
          top: item.top || 0
        }))
        .sort((a, b) => a.top - b.top)
        .find((item, index, arr) => {
          const next = arr[index + 1]
          return (
            item.top <= scrollTop &&
            (!next || next.top > scrollTop) &&
            !(index === 0 && scrollTop === 0)
          )
        })
      const id = current?.id || undefined
      if (activeId.value === id) return
      activeId.value = id
      onChange()
    }, wait)
    watchEffect(() => nextTick().then(onScroll))
    useEventListener(() => scrollEl.value || window, 'scroll', onScroll)

    const scrollTo = (href?: string) => {
      if (!href) return console.warn('[vue-markdown-design] Href has no value.')
      const headingEl = targetEl.value?.querySelector<HTMLHeadingElement>(`[id='${href}']`) // [id='${href}'] 可兼容 url 编码
      if (!headingEl)
        return console.warn('[vue-markdown-design] The provided href failed to query the DOM.')
      const { offset, smooth } = props
      scrollToEl(headingEl, {
        offset,
        smooth,
        onPlay: () => setScrollStatus('Start'),
        onUpdate: () => setScrollStatus('Update'),
        onComplete: () =>
          setTimeout(() => {
            setScrollStatus('Done')
            onChange()
          }, wait + 4) // 设置延迟可确保在 onScroll 后面再执行
      })
    }
    const onScrollTo = (id?: string) => {
      const { changeHash, smooth } = props
      if (!(!smooth && changeHash)) return scrollTo(id)
      // 设置延迟以解决在关闭平滑滚动时 offset 可能不准问题
      setTimeout(() => scrollTo(id), 0)
    }
    const onClick = (tocItem: TOCItem, e: MouseEvent) => {
      if (!props.changeHash) e.preventDefault()
      onScrollTo(tocItem.id)
      emit('click', tocItem)
    }

    const renderItem = computed(() => {
      const { orderedList } = props
      const [startLevel, endLevel] = runtimeLevel.value
      const orderCounter = new Array(endLevel - startLevel + 1).fill(0)
      return listData.value.map((item) => {
        const { level, text, id, top } = item
        const relativeLevel = level - startLevel
        orderedList && orderCounter.fill(0, relativeLevel + 1)
        const attrs = {
          class: addPrefix('__text'),
          style: { paddingLeft: `${relativeLevel}em` }
        }
        const plainText = orderedList ? `${++orderCounter[relativeLevel]}. ${text}` : text
        const isActive = activeId.value === id

        const tocItem: TOCItem = {
          id,
          top,
          level,
          relativeLevel,
          isActive,
          text: plainText
        }
        if (slots.item) return slots.item(tocItem)
        return (
          <li class={[addPrefix('__item'), { [addPrefix('__item--active')]: isActive }]}>
            {isPlainText.value || !id ? (
              <span v-html={plainText} {...attrs}></span>
            ) : (
              <a
                v-html={plainText}
                {...attrs}
                href={`#${id}`}
                onClick={(e) => onClick(tocItem, e)}
              ></a>
            )}
          </li>
        )
      })
    })

    const refresh = async () => {
      headings.value = []
      await nextTick()
      setTOC()
    }
    expose({ refresh, scrollTo })

    return () => (
      <nav class={name}>
        {renderItem.value.length ? (
          <ul class={[addPrefix('__list'), addPrefix('--padding')]}>{renderItem.value}</ul>
        ) : (
          <p class={[addPrefix('__empty'), addPrefix('--padding')]}>{props.emptyText}</p>
        )}
      </nav>
    )
  }
})
