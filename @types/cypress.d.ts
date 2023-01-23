/// <reference types="cypress" />

import { Component } from "vue"
import { mount } from "@cypress/vue"

import { DefineComponent } from "vue"

// cypress/support/index.ts
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Run a11y tests or only a subset of all tests
       * @see https://github.com/avanslaars/cypress-axe
       * @example
       *  cy.checkA11y()
       */
      checkA11y(options?: any, params?: object): Chainable
      /**
       * Triggers tab action
       * @param options
       */
      tab(options?: { shift: boolean }): Chainable

      mount: typeof mount
    }
  }
}
