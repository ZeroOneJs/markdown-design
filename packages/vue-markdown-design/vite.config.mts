/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import istanbul from 'vite-plugin-istanbul'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import pkg from './package.json'
import dts from 'vite-plugin-dts'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    istanbul({ cypress: true }),
    libInjectCss(),
    dts({
      tsconfigPath: 'tsconfig.build.json',
      outDir: ['es', 'lib'],
      entryRoot: 'src'
    })
  ],
  build: {
    target: 'es2015',
    copyPublicDir: false,
    minify: false,
    rollupOptions: {
      external: ['vue', ...Object.keys(pkg.dependencies)],
      output: [
        {
          format: 'es',
          dir: 'es',
          preserveModules: true,
          entryFileNames: '[name].mjs'
        },
        {
          format: 'cjs',
          dir: 'lib',
          preserveModules: true,
          entryFileNames: '[name].js'
        }
      ]
    },
    lib: {
      entry: 'src/index.ts'
    }
  },
  test: {
    browser: {
      provider: playwright(),
      enabled: true,
      // 至少需要一个实例
      instances: [{ browser: 'chromium' }]
    }
  }
})
