import DOMPurify from 'dompurify'
import type { SanitizeOptions } from './type'
import type Token from 'markdown-it/lib/token.mts'
import type MarkdownIt from 'markdown-it'
import type { PluginWithOptions } from 'markdown-it'

const transformKeys = new Set(['code_inline', 'text'])
const transformer = (params: { content: string; md: MarkdownIt; env: any; encode: boolean }) => {
  const { content, md, env, encode } = params
  const outTokens: Token[] = []
  const state = new md.inline.State(content, md, env, outTokens)
  md.inline.tokenize(state)
  if (!outTokens.some((token) => token.type === 'html_inline')) return ''
  const transformFn = encode ? encodeURIComponent : decodeURIComponent
  return outTokens
    .map((token) => {
      const { content, markup, type } = token
      const transformedContent = transformKeys.has(type) ? transformFn(content) : content
      return markup + transformedContent + markup
    })
    .join('')
}

export const sanitize: PluginWithOptions<SanitizeOptions> = (md, options = {}) => {
  if (!md.options.html) return
  md.core.ruler.after('block', 'sanitize_block', (state) => {
    state.tokens.forEach((token) => {
      const { type, content } = token
      if (type !== 'html_block') return
      token.content = DOMPurify.sanitize(content, options)
    })
  })
  md.core.ruler.before('inline', 'sanitize_inline', (state) => {
    state.tokens.forEach((token) => {
      if (token.type !== 'inline') return
      const content = transformer({
        ...state,
        ...token,
        encode: true
      })
      if (!content) return
      token.content = transformer({
        ...state,
        content: DOMPurify.sanitize(content, options),
        encode: false
      })
    })
  })
}
