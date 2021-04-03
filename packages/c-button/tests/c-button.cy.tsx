import { Button } from '../examples'
import { h } from 'vue'

Object.entries(Button).map(([name, example]) => {
  it(`renders ${name} successfully`, () => {
    cy.mount(example.default).checkA11y()
  })
})