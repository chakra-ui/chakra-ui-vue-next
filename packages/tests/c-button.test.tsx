import { CButton } from '@chakra-ui/c-button'
import { h } from 'vue'

it('renders a button successfully', () => {
  cy.mount(<CButton>An example button</CButton>).checkA11y()
})