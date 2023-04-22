/// <reference types="../../../@types/cypress" />

import { Button } from "../examples"
import { h } from "vue"
import { CButton } from "../src"

Object.entries(Button).map(([name, example]) => {
  it(`renders ${name} successfully`, () => {
    cy.mount(example.default).checkA11y()
  })
})

it("should render properly", () => {
  cy.mount(<CButton>Hello</CButton>).then(({ wrapper }) => {
    cy.wrap(wrapper.element).screenshot()
  })
})
