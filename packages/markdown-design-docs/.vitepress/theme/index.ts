import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Demo from '../plugins/demo/Demo.vue'
import 'virtual:group-icons.css'
import { VueMarkdown, VmdRender, VmdSearch, VmdToc } from 'vue-markdown-design'
import './custom.less'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('Demo', Demo)
    app.use(VueMarkdown)
    app.use(VmdRender)
    app.use(VmdSearch)
    app.use(VmdToc)
  }
} satisfies Theme
