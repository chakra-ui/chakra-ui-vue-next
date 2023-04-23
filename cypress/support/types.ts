/// <reference types="cypress" />
/// <reference types="./vue-shims" />

import { StyleAndHTMLAttibutes } from "@chakra-ui/vue-next"
import { mount } from "cypress/vue"
import type { MountingOptions, VueWrapper } from "@vue/test-utils"

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
  namespace JSX {
    interface IntrinsicAttributes extends StyleAndHTMLAttibutes {}
  }
}

declare module "cypress/vue" {
  export function mount(
    component: JSX.Element,
    options?: MountingOptions<any> | null
  ): Cypress.Chainable
}
