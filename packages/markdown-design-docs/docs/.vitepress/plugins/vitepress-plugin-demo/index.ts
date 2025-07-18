import { PluginSimple } from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'
import container from 'markdown-it-container'

export const demo: PluginSimple = (md) => {
  const titleMap = new Map([['zh', '展开源代码']])
  md.use(container, 'demo', {
    render: (tokens, idx, _, env) => {
      if (tokens[idx].nesting === -1) return '</Demo>'
      const { content } = tokens[idx + 2]
      const html = md.render(`<<< ${content}`, env)
      const name = content.split('.').shift()?.split('/').pop()
      return `<Demo name="${name}" summary="${titleMap.get(env.localeIndex)}">${html}`
    }
  } as MarkdownItContainer.ContainerOpts)
}
