import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Demo from '../plugins/vitepress-plugin-demo/Demo.vue'
import 'virtual:group-icons.css'
import { VueMarkdown, VmdRender, VmdSearch, VmdTOC } from 'vue-markdown-design'
import type { Component } from 'vue'
import getComponentName from '../utils/format'
import './custom.less'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('Demo', Demo)
    app.use(VueMarkdown)
    app.use(VmdRender)
    app.use(VmdSearch)
    app.use(VmdTOC)
    const modules: Record<string, Component> = import.meta.glob('/*/examples/**/*.vue', {
      import: 'default',
      eager: true
    })
    Object.keys(modules).forEach((path) => {
      app.component(getComponentName(path), modules[path])
    })
  }
} satisfies Theme
