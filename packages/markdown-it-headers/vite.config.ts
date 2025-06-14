import { defineConfig, mergeConfig } from 'vite'
import pkg from './package.json'
import baseConfig from '../../vite.config.base'

export default mergeConfig(
  baseConfig,
  defineConfig({
    build: {
      rollupOptions: {
        external: Object.keys(pkg.dependencies)
      }
    }
  })
)
