/// <reference types="cypress" />

import { mount } from '@cypress/vue'

declare namespace Cypress {
  export interface Chainable {
    mount(): ReturnType<typeof mount>
    /**
     * Run a11y tests or only a subset of all tests
     * @see https://github.com/avanslaars/cypress-axe
     * @example
     *  cy.checkA11y()
     */
    checkA11y(any, object): Chainable
  }
}