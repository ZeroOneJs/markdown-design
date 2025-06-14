import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  component: {
    specPattern: 'src/**/__tests__/*.cy.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    },
    setupNodeEvents(on, config) {
      const registerCodeCoverageTasks = require('@cypress/code-coverage/task') // https://docs.cypress.io/api/node-events/overview#npm-modules
      registerCodeCoverageTasks(on, config)
      return config
    }
  }
})
