import { h } from 'vue'
import * as Examples from '../examples'

it('should work', () => {
  cy.mount(<Examples.PopperV2Example.default />)

  cy.get('div').contains('Popper').should('exist')
  cy.get('div').contains('Testing').click()
  cy.get('div').contains('Popper').should('not.exist')
})
