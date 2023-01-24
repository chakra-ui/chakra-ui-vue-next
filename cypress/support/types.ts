/// <reference types="cypress" />
/// <reference types="./vue-shims" />

import { ChakraProps } from "@chakra-ui/vue-system"
import { mount } from "@cypress/vue"
import type { MountingOptions } from "cypress/vue/dist/@vue/test-utils"

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
    interface IntrinsicAttributes extends ChakraProps {}
  }
}

declare module "cypress/vue" {
  export function mount(
    component: JSX.Element,
    options?: MountingOptions<any> | null
  ): Cypress.Chainable
}
