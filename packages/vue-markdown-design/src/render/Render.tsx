import './index.less'
import hljs, { type HLJSOptions } from 'highlight.js'
import { full, type Options as EmojiOptions } from 'markdown-it-emoji'
import { sanitize, type SanitizeOptions } from '@markdown-design/markdown-it-sanitize'
import { defineComponent, ref, watch, watchEffect, type PropType } from 'vue'
import { allToArray, createNamespace } from '../utils/format'
import type { UnionStr } from '../utils/types'
import anchor from 'markdown-it-anchor'
import type { Anchor } from './type'
import { isFunction, isObject, isUndefined, pickBy } from 'lodash'
import MarkdownIt, {
  type Options,
  type PluginSimple,
  type PluginWithParams,
  type PresetName
} from 'markdown-it'
import { runFnWithOptions } from '../utils/functions'
import { DATA_ANCHOR } from '../utils/constant'

const defaultBoolean = {
  type: Boolean,
  default: undefined
}

const { name, addPrefix } = createNamespace('render')

export const renderProps = {
  src: {
    type: [String, Number],
    default: ''
  },
  plugins: {
    type: [Function, Array] as PropType<
      PluginSimple | (PluginSimple | [PluginWithParams, ...any[]] | any[])[]
    >,
    default: () => []
  },
  inline: Boolean,
  presetName: {
    type: String as PropType<UnionStr<PresetName>>,
    default: 'default'
  },
  html: {
    type: Boolean,
    default: true
  },
  sanitize: {
    type: [Boolean, Object] as PropType<boolean | SanitizeOptions>,
    default: true
  },
  xhtmlOut: defaultBoolean,
  breaks: defaultBoolean,
  langPrefix: String,
  linkify: defaultBoolean,
  typographer: defaultBoolean,
  quotes: [String, Array] as PropType<Options['quotes']>,
  highlight: {
    type: [Boolean, Function, null] as PropType<boolean | Options['highlight']>,
    default: true
  },
  highlightOptions: Object as PropType<Partial<HLJSOptions>>,
  emoji: {
    type: [Boolean, Object] as PropType<boolean | Partial<EmojiOptions>>,
    default: true
  },
  anchor: {
    type: [Boolean, Object, Function] as PropType<
      boolean | anchor.AnchorOptions | ((params: Anchor) => anchor.AnchorOptions)
    >,
    default: true
  },
  permalink: {
    type: Boolean,
    default: true
  },
  markdownClass: {
    type: String,
    default: 'markdown-body'
  }
}

export const renderEmits = {
  envChange: (payload: {}) => isObject(payload)
}

export default defineComponent({
  name,
  props: renderProps,
  emits: renderEmits,
  setup(props, { emit, expose }) {
    const mdInstance = new MarkdownIt(props.presetName as PresetName)

    // mdit 配置
    const optionKeys = [
      'html',
      'xhtmlOut',
      'breaks',
      'langPrefix',
      'linkify',
      'typographer',
      'quotes'
    ] as const
    watch(
      () => optionKeys.map((key) => props[key]),
      () => {
        mdInstance.set(
          pickBy(
            props,
            (value, key: (typeof optionKeys)[number]) =>
              optionKeys.includes(key) && !isUndefined(value)
          )
        )
      },
      { immediate: true }
    )
    // 代码高亮，为尽可能保持 mdit 配置保持响应性，故不以 mdit 插件形式使用
    props.highlightOptions && hljs.configure(props.highlightOptions)
    watchEffect(() => {
      let highlight = props.highlight || null
      if (highlight === true) {
        highlight = (str, language) => {
          const { getLanguage, highlight, highlightAuto } = hljs
          const { value } = getLanguage(language)
            ? highlight(str, { language })
            : highlightAuto(str)
          return value
        }
      }
      mdInstance.set({ highlight })
    })

    // 插件
    // sanitize
    runFnWithOptions(props.sanitize, (options) => mdInstance.use(sanitize, options))
    // emoji
    runFnWithOptions(props.emoji, (options) => mdInstance.use(full, options))
    // anchor
    runFnWithOptions(props.anchor, (options = {}) => {
      const permalink = props.permalink
        ? {
            permalink: anchor.permalink.linkInsideHeader({
              placement: 'before',
              class: addPrefix('__anchor'),
              space: false,
              renderAttrs: () => ({ [DATA_ANCHOR]: '' }) // 适配 toc 组件，使之可以准确获取 HTMLHeadingElement
            })
          }
        : {}
      const anchorOptions = isFunction(options) ? options(anchor) : options
      mdInstance.use(anchor, {
        ...permalink,
        ...anchorOptions
      })
    })
    // 其他插件
    const getPlugins = () => {
      const { plugins } = props
      return Array.isArray(plugins) ? plugins.map(allToArray) : [[plugins]]
    }
    getPlugins().forEach((plugin) => mdInstance.use(...(plugin as [PluginWithParams, ...any[]])))

    const refreshKeys = ['src', 'inline', 'highlight', ...optionKeys] as const
    const html = ref('')
    watch(
      () => refreshKeys.map((key) => props[key]),
      () => {
        const { src, inline } = props
        const env = {}
        html.value = mdInstance[inline ? 'renderInline' : 'render'](String(src), env)
        emit('envChange', env)
      },
      { immediate: true }
    )

    expose({ mdInstance })

    return () => (
      <div class={name}>
        <div
          class={[props.markdownClass, { [addPrefix('--permalink')]: props.permalink }]}
          v-html={html.value}
        ></div>
      </div>
    )
  }
})
