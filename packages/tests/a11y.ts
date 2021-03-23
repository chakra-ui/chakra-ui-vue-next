import axeCore from 'axe-core'
const isAccessible = (_chai, utils) => {

  _chai.Assertion.addProperty('accessible', function () {
    let _this = this
    return cy.get('#cypress-root', { log: false }).then(async ($root) => {
      const result = await axeCore.run($root[0])
      const { passes, violations } = result

      // @ts-ignore
      const assert = () => {
        _this.assert(
          violations.length <= 0,
          violations.length ? `🔨 ${violations.length} A11y checks failed. See console for output.` : `✅ A11y checks passed (${passes.length} passed}`
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