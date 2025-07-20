import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { demoMdPlugin } from './plugins/vitepress-plugin-demo'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Markdown Design',
  description: 'A VitePress Site',
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
      md.use(demoMdPlugin)
    }
  },
  vite: {
    plugins: [groupIconVitePlugin(), vueJsx()]
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  },
  locales: {
    root: {
      label: 'English'
    },
    zh: {
      label: '简体中文',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/guide/introduction' },
          { text: '组件', link: '/zh/component/markdown' }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '指南',
              items: [
                { text: '介绍', link: '/zh/guide/introduction' },
                { text: '快速开始', link: '/zh/guide/quickstart' },
                { text: '进阶用法', link: '/zh/guide/advanced' }
              ]
            }
          ],
          '/zh/component/': [
            {
              text: '组件',
              items: [{ text: 'Markdown', link: '/zh/component/markdown' }]
            }
          ]
        },
        outline: {
          label: '页面导航'
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        }
      }
    }
  }
})
