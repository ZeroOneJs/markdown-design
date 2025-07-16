import { PluginSimple } from 'markdown-it'
import container from 'markdown-it-container'
import { RenderRule } from 'markdown-it/lib/renderer.mjs'

export const demo: PluginSimple = (md) => {
  md.use(container, 'demo', {
    validate: (params: string) => params.trim().match(/^demo\s+(.*)$/),
    render: ((tokens, idx, _, env) => {
      if (tokens[idx].nesting === 1) {
        const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
        const path = m?.[1]
        const pathArr = path?.split('.')[0].split('/')
        const name = pathArr?.[pathArr.length - 1]
        const html = md.render(`::: details\n<<< @${path}\n:::`, env)
        return `<div>\n<${name} />\n${html}\n`
      } else {
        return '</div>\n'
      }
    }) as RenderRule
  })
}
