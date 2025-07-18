import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Demo from '../plugins/vitepress-plugin-demo/Demo.vue'
import 'virtual:group-icons.css'

const modules = import.meta.glob('/examples/**/*.vue', { import: 'default', eager: true })

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('Demo', Demo)
    Object.keys(modules).forEach((key) => {
      const component = modules[key]
      app.component(component.__name, component)
    })
  }
} satisfies Theme
