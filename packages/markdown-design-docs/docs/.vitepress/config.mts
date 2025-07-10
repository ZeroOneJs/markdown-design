import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Markdown Design',
  description: 'A VitePress Site',
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
        nav: [{ text: 'Guide', link: '/zh/guide/markdown' }],
        sidebar: [
          {
            text: '基础',
            items: [{ text: '快速开始', link: '/zh/quickstart' }]
          },
          {
            text: '组件',
            items: [{ text: 'Markdown', link: '/zh/markdown' }]
          }
        ]
      }
    }
  }
})
