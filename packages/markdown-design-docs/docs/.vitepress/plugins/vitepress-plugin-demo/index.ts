import type { PluginSimple } from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'
import container from 'markdown-it-container'

export const demoMdPlugin: PluginSimple = (md) => {
  const titleMap = new Map([['zh', '展开源代码']])
  md.use(container, 'demo', {
    render: (tokens, idx, _, env) => {
      if (tokens[idx].nesting === -1) return '</demo>'
      const { content } = tokens[idx + 2]
      const code = md.render(`<<< ${content}`, env)
      // const name = content.split('.').shift()?.split('/').pop()
      console.log('🚀 ~ env:', env)
      return `<demo name="vp-zh-examples-markdown-Basic.vue" summary="${titleMap.get(env.localeIndex)}"><template #code>${code}</template>`
    }
  } as MarkdownItContainer.ContainerOpts)
}
