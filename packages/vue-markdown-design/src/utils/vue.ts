import { camelCase, upperFirst } from 'lodash'
import type { App, Component } from 'vue'

export function withInstall<T extends Component>(component: T, aliases: string[] = []) {
  return {
    ...component,
    install: (app: App) => {
      const { name } = component
      if (!(name || aliases.length)) return
      const pascalCaseName = name && upperFirst(camelCase(name)) // 兼容 <kebab-case /> 和 <PascalCase /> 组件写法
      const names = [pascalCaseName, ...aliases].filter(Boolean) as string[]
      names.forEach((item) => app.component(item, component))
    }
  }
}
