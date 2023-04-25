/// <reference types="../../../../@types/cypress" />

import { h, Fragment, defineComponent, ref } from "vue"
import { CSelect } from "../../src"

const App = defineComponent(() => {
  const value = ref("option-1")

  function onChange(e: string) {
    value.value = e
  }

  return () => (
    <div data-testid="select">
      <div data-testid="selected-value">Selected Value: {value.value}</div>
      <CSelect modelValue={value.value} onUpdate:modelValue={onChange}>
        <option value="option-1">One</option>
        <option value="option-2">Two</option>
        <option value="option-3">Three</option>
      </CSelect>
    </div>
  )
})

describe("<c-select /> component tests", () => {
  it("should render properly", () => {
    cy.mount(<App />)
    cy.get("[data-testid=select]").should("exist")
    cy.get("[data-testid=selected-value]").and("contain.text", "option-1")
  })

  it("should update with modelValue", () => {
    cy.mount(<App />)
    cy.get("[data-testid=select]").should("exist")
    cy.get("[data-testid=selected-value]").and("contain.text", "option-1")

    cy.get("select").select("option-2")
    cy.wait(2)
    cy.get("[data-testid=selected-value]").and("contain.text", "option-2")
  })
})
