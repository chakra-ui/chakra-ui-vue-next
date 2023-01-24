/// <reference types="../../../@types" />

import { h, Fragment, defineComponent, ref } from "vue"
import * as Examples from "../examples"

// TODO: Add more input group related tests
describe("Input Examples", () => {
  Object.entries(Examples).map(([name, example]) => {
    it(`renders ${name} successfully`, () => {
      // @ts-ignore
      cy.mount(h(example.default)).checkA11y({
        axeOptions: {
          rules: {
            label: { enabled: false },
          },
        },
      })
    })
  })
})

describe("CInput tests", () => {
  it("should update value with v-model", () => {
    cy.mount(h(Examples.InputExample.default))

    cy.get('[data-testid="input"]')
      .should("exist")
      .should("have.value", "hello")
  })
})
