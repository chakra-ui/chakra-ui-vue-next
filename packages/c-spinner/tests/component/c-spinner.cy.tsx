/// <reference types="../../../../@types/cypress" />

import * as Examples from "../../examples"
import { h } from "vue"

describe("Spinner Examples", () => {
  it("works", () => {
    expect(true).to.be.true
  })

  Object.entries(Examples).map(([name, example]) => {
    it(`renders ${name} successfully`, () => {
      cy.mount(example.default).checkA11y()
    })
  })
})
