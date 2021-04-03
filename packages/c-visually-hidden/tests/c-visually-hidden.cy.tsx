import * as Examples from '../examples'
import { h } from 'vue'

describe('Visually Hidden Examples', () => {
  it('hides text properly', () => {
    cy.mount(Examples.BaseVisuallyHidden.default)
      .get(document.body)
      .contains('Visually Hidden')
      .get('[data-testid=hidden]')
      .should('have.css', {
        border: '0px',
        clip: 'rect(0px, 0px, 0px, 0px)',
        height: '1px',
        width: '1px',
        margin: '-1px',
        padding: '0px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'absolute',
      })
  })
})
