import type MarkdownIt from 'markdown-it'
import type { PluginSimple } from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mts'
import type { MditHeadings } from './type'

const renderToken: RenderRule = (tokens, idx, options, _, self) => {
  return self.renderToken(tokens, idx, options)
}

const escapeKeys = new Set(['text', 'code_inline'])
const headerKeys = new Set([...escapeKeys, 'emoji'])
const setHeaders = (md: MarkdownIt, params: Parameters<RenderRule>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tokens, idx, _, env] = params
  const { children } = tokens[idx + 1]
  const headerTokens = children!.filter((child) => headerKeys.has(child.type))
  const { tag } = tokens[idx]
  const item: MditHeadings = {
    level: Number(tag[1]),
    text: headerTokens
      .map((token) => {
        const { type, content } = token
        return escapeKeys.has(type) ? md.utils.escapeHtml(content) : content
      })
      .join('')
      .trim()
  }
  if (env.headings) return env.headings.push(item)
  env.headings = [item]
}

export const headers: PluginSimple = (md) => {
  const headingOpen = md.renderer.rules.heading_open || renderToken
  md.renderer.rules.heading_open = (...args) => {
    setHeaders(md, args)
    return headingOpen(...args)
  }
}
