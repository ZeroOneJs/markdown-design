import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import config from './packages/vue-markdown-design/vite.config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['packages/**/__tests__/**/!(*.browser).spec.ts']
        }
      },
      {
        plugins: config.plugins,
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
  }
})
