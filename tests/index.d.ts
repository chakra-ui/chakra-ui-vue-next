/// <reference types="cypress" />
/// <reference types="local-cypress" />
/// <reference types="cypress-plugin-tab" />

import { ChakraProps, HTMLChakraProps } from "@chakra-ui/vue-system"
import { mount } from "@cypress/vue"

type ReturnedChainableMount = Chainable<ReturnType<typeof mount>>

declare module "*.vue" {
  import { Component } from "vue"
  const component: Component
  export default component
}

interface MountFunction extends ReturnedChainableMount {
  checkA11y(options?: any, params?: object): Chainable
  then: (rtn?: any) => any
  get: (qry: string) => ReturnedChainableMount
  tab: () => ReturnedChainableMount
}

declare global {
  declare namespace Cypress {
    export interface cy extends Chainable {
      mount(component: any, options?: any): MountFunction
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
    }
  }
  declare namespace JSX {
    export interface IntrinsicAttributes extends ChakraProps {}
  }
}
