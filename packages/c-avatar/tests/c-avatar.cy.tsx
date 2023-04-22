/// <reference types="../../../@types/cypress" />
import { h, ref } from "vue"

import { CAvatar } from "../src"
import * as Examples from "../examples"

describe("CAvatar", () => {
  it("has no accessibility violation", () => {
    Object.entries(Examples).map(([name, example]) => {
      it(`renders ${name} successfully`, () => {
        cy.mount(example.default).checkA11y()
      })
    })
  })

  it("renders with default svg", () => {
    cy.mount(() => h(CAvatar))

    cy.get("svg")
  })

  it("render initials by default when name is specified", () => {
    cy.mount(() => h(() => <CAvatar name="Hello World" />))

    cy.contains("HW")
  })

  it("renders initials while image is loading when name is specified", () => {
    cy.mount(() =>
      h(() => (
        <CAvatar
          name="Hello World"
          src="https://www.github.com/yyx990803.png"
        />
      ))
    )

    cy.contains("HW")

    cy.get("img:visible")
  })

  it("renders default svg when name is not specified", () => {
    cy.mount(() =>
      h(() => (
        <CAvatar src="https://avatars.githubusercontent.com/u/21237954?v=4" />
      ))
    )

    cy.get("svg")
    cy.get("img:visible")
  })
})
