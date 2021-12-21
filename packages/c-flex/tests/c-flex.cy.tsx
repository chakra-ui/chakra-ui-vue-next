import * as Examples from "../examples"
import { h } from "vue"

describe("Flex Examples", () => {
  it("works", () => {
    expect(true).to.be.true
  })

  Object.entries(Examples).map(([name, example]) => {
    it(`renders ${name} successfully`, () => {
      cy.mount(example.default).checkA11y()
    })
  })
})
