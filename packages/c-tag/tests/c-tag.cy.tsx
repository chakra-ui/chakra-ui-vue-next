import { cy } from "local-cypress"
import { h, ref } from "vue"
import * as Examples from "../examples"
import { CTag, CTagLabel, CTagCloseButton } from "../src"

describe("Tag", () => {
  it("has no accessibility violation", () => {
    Object.entries(Examples).map(([name, example]) => {
      it(`renders ${name} successfully`, () => {
        cy.mount(h(() => example.default)).checkA11y()
      })
    })
  })

  it("triggers click action on close button", () => {
    cy.mount(() => {
      const label = ref("opened")
      const triggerClose = () => (label.value = "closed")

      return h(() => (
        <CTag>
          <CTagLabel>{label.value}</CTagLabel>
          <CTagCloseButton
            data-testid="close-button"
            onClick={() => triggerClose()}
          />
        </CTag>
      ))
    })

    cy.get("button").click()

    cy.get("span").contains("closed")
  })

  it("does not trigger click action on disabled close button", () => {
    cy.mount(() => {
      const label = ref("opened")
      const triggerClose = () => (label.value = "closed")

      return h(() => (
        <CTag>
          <CTagLabel>{label.value}</CTagLabel>
          <CTagCloseButton
            isDisabled
            data-testid="close-button-disabled"
            onClick={() => triggerClose()}
          />
        </CTag>
      ))
    })

    cy.get("button").click({ force: true })

    cy.get("span").contains("opened")
  })
})
