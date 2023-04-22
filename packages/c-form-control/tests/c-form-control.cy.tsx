/// <reference types="../../../@types/cypress" />

import { h, Fragment, defineComponent } from "vue"
import {
  CFormControl,
  CFormErrorIcon,
  CFormErrorMessage,
  CFormHelperText,
  CFormLabel,
  useFormControl,
} from "../src"
import * as Examples from "../examples"
import { CInput } from "../../c-input"

describe("FormControl Examples", () => {
  Object.entries(Examples).map(([name, example]) => {
    it(`renders ${name} successfully`, () => {
      cy.mount(example.default).checkA11y()
    })
  })
})

const render = (props: any = {}) => {
  return cy.mount(() => {
    return h(() => (
      <CFormControl id="name" {...props}>
        <CFormLabel>Name</CFormLabel>
        <CInput id="name" placeholder="Name" />
        <CFormHelperText>Enter your name please!</CFormHelperText>
        <CFormErrorMessage>Your name is invalid</CFormErrorMessage>
      </CFormControl>
    ))
  })
}

describe("<CFormControl />", () => {
  afterEach(() => {
    cy.checkA11y()
  })

  it("passes a11y test in when required", () => {
    render({ isRequired: true }).checkA11y()
  })

  it("passes a11y test in when invalid", () => {
    render({ isInvalid: true }).checkA11y()
  })

  it("only displays error icon and message when invalid - 1", () => {
    cy.mount(() => {
      return h(() => (
        <CFormControl id="name">
          <CFormLabel>Name</CFormLabel>
          <CInput id="name" placeholder="Name" />
          <CFormHelperText>Enter your name please!</CFormHelperText>
          <CFormErrorMessage data-testid="message">
            <CFormErrorIcon data-testid="icon" />
            Your name is invalid
          </CFormErrorMessage>
        </CFormControl>
      ))
    })
    cy.get('[data-testid="message"]').should("not.exist")
    cy.get('[data-testid="icon"]').should("not.exist")
  })

  it("only displays error icon and message when invalid - 2", () => {
    cy.mount(() => {
      return h(() => (
        <CFormControl id="other-name">
          <CFormLabel>Name</CFormLabel>
          <CInput id="other-name" placeholder="Name" />
          <CFormHelperText>Enter your name please!</CFormHelperText>
          <CFormErrorMessage>Your name is invalid</CFormErrorMessage>
        </CFormControl>
      ))
    })

    cy.get('#name > [role="presentation"]').should("not.exist")
  })

  it("useFormControl calls provided input callbacks", () => {
    const onFocus = cy.stub()
    const onBlur = cy.stub()
    const props = {
      onFocus,
      onBlur,
    }

    cy.mount(() => {
      return h(() => (
        <CFormControl id="other-name">
          <CFormLabel>Name</CFormLabel>
          <CInput
            id="other-name"
            placeholder="Name"
            data-testid="input"
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </CFormControl>
      ))
    }).then(() => {
      cy.get('[data-testid="input"]')
        .focus()
        .then(() => {
          cy.focused().should("have.attr", "data-testid", "input")
          expect(onFocus).to.have.been.called
        })
        .blur()
        .then(() => {
          expect(onBlur).to.have.been.called
        })
    })
  })

  // Here attrsibtutes a re renderedn correctly in DOM but not in
  // test environment. Not sure why
  it("has the proper aria-attibutes", () => {
    cy.mount(() => {
      return h(() => (
        <CFormControl id="name">
          <CFormLabel> First name </CFormLabel>
          <CInput id="name" data-testid="input" placeholder="First Name" />
          <CFormHelperText> Keep it very short and sweet! </CFormHelperText>
        </CFormControl>
      ))
    })

    cy.get('[data-testid="input"]')
      .should("have.attr", "aria-describedby", "helptext-name")
      .should("not.have.attr", "aria-invalid")
    cy.get('[data-testid="input"]').should("not.have.attr", "aria-required")
    cy.get('[data-testid="input"]').should("not.have.attr", "aria-readonly")
  })
})

// TODO:
/**
 * Add tests for
 * 1) aria-attributes
 * 2) data-attributes
 * 3) custom aria-describedby reference
 */
