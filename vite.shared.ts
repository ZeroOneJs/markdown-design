import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'es2015',
    minify: false,
    rolldownOptions: {
      output: [
        {
          format: 'es',
          dir: 'dist',
          preserveModules: true,
          entryFileNames: '[name].mjs'
        },
        {
          format: 'cjs',
          dir: 'dist',
          preserveModules: true,
          entryFileNames: '[name].js'
        }
      ]
    },
    lib: {
      entry: 'src/index.ts'
    }
  }
})
