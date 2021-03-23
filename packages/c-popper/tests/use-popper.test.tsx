import * as Examples from '../examples'

import { h, onMounted } from 'vue'
import { usePopper } from '../src'
import { useToggle } from '@vueuse/core'

// Fails with isRef error
xit('should work', () => {
  cy.mount({
    setup() {
      const [isOpen, toggleIsOpen] = useToggle(true)

      const { reference, referenceEl, popperEl, popper } = usePopper({
        gutter: 16,
        placement: 'right-end',
      })

      onMounted(() => {
        _referenceEl = referenceEl.value
        _popperEl = popperEl.value
      })

      return {
        isOpen,
        toggleIsOpen,
        reference,
        popper,
      }
    }
  })
})



