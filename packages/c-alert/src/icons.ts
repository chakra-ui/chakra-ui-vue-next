import { defineComponent, h } from 'vue'
import { CIcon } from '@chakra-ui/c-icon'

export const CCheckIcon = defineComponent({
  name: 'CCheckIcon',
  inheritAttrs: false,
  setup(_, { attrs }) {
    return () =>
      h(CIcon, {
        name: 'check-circle',
        attrs,
      })
  },
})
