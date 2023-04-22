/// <reference types="../../../@types/cypress" />

import { CAccordion } from "../src"
import { h } from "vue"

it("should render properly", () => {
  cy.mount(<CAccordion />)
})
