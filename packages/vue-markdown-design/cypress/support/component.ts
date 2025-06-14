// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import global styles
import '../../src/style/variables.less'

import { mount } from 'cypress/vue'

// cypress/support/e2e.js
import '@cypress/code-coverage/support'
import type { BoundaryMatcher } from '../plugins/chai-boundary/type'
import { chaiBoundary } from '../plugins/chai-boundary/chai-boundary'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
    interface Chainer<Subject> {
      (chainer: 'boundary.satisfy', matcher: BoundaryMatcher): Chainable<Subject>
      (chainer: 'not.boundary.satisfy', matcher: BoundaryMatcher): Chainable<Subject>
    }
  }
  namespace Chai {
    interface Assertion {
      boundary: {
        satisfy(matcher: BoundaryMatcher): Assertion
      }
    }
  }
}

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(MyComponent)

chai.use(chaiBoundary)
