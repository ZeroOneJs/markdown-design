import type { PluginSimple } from 'markdown-it'
import container from 'markdown-it-container'
import path from 'node:path'
import { existsSync } from 'node:fs'

export const demo: PluginSimple = (md) => {
  const titleMap = new Map([
    ['root', 'View Source'],
    ['zh-CN', '展开源代码']
  ])
  md.use(container, 'demo', {
    render: (tokens, idx, _, env) => {
      if (tokens[idx].nesting === -1) return '</Demo>'
      const { content } = tokens[idx + 2]
      const { localeIndex = 'root' } = env

      const paths = [localeIndex, ...content.split('/')]
      if (localeIndex !== 'root' && !existsSync(`${path.resolve('examples', ...paths)}.vue`)) {
        // 如果当前语言的 demo 不存在，则使用 root 下的 demo
        paths[0] = 'root'
      }

      const component = paths
        .map((item) => item.replace(/^./, (match: string) => match.toUpperCase()))
        .join('')
      const code = md.render(`<<< @/examples/${paths.join('/')}.vue`, { ...env }) // ...env 防止 md 文件中的 <script> 标签丢失
      return /*html*/ `
        <Demo summary="${titleMap.get(localeIndex)}">
          <template #component><${component} /></template>
          <template #code>${code}</template>
      `
    }
  } as container.ContainerOpts)
}
