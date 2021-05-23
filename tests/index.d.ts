/// <reference types="cypress" />

import { ChakraProps, HTMLChakraProps } from '@chakra-ui/vue-system'
import { mount } from '@cypress/vue'

type ReturnedChainableMount = Chainable<ReturnType<typeof mount>>

interface MountFunction extends ReturnedChainableMount {
  checkA11y(options?: any, params?: object): Chainable
  then: (rtn?: any) => any
  get: (qry: string) => ReturnedChainableMount
}

declare global {
  declare namespace Cypress {
    export interface Chainable {
      mount(component: any): MountFunction
      /**
       * Run a11y tests or only a subset of all tests
       * @see https://github.com/avanslaars/cypress-axe
       * @example
       *  cy.checkA11y()
       */
      checkA11y(options?: any, params?: object): Chainable
    }
  }
  declare namespace JSX {
    export interface IntrinsicAttributes extends ChakraProps {}
  }
}
