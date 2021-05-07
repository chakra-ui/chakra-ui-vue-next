/*
 * This file should be replaced with cypress-axe
 * once that package becomes esm-compatible
 */
import axeCore from 'axe-core'

axeCore.configure({
  rules: [{ id: 'color-contrast', enabled: false }],
})

Cypress.Commands.add('checkA11y', () => {
  // @ts-ignore
  expect().to.be.accessible
})

/**
 * Register the mocha assertion for `.accessible`
 */
const isAccessible = (_chai, utils) => {
  _chai.Assertion.addProperty('accessible', function () {
    let _this = this

    return cy.get('#__cy_root', { log: false }).then(async ($root) => {
      const result = await axeCore.run($root[0])
      console.log(`A11y results: `, result)
      const { passes, violations } = result

      // @ts-ignore
      const assert = () => {
        _this.assert(
          violations.length <= 0,
          violations.length
            ? `🔨 ${
                violations.length
              } A11y checks failed. See console for output.
${JSON.stringify(violations, null, 2)}
`
            : `✅ A11y checks passed (${passes.length} passed}`
        )
      }

      if (!violations.length) {
        return assert()
      }

      passes
        .map((v) => () => cy.log(`✅ A11y: ${v.help}`, v))
        .concat(violations.map((v) => () => cy.log(`🚫 A11y: ${v.help}`, v)))
        // @ts-ignore
        .concat([() => cy.then(assert)])
        .forEach((f) => f())
    })
  })
}

chai.use(isAccessible)
