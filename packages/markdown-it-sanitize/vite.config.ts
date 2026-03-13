import { defineConfig, mergeConfig } from 'vite'
import pkg from './package.json'
import baseConfig from '../../vite.config.base'
import { playwright } from '@vitest/browser-playwright'

export default mergeConfig(
  baseConfig,
  defineConfig({
    build: {
      rollupOptions: {
        external: Object.keys(pkg.dependencies)
      }
    }
    // test: {
    //   browser: {provider: playwright(),enabled: true, instances: [{ browser: 'chromium', viewport: { width: 1280, height: 720 } }]}
    // }
  })
)
