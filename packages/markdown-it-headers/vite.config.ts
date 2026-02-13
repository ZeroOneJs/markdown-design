import { defineConfig, mergeConfig } from 'vite'
import pkg from './package.json'
import sharedConfig from '../../vite.shared'

export default mergeConfig(
  sharedConfig,
  defineConfig({
    build: {
      rolldownOptions: {
        external: Object.keys(pkg.dependencies)
      }
    }
  })
)
