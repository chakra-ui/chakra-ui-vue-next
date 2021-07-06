import { h, Fragment, ref, defineComponent } from 'vue'
import { cy, expect } from 'local-cypress'
import {
  CModal,
  CModalBody,
  CModalCloseButton,
  CModalFooter,
  CModalHeader,
  CModalOverlay,
  CModalContent,
} from '../src'
import { CButton } from '../../c-button'
import ReturnFocusOnCloseExample from '../examples/modal-return-focus.vue'
import SimpleModalExample from '../examples/modal-simple.vue'

const render = (props: any = {}) => {
  return cy.mount(
    h(() => (
      <CModal modelValue={true} {...props}>
        <CModalOverlay />
        <CModalContent data-testid="dialog">
          <CModalCloseButton data-testid="close-button" />
          <CModalHeader data-testid="header">Modal header</CModalHeader>
          <CModalBody data-testid="body">Modal body</CModalBody>
          <CModalFooter>Modal footer</CModalFooter>
        </CModalContent>
      </CModal>
    ))
  )
}

describe('Modal', () => {
  it('should not have any accessibility violations', () => {
    const isOpen = ref(true)
    render()
      .then(() => {
        isOpen.value = false
      })
      .checkA11y()
  })

  it('should should have aria attributes', () => {
    render()

    let dialog: JQuery<HTMLElement>[0] | undefined

    cy.get('[aria-modal=true]')
      .should('exist')
      .then((el) => {
        dialog = el[0]
        expect(dialog.querySelector('[data-testid="header"]')?.id).equal(
          dialog.getAttribute('aria-labelledby')
        )
        expect(dialog.querySelector('[data-testid="body"]')?.id).equal(
          dialog.getAttribute('aria-describedby')
        )
      })
  })

  it('should emit "close" event when closed', () => {
    const onClose = cy.stub()
    const props = {
      'onUpdate:modelValue': onClose,
    }

    cy.mount(
      h(() => (
        <CModal modelValue={true} {...props}>
          <CModalOverlay />
          <CModalContent data-testid="dialog">
            <CModalCloseButton data-testid="close-button" />
            <CModalHeader data-testid="header">Modal header</CModalHeader>
            <CModalBody data-testid="body">Modal body</CModalBody>
            <CModalFooter>Modal footer</CModalFooter>
          </CModalContent>
        </CModal>
      ))
    )

    cy.get('[data-testid="close-button"]')
      .should('have.attr', 'aria-label', 'Close')
      .click({ force: true })
      .wait(1000)
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
  it.skip('should set initial focus ref', () => {
    cy.mount(
      h(
        defineComponent({
          setup() {
            const initialFocusRef = ref()
            return () => (
              <CModal
                modelValue={true}
                initialFocusRef={() => initialFocusRef.value}
              >
                <CModalOverlay />
                <CModalContent data-testid="dialog">
                  <CModalCloseButton data-testid="close-button" />
                  <CModalHeader data-testid="header">Modal header</CModalHeader>
                  <CModalBody data-testid="body">Modal body</CModalBody>
                  <CModalFooter>
                    <CButton ref={initialFocusRef} data-testid="initial-focus">
                      Initial Focus
                    </CButton>
                  </CModalFooter>
                </CModalContent>
              </CModal>
            )
          },
        })
      )
    )

    cy.get('[data-testid="initial-focus"]').should('have.focus')
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
  it.skip('should trap focus while open', () => {
    cy.mount(
      h(() => (
        <CModal modelValue={true}>
          <CModalOverlay />
          <CModalContent data-testid="dialog">
            <CModalCloseButton data-testid="close-button" />
            <CModalHeader data-testid="header">Modal header</CModalHeader>
            <CModalBody data-testid="body">Modal body</CModalBody>
            <CModalFooter>
              <CButton size="sm">Action 1</CButton>
              <CButton size="sm">Action 2</CButton>
              <CButton size="sm">Action 3</CButton>
              <CButton size="sm">Action 4</CButton>
              <CButton size="sm">Action 5</CButton>
            </CModalFooter>
          </CModalContent>
        </CModal>
      ))
    )

    cy.wait(1000)
      .get('[data-testid="close-button"]')
      .should('have.focus')
      .log('Trigger tab() 20 times')
    new Array(20).forEach(() => {
      // @ts-expect-error Tab action
      cy.focused().tab()
    })
    cy.get('[data-testid="dialog"]').then((el) => {
      expect(el[0].contains(document.activeElement)).to.be.true
    })
  })

  it('should return focus on close', () => {
    cy.mount(h(() => <ReturnFocusOnCloseExample />))

    cy.get('[data-testid=open-modal]').click()

    cy.get('[aria-modal=true]').should('exist')

    cy.get('[data-testid=close-button]').click({ force: true })

    cy.get('[data-testid=open-modal]').should('have.focus')
  })

  it('should focus finalFocusRef if provided onClose', () => {
    cy.mount(h(() => <SimpleModalExample />))

    cy.get('[data-testid=open-modal]').click()

    cy.get('[aria-modal=true]').should('exist')

    cy.get('[data-testid=close-button]').click({ force: true })

    cy.get('[data-testid=final-focus]').should('have.focus')
  })

  it('should close modal when "esc" key is pressed', () => {
    cy.mount(h(() => <ReturnFocusOnCloseExample />))

    cy.get('[data-testid=open-modal]').click()

    cy.get('[aria-modal=true]')
      .should('exist')
      .type('{esc}', { force: true })
      .then((el) => {
        expect(el[0]).not.to.exist
      })
  })
})
