/// <reference types="../../../../@types/cypress" />

import { h, defineComponent, ref } from "vue"
import { CRadio, CRadioGroup } from "../../index"
import * as Examples from "../../examples"

const runTest = () => {
  const radioOne = cy.get("[data-part=radio]").eq(0)
  const radioTwo = cy.get("[data-part=radio]").eq(1)
  const radioThree = cy.get("[data-part=radio]").eq(2)

  radioTwo.click()

  radioOne.within(() => cy.get("input").should("not.be.checked"))
  radioTwo.within(() => cy.get("input").should("be.checked"))
  radioThree.within(() => cy.get("input").should("not.be.checked"))
}

describe("CRadio", () => {
  Object.entries(Examples).map(([name, example]) => {
    it(`renders ${name} successfully`, () => {
      cy.mount(example.default).checkA11y()
    })
  })

  it("handles changes uncontrolled", () => {
    cy.mount(
      defineComponent(() => {
        const value = ref("1")

        return () => (
          <>
            <div data-testid="current-value">Current Value: {value.value}</div>
            <CRadioGroup
              name="radio"
              value={value.value}
              onChange={(e) => (value.value = e)}
            >
              <CRadio value="1">One</CRadio>
              <CRadio value="2">Two</CRadio>
              <CRadio value="3">Three</CRadio>
            </CRadioGroup>
          </>
        )
      })
    )

    runTest()
    cy.get("[data-testid=current-value]").and(
      "contain.text",
      "Current Value: 2"
    )
  })

  it("handles changes controlled with v-model", () => {
    cy.mount(
      defineComponent(() => {
        const value = ref("1")

        function onChange(e: string) {
          value.value = e
        }

        return () => (
          <>
            <div data-testid="current-value">Current Value: {value.value}</div>
            <CRadioGroup
              name="radio"
              modelValue={value.value}
              onUpdate:modelValue={onChange}
            >
              <CRadio value="1">One</CRadio>
              <CRadio value="2">Two</CRadio>
              <CRadio value="3">Three</CRadio>
            </CRadioGroup>
          </>
        )
      })
    )

    runTest()
    cy.get("[data-testid=current-value]").and(
      "contain.text",
      "Current Value: 2"
    )
  })
})
