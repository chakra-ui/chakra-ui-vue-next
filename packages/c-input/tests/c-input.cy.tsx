import { cy, expect } from 'local-cypress'
import { h, Fragment, defineComponent } from 'vue'
import { CInput } from '../src'
import * as Examples from '../examples'

// TODO: Add more input group related tests
describe.skip('Input Examples', () => {
  Object.entries(Examples).map(([name, example]) => {
    it(`renders ${name} successfully`, () => {
      // @ts-ignore
      cy.mount(h(() => <example.default></example.default>))
        .checkA11y({
          axeOptions: {
            rules: {
              label: { enabled: false },
            },
          },
        })
    })
  })
})