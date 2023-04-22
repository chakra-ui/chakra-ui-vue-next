/// <reference types="../../../@types/cypress" />

import UseDisclosureDrawer from "../examples/use-disclosure-drawer.vue"
import UseDisclosureProps from "../examples/use-disclosure-props.vue"
import UseDisclosureToggle from "../examples/use-disclosure-toggle.vue"

describe("useDisclosure with button/disclosure props", () => {
  it("is accessbile", () => {
    cy.mount(UseDisclosureProps).checkA11y()
  })

  it("renders the button props correctly", () => {
    cy.mount(UseDisclosureProps)

    const button = cy.get("button")

    button
      .should("have.attr", "aria-expanded", "false")
      .and("have.attr", "aria-controls", "disclosure-2")
  })

  it("toggles the disclosure", () => {
    cy.mount(UseDisclosureProps)

    cy.get("button").should("have.attr", "aria-expanded", "false")
    cy.get("#disclosure-3").should("be.hidden")

    cy.get("button")
      .invoke("click")
      .should("have.attr", "aria-expanded", "true")

    cy.get("#disclosure-3").should("not.be.hidden")

    cy.get("button")
      .invoke("click")
      .should("have.attr", "aria-expanded", "false")
    cy.get("#disclosure-3").should("be.hidden")
  })
})

describe("useDisclosure with onToggle", () => {
  it("toggles the text", () => {
    cy.mount(UseDisclosureToggle)

    cy.contains("div", "Toggled On with onToggle!").should("be.hidden")

    cy.get("button").contains("This is a button").invoke("click")

    cy.contains("div", "Toggled On with onToggle!").should("not.be.hidden")
  })
})

describe("useDisclosure with drawer", () => {
  it("toggles drawer", () => {
    cy.mount(UseDisclosureDrawer)

    cy.get(".chakra-modal__content-container").should("not.exist")

    cy.contains("button", "Open Drawer").invoke("click")

    cy.get(".chakra-modal__content-container")
      .should("exist")
      .get(".chakra-modal__close-button")
      .invoke("click")

    cy.get(".chakra-modal__content-container").should("not.exist")
  })
})
