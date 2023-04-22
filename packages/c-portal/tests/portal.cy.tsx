/// <reference types="../../../@types/cypress" />

import * as Examples from "../examples"
import { h, Fragment } from "vue"
import { CPortal } from "../src"

const style = {
  width: "300px",
  height: "300px",
  position: "absolute",
  bottom: "40px",
  right: "40px",
  border: "2px solid salmon",
} as const

describe("<Portal />", () => {
  afterEach(() => {
    cy.checkA11y()
  })

  describe("Portal Examples", () => {
    Object.entries(Examples).map(([name, example]) => {
      it.skip(`renders ${name} successfully`, () => {
        cy.mount(example.default).then(({ wrapper }) => {
          cy.wrap(wrapper.element).screenshot()
        })
      })
    })
  })

  it("should not render anything if no children exist", () => {
    cy.mount(<CPortal />)
      .its("parentElement")
      .should("not.have.descendants")
  })

  it("should create default target for default children", () => {
    cy.mount(() => (
      <CPortal>
        <div data-testid="provided-content">Child Content</div>
      </CPortal>
    ))
      .get("[data-testid=provided-content]")
      .should("exist")
      .and("contain.text", "Child Content")
  })

  it("should render children to the provided portal target", () => {
    const targetId = "somewhere-else"
    const childText = `Now we're thinking with portals`
    const portalSelector = "actual-portal"

    const target = document.createElement("div")
    target.id = targetId
    Object.assign(target.style, style)
    document.body.appendChild(target)

    cy.mount(() => {
      return h(() => (
        <CPortal data-testid={portalSelector} to={`#${targetId}`}>
          {childText}
        </CPortal>
      ))
    })
      .get(`#${targetId}`)
      .should("contain.text", childText)
      .get(`[data-testid=${portalSelector}]`)
      .should("not.exist")
  })
})
