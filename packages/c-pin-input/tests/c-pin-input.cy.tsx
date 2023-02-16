/// <reference types="../../../@types" />

import { h } from "vue"
import * as Examples from "../examples"
import { CPinInput, CPinInputClearButton, CPinInputField } from "../src"

const render = (props?: any) => {
  cy.mount(() => {
    return h(() => (
      <CPinInput {...props}>
        <CPinInputField />
        <CPinInputField />
        <CPinInputField />
        {props?.clear && (
          <CPinInputClearButton>Clear</CPinInputClearButton>
        )}{" "}
      </CPinInput>
    ))
  })
}

describe("CPinInput", () => {
  Object.entries(Examples).map(([name, example]) => {
    it(`renders ${name} successfully`, () => {
      cy.mount(example.default).checkA11y()
    })
  })

  it.skip("renders default value correctly", () => {
    const value = ["1", "2"]

    render({ value })

    cy.get(`input[id="pin-input:0:0"]`).should("have.value", "1")
    cy.get(`input[id="pin-input:0:1"]`).should("have.value", "2")
    cy.get(`input[id="pin-input:0:2"]`).should("have.value", "")
  })

  it("render with different placeholder", () => {
    const placeholder = "X"
    render({ placeholder })

    cy.get(`input[id="pin-input:0:0"][placeholder="X"]`)
  })

  it("renders with password type", () => {
    const value = ["1", "2"]

    render({ value, mask: true })
    cy.get(`input[id="pin-input:0:0"][type="password"]`)
  })

  it("clears content on click on clear button", () => {
    const value = ["1", "2", "3"]

    render({ value, clear: true })
    cy.contains("Clear").click()

    cy.get(`input[id="pin-input:0:0"]`).should("have.value", "")
    cy.get(`input[id="pin-input:0:1"]`).should("have.value", "")
    cy.get(`input[id="pin-input:0:2"]`).should("have.value", "")
  })
})
