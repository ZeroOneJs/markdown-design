import { defineConfig, postcssIsolateStyles } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { demo } from './plugins/demo'
import { tableWrapper } from './plugins/table-wrapper'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pkg = require('vue-markdown-design/package.json')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Markdown Design',
  description: 'A Vue 3 out-of-the-box Markdown component built on markdown-it',
  appearance: false,
  cleanUrls: true,
  lastUpdated: true,
  rewrites: {
    'en-US/:page*': ':page*'
  },
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Components', link: '/component/markdown' },
      {
        text: pkg.version,
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/ZeroOneJs/markdown-design/blob/main/packages/vue-markdown-design/CHANGELOG.md'
          }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Quick Start', link: '/guide/quickstart' },
            { text: 'Advanced', link: '/guide/advanced' }
          ]
        }
      ],
      '/component/': [
        {
          text: 'Components',
          items: [
            { text: 'Markdown', link: '/component/markdown' },
            { text: 'Render', link: '/component/render' },
            { text: 'Search', link: '/component/search' },
            { text: 'Toc', link: '/component/toc' }
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/ZeroOneJs/markdown-design' }],
    search: {
      provider: 'local',
      options: {
        locales: {
          'zh-CN': {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                displayDetails: '显示详细信息',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    editLink: {
      pattern:
        'https://github.com/ZeroOneJs/markdown-design/edit/main/packages/markdown-design-docs/:path'
    }
  },
  locales: {
    root: {
      label: 'English'
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh-CN/guide/introduction' },
          { text: '组件', link: '/zh-CN/component/markdown' },
          {
            text: pkg.version,
            items: [
              {
                text: '更新日志',
                link: 'https://github.com/ZeroOneJs/markdown-design/blob/main/packages/vue-markdown-design/CHANGELOG.md'
              }
            ]
          }
        ],
        sidebar: {
          '/zh-CN/guide/': [
            {
              text: '指南',
              items: [
                { text: '介绍', link: '/zh-CN/guide/introduction' },
                { text: '快速开始', link: '/zh-CN/guide/quickstart' },
                { text: '进阶用法', link: '/zh-CN/guide/advanced' }
              ]
            }
          ],
          '/zh-CN/component/': [
            {
              text: '组件',
              items: [
                { text: 'Markdown', link: '/zh-CN/component/markdown' },
                { text: 'Render', link: '/zh-CN/component/render' },
                { text: 'Search', link: '/zh-CN/component/search' },
                { text: 'Toc', link: '/zh-CN/component/toc' }
              ]
            }
          ]
        },
        outline: {
          label: '页面导航'
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        editLink: {
          pattern:
            'https://github.com/ZeroOneJs/markdown-design/edit/main/packages/markdown-design-docs/:path',
          text: '在 GitHub 上编辑此页面'
        },
        lastUpdated: {
          text: '最后更新于'
        },
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单'
      }
    }
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
      md.use(demo)
      md.use(tableWrapper)
    }
  },
  vite: {
    plugins: [
      groupIconVitePlugin(),
      vueJsx(),
      Components({
        dirs: ['examples'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        directoryAsNamespace: true
      })
    ],
    css: {
      postcss: {
        plugins: [postcssIsolateStyles()]
      }
    }
  }
})
