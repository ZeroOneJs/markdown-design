import { defineConfig, postcssIsolateStyles } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { demoMdPlugin } from './plugins/vitepress-plugin-demo'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Markdown Design',
  description: 'A VitePress Site',
  appearance: false,
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
      md.use(demoMdPlugin)
    }
  },
  vite: {
    plugins: [groupIconVitePlugin(), vueJsx()],
    css: {
      postcss: {
        plugins: [
          postcssIsolateStyles({
            includeFiles: ['base.css', 'vp-doc.css']
          })
        ]
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/ZeroOneJs/markdown-design' }]
  },
  locales: {
    // root: {
    //   label: 'English'
    // },
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
              items: [
                { text: 'Markdown', link: '/zh/component/markdown' },
                { text: 'Render', link: '/zh/component/render' },
                { text: 'Search', link: '/zh/component/search' },
                { text: 'TOC', link: '/zh/component/toc' }
              ]
            }
          ]
        },
        aside: false,
        outline: {
          label: '页面导航'
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        returnToTopLabel: '回到顶部'
      }
    }
  }
})
