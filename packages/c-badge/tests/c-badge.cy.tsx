import * as Examples from '../examples'
import { h } from 'vue'

describe('Badge Examples', () => {
  Object.entries(Examples).map(([name, example]) => {
    it(`renders ${name} successfully`, () => {
      cy.mount(example.default).checkA11y()
    })
  })
})
