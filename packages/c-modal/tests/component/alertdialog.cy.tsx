/// <reference types="../../../../@types/cypress" />

import { h, Fragment, ref } from "vue"
import {
  CAlertDialog,
  CAlertDialogBody,
  CAlertDialogCloseButton,
  CAlertDialogFooter,
  CAlertDialogHeader,
  CAlertDialogOverlay,
  CAlertDialogContent,
} from "../../src"
import { CButton } from "@chakra-ui/c-button"

const render = (props: any = {}) => {
  return cy.mount(() =>
    h(() => (
      <CAlertDialog modelValue={true} {...props}>
        <CAlertDialogOverlay />
        <CAlertDialogContent data-testid="dialog">
          <CAlertDialogCloseButton data-testid="close-button" />
          <CAlertDialogHeader data-testid="header">
            Modal header
          </CAlertDialogHeader>
          <CAlertDialogBody data-testid="body">Modal body</CAlertDialogBody>
          <CAlertDialogFooter>Modal footer</CAlertDialogFooter>
        </CAlertDialogContent>
      </CAlertDialog>
    ))
  )
}

describe("AlertDialog", () => {
  it("should not have any accessibility violations", () => {
    const isOpen = ref(true)
    render()
      .then(() => {
        isOpen.value = false
      })
      .checkA11y()
  })

  it("should should have aria attributes", () => {
    render()

    let dialog: JQuery<HTMLElement>[0] | undefined

    cy.get("[role=alertdialog]")
      .should("exist")
      .then((el) => {
        dialog = el[0]
        expect(dialog.querySelector('[data-testid="header"]')?.id).equal(
          dialog.getAttribute("aria-labelledby")
        )
        expect(dialog.querySelector('[data-testid="body"]')?.id).equal(
          dialog.getAttribute("aria-describedby")
        )
      })
  })

  it('should emit "close" event when closed', () => {
    const onClose = cy.stub()
    const props = {
      "onUpdate:modelValue": onClose as any,
    }

    cy.mount(() =>
      h(() => (
        <CAlertDialog modelValue={true} {...props}>
          <CAlertDialogOverlay />
          <CAlertDialogContent data-testid="dialog">
            <CAlertDialogCloseButton data-testid="close-button" />
            <CAlertDialogHeader data-testid="header">
              Modal header
            </CAlertDialogHeader>
            <CAlertDialogBody data-testid="body">Modal body</CAlertDialogBody>
            <CAlertDialogFooter>Modal footer</CAlertDialogFooter>
          </CAlertDialogContent>
        </CAlertDialog>
      ))
    )

    cy.get('[data-testid="close-button"]')
      .should("have.attr", "aria-label", "Close")
      .click({ force: true })
      .then(() => {
        expect(onClose).to.have.been.called
      })
  })

  /**
   * Why are we skipping this test for now?
   *
   * There seems to be a bug in Cypress that was
   * introduced with the latest upgrade to Vue 3.0.11
   * with regards to forming focus traps.
   *
   * The actual implementation in the browser works,
   * but this test fails for a reason that I am yet
   * to discover.
   *
   * This should be treated as important however.
   */
  it("should trap focus while open", () => {
    cy.mount(() =>
      h(() => (
        <CAlertDialog modelValue={true}>
          <CAlertDialogOverlay />
          <CAlertDialogContent data-testid="dialog">
            <CAlertDialogCloseButton data-testid="close-button" />
            <CAlertDialogHeader data-testid="header">
              Modal header
            </CAlertDialogHeader>
            <CAlertDialogBody data-testid="body">Modal body</CAlertDialogBody>
            <CAlertDialogFooter>
              <CButton size="sm">Action 1</CButton>
              <CButton size="sm">Action 2</CButton>
              <CButton size="sm">Action 3</CButton>
              <CButton size="sm">Action 4</CButton>
              <CButton size="sm">Action 5</CButton>
            </CAlertDialogFooter>
          </CAlertDialogContent>
        </CAlertDialog>
      ))
    )

    cy.get('[data-testid="close-button"]').should("have.focus")

    cy.log("Trigger tab() 20 times")
    new Array(20).forEach(() => {
      cy.focused().type("{tab}")
    })
    cy.get('[data-testid="dialog"]').then((el) => {
      expect(el[0].contains(document.activeElement)).to.be.true
    })
  })
})
