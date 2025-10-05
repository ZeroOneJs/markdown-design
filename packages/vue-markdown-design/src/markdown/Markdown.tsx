import './index.less'
import {
  computed,
  defineComponent,
  shallowRef,
  Transition,
  watch,
  type ExtractPropTypes,
  type PropType
} from 'vue'
import Render, { renderProps, type RenderInstance } from '../render'
import Search, { searchProps, type SearchInstance } from '../search'
import TOC, { tocProps, type TOCInstance, type TOCItem } from '../toc'
import {
  addUnit,
  allToObject,
  computeOffset,
  createNamespace,
  keysAddPrefix
} from '../utils/format'
import type { ObjectToUnion, Offset } from '../utils/types'
import type { MarkdownBtnType, MarkdownExpose } from './type'
import { renderEmits } from '../render/Render'
import { searchEmits } from '../search/Search'
import { tocEmits } from '../toc/TOC'
import { chain, isBoolean, isUndefined, mapValues, sum, upperFirst, values } from 'lodash'
import { useElementBounding, useVModels, useWindowSize } from '@vueuse/core'
import { useScrollParent } from '../hooks/use-scroll-element'
import Sticky from '../sticky'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faList, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import type { ScrollAction } from 'compute-scroll-into-view'

const { name, addPrefix } = createNamespace('markdown')

