import type { PluginSimple } from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'
import container from 'markdown-it-container'
import getComponentName from '../../utils/format'

export const demoMdPlugin: PluginSimple = (md) => {
  const titleMap = new Map([['zh', '展开源代码']])
  md.use(container, 'demo', {
    render: (tokens, idx, _, env) => {
      if (tokens[idx].nesting === -1) return '</demo>'
      const { content } = tokens[idx + 2]
      const { localeIndex } = env
      const path = `/${localeIndex}/examples/${content}`
      const code = md.render(`<<< @${path}`, { ...env }) // ...env 防止 md 文件中的 <script> 标签丢失
      return `<demo name="${getComponentName(path)}" summary="${titleMap.get(localeIndex)}"><template #code>${code}</template>`
    }
  } as MarkdownItContainer.ContainerOpts)
}
