import { h } from 'vue'
import { CButtonGroup, CButton } from '../src'
import { ButtonGroup } from '../examples'

afterEach(() => {
  cy.checkA11y()
})

Object.entries(ButtonGroup).map(([name, example]) => {
  it(`renders ${name} successfully`, () => {
    cy.mount(example.default).checkA11y()
  })
})

it('with a color scheme', () => {
  cy.mount(h(() => 
    <CButtonGroup>
      <CButton colorScheme="blue">Save</CButton>
      <CButton>Cancel</CButton>
    </CButtonGroup>
  ))
})