export const markdownProps = {
  ...renderProps,
  ...keysAddPrefix(searchProps, 'search'),
  ...keysAddPrefix(tocProps, 'toc'),
  keyword: searchProps.modelValue,
  tocOffset: tocProps.offset.type, // 不设置默认值，toc 需要 undefined 作为判断依据
  showBtn: {
    type: [Boolean, Array, Object] as PropType<ObjectToUnion<MarkdownBtnType>>,
    default: false
  },
  search: Boolean,
  toc: Boolean,
  topOffset: [Number, String], // 不设置默认值，toc 需要 undefined 作为判断依据
  bottomOffset: {
    type: [Number, String],
    default: 0
  },
  miniScreenWidth: {
    type: [Number, String],
    default: 960
  }
}
const emits = {
  ...renderEmits,
  ...keysAddPrefix(searchEmits, 'search'),
  ...keysAddPrefix(tocEmits, 'toc'),
  'update:keyword': searchEmits['update:modelValue'],
  'update:search': (payload: boolean) => isBoolean(payload),
  'update:toc': (payload: boolean) => isBoolean(payload)
}
export default defineComponent({
  name: 'vue-markdown',
  props: markdownProps,
  emits,
  setup(props, { emit, expose }) {
    const { search, toc, keyword } = useVModels(props, emit, { passive: true })

    const root = shallowRef<HTMLDivElement>()
    const { width: rootWidth, height: rootHeight } = useElementBounding(root)
    const isMiniScreen = computed(() => rootWidth.value < Number(props.miniScreenWidth))

    const wrapper = shallowRef<HTMLDivElement>()

    const getPrefixedKey = (key: string, prefix?: string) =>
      prefix ? prefix + upperFirst(key) : key
    const createAttrs = <T extends {}, E extends {}, P extends string>(
      propAttrs: T,
      emitAttrs: E,
      prefix?: P
    ) => {
      const targetProps = mapValues(propAttrs, (_, key) => {
        const prefixedKey = getPrefixedKey(key, prefix)
        if (prefixedKey in props) return props[prefixedKey as keyof typeof props]
      })
      const targetEmits = chain(emitAttrs)
        .mapValues((_, key) => {
          const prefixedKey = getPrefixedKey(key, prefix)
          if (prefixedKey in emits) return (...arg: [any]) => emit(prefixedKey as any, ...arg)
        })
        .mapKeys((_, key) => `on${upperFirst(key)}`)
        .value()
      return {
        ...(targetProps as Partial<ExtractPropTypes<T>>),
        ...targetEmits
      }
    }

    const renderRef = shallowRef<RenderInstance>()
    const renderAttrs = computed(() => createAttrs(renderProps, renderEmits))

    const offsetWithNum = computed(() => {
      const { topOffset = 0, bottomOffset } = props
      return [topOffset, bottomOffset].map(Number)
    })

    const { scrollEl } = useScrollParent(root)

    const getDefaultOffset = (offset?: Offset) => {
      const { block, getOffset } = computeOffset(offset)
      if (block !== 'start') return block
      const [topOffset] = offsetWithNum.value
      return (scrollAction: ScrollAction) => {
        const { el } = scrollAction
        const isParent = (scrollEl.value || document.documentElement) === el
        const curOffset = getOffset(scrollAction, isParent)
        if (!isParent) return curOffset
        const targetOffset = isUndefined(offset) ? topOffset : curOffset
        return targetOffset + searchRect.height.value
      }
    }

    const searchAttrs = computed(() => ({
      ...createAttrs(searchProps, searchEmits, 'search'),
      onClose: () => {
        search.value = false
        emit('searchClose')
      }
    }))
    const searchRef = shallowRef<SearchInstance>()
    const searchRect = useElementBounding(searchRef)
    const searchIsOnMiniScreen = computed(() => isMiniScreen.value && toc.value)

    const tocRef = shallowRef<TOCInstance>()
    const tocRect = useElementBounding(tocRef)
    watch(
      () => props.src,
      () => {
        tocRef.value?.refresh()
        searchRef.value?.refresh()
      }
    )
    const onTOCClick = () => {
      if (!isMiniScreen.value) return
      toc.value = false
    }
    const tocAttrs = computed(() => {
      const tocAttrs = createAttrs(tocProps, tocEmits, 'toc')
      return {
        ...tocAttrs,
        offset: getDefaultOffset(props.tocOffset),
        onClick: (tocItem: TOCItem) => {
          onTOCClick()
          emit('tocClick', tocItem)
        }
      }
    })
    const scrollRect = useElementBounding(scrollEl)
    const windowSize = useWindowSize()
    const tocStyles = computed(() => {
      const offset = sum(offsetWithNum.value)
      const scrollHeight = Math.min(
        scrollRect.height.value || windowSize.height.value,
        rootHeight.value
      )
      if (isMiniScreen.value) {
        return {
          wrapper: {
            width: addUnit(rootWidth.value),
            height: addUnit(scrollHeight - offset)
          }
        }
      }
      const tocHeight = tocRect.height.value
      if (tocHeight + offset < scrollHeight) return {}
      return {
        wrapper: { height: addUnit(tocHeight) },
        content: {
          marginBottom: addUnit(tocHeight + offset - scrollHeight)
        }
      }
    })

    const showBtnWithObj = computed(() => {
      const { toc, search } = allToObject(props.showBtn, ['search', 'toc'])
      return {
        search: search && !searchIsOnMiniScreen.value,
        toc
      }
    })
    const btnCount = computed(() => values(showBtnWithObj.value).filter(Boolean).length)
    const createBtnClass = (isActive: boolean) => [
      addPrefix('__btn-icon'),
      { [addPrefix('__btn-icon--active')]: isActive }
    ]

    expose<MarkdownExpose>({
      tocRefresh: () => tocRef.value?.refresh() as ReturnType<MarkdownExpose['tocRefresh']>,
      tocScrollTo: (href) => tocRef.value?.scrollTo(href),
      searchRefresh: (isReset) =>
        searchRef.value?.refresh(isReset) as ReturnType<MarkdownExpose['searchRefresh']>,
      searchFocus: () => searchRef.value?.focus(),
      searchBlur: () => searchRef.value?.blur(),
      searchClear: () => searchRef.value?.clear(),
      searchToggle: (...arg) => searchRef.value?.toggle(...arg),
      getMdit: () => renderRef.value?.getMdit() as ReturnType<MarkdownExpose['getMdit']>
    })

    return () => (
      <div class={name}>
        <div ref={root} class={{ [addPrefix('--large')]: !isMiniScreen.value }}>
          <div ref={wrapper} class={addPrefix('__wrapper')}>
            {search.value && (
              <Sticky target={wrapper.value} offset={props.topOffset}>
                <div class={addPrefix('__search')}>
                  <div class={addPrefix('__search-input')}>
                    <Search
                      {...searchAttrs.value}
                      ref={searchRef}
                      v-model={keyword.value}
                      target={renderRef.value}
                    />
                  </div>
                </div>
              </Sticky>
            )}
            <Render
              {...renderAttrs.value}
              ref={renderRef}
              class={{ [addPrefix('__render--hidden')]: searchIsOnMiniScreen.value }}
            />
            {!!btnCount.value && (
              <Sticky
                posY="bottom"
                posX="right"
                flow={false}
                target={wrapper.value}
                zIndex="var(--vmd-markdown-btn-z-index)"
                offset={props.bottomOffset}
              >
                <div class={addPrefix('__btn')} style={{ width: `${btnCount.value * 40}px` }}>
                  {showBtnWithObj.value.search && (
                    <span
                      class={[addPrefix('__btn-search'), createBtnClass(search.value)]}
                      onClick={() => (search.value = !search.value)}
                    >
                      <FontAwesomeIcon size="xs" icon={faMagnifyingGlass} />
                    </span>
                  )}
                  {showBtnWithObj.value.toc && (
                    <span
                      class={[addPrefix('__btn-toc'), createBtnClass(toc.value)]}
                      onClick={() => (toc.value = !toc.value)}
                    >
                      <FontAwesomeIcon size="xs" icon={faList} />
                    </span>
                  )}
                </div>
              </Sticky>
            )}
          </div>
          <Transition name={addPrefix('__ani')}>
            {toc.value && (
              <aside class={addPrefix('__aside')}>
                <Sticky target={root.value} flow={!isMiniScreen.value} offset={props.topOffset}>
                  <div style={tocStyles.value.wrapper} class={addPrefix('__toc')}>
                    <TOC
                      {...tocAttrs.value}
                      ref={tocRef}
                      style={tocStyles.value.content}
                      target={renderRef.value}
                    />
                  </div>
                </Sticky>
              </aside>
            )}
          </Transition>
        </div>
      </div>
    )
  }
})
