import { cy, expect } from 'local-cypress'
import { h, Fragment, defineComponent, ref } from 'vue'
import { CInput } from '../src'
import * as Examples from '../examples'

// TODO: Add more input group related tests
describe.skip('Input Examples', () => {
  Object.entries(Examples).map(([name, example]) => {
    it(`renders ${name} successfully`, () => {
      // @ts-ignore
      cy.mount(h(() => <example.default></example.default>)).checkA11y({
        axeOptions: {
          rules: {
            label: { enabled: false },
          },
        },
      })
    })
  })
})

const render = (props: any) => <CInput {...props} />

describe('CInput tests', () => {
  it('should update value with v-model', () => {
    cy.mount(() =>
      render({
        vModel: ref('hello'),
        'data-testid': 'input',
      })
    )

    cy.wait(400)
      .get('[data-testid="input"]')
      .should('exist')
      .should('have.value', 'hello')
  })
})
