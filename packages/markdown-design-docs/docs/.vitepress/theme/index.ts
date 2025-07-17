import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'virtual:group-icons.css'
import '../plugins/vitepress-plugin-demo/index.css'

const modules = import.meta.glob('/examples/**/*.vue', { import: 'default', eager: true })

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    Object.keys(modules).forEach((key) => {
      const component = modules[key]
      app.component(component.__name, component)
    })
  }
} satisfies Theme
