import type { PluginSimple } from 'markdown-it'
import container from 'markdown-it-container'

export const demo: PluginSimple = (md) => {
  const titleMap = new Map([['zh', '展开源代码']])
  md.use(container, 'demo', {
    render: (tokens, idx, _, env) => {
      if (tokens[idx].nesting === -1) return '</Demo>'
      const { content } = tokens[idx + 2]
      const { localeIndex } = env
      const path = `/${localeIndex}/examples/${content}.vue`
      const component = content.replace(/\//g, '').replace(/^./, (match) => match.toUpperCase())
      const code = md.render(`<<< @${path}`, { ...env }) // ...env 防止 md 文件中的 <script> 标签丢失
      return /*html*/ `
        <Demo summary="${titleMap.get(localeIndex)}">
          <template #component><${component} /></template>
          <template #code>${code}</template>
      `
    }
  } as container.ContainerOpts)
}
