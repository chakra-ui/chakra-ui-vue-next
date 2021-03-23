import CAccordion from '@chakra-ui/c-accordion'
import { h } from 'vue'

it('renders the accordion', () => {
  cy.mount(
    <CAccordion>
      <div>OK</div>
      <div>Ah</div>
    </CAccordion>)
  .checkA11y()
})