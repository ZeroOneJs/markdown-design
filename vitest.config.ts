import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import dasds from './packages/vue-markdown-design/vite.config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          // 基于文件命名约定的示例
          // 非强制要求
          include: ['packages/**/__tests__/**/!(*.browser).spec.ts'],
          name: 'unit'
        }
      },
      {
        plugins: dasds.plugins,
        // 继承此配置的选项，如 plugins 和 pool
        // extends: true,
        test: {
          name: 'browser',
          include: [
            'packages/**/__tests__/**/*.spec.tsx',
            'packages/**/__tests__/**/*.browser.spec.ts'
          ],
          browser: {
            provider: playwright(),
            enabled: true,
            instances: [{ browser: 'chromium', viewport: { width: 1280, height: 720 } }]
          },
          setupFiles: ['./packages/vue-markdown-design/src/__tests__/setup.ts']
        }
      }
    ]
    // coverage: {
    //   // provider: 'istanbul'
    //   enabled: true,
    // },
  }
})
