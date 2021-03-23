import { mount as cyMount } from '@cypress/vue'
import theme from '@chakra-ui/vue-theme'
import axeCore from 'axe-core'

// @ts-ignore
Cypress.Commands.add('mount', (component, options?) => {
  return cyMount(component, {
    global: {
      provide: {
        $chakraTheme: theme,
        $chakraColorMode: 'dark',
        $chakraIcons: {},
      },
    },
    ...options
  })
})

const isAccessible = (_chai, utils) => {
  _chai.Assertion.addProperty('accessible', function () {
    let _this = this
    return cy.get('#cypress-root', { log: false }).then(async ($root) => {
      const { passes, violations } = await axeCore.run($root[0])

      // @ts-ignore
      const assert = () => {
        _this.assert(
          violations.length <= 0,
          violations.length ? `🚫 A11y checks failed (${violations.length})` : `✅ A11y checks passed (${passes.length} passed}`
        )
      }

      if (!violations.length) {
        return assert()
      }

      passes.map(v => () => cy.log(`✅ A11y: ${v.help}`))
        .concat(violations.map(v => () => cy.log(`🚫 A11y: ${v.help}`)))
        // @ts-ignore
        .concat([() => cy.then(assert)])
        .forEach(f => f())
    })
  })
}

chai.use(isAccessible)

Cypress.Commands.add('checkA11y', () => {
  // @ts-ignore
  expect().to.be.accessible
})