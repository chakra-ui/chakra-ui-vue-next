import { h, defineComponent, PropType } from 'vue'

import { css } from '@chakra-ui/styled-system'
import { css as emotionCss, cx } from '@emotion/css'
import theme from '@chakra-ui/vue-theme'
import { chakra } from '@chakra-ui/system-vue'
import { DOMElements } from '@chakra-ui/system-vue/dist/types/system.utils'

const CAlert = defineComponent({
  name: 'CAlert',
  props: {
    as: {
      type: [String, Object] as PropType<DOMElements>,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    const alertStyles = css({
      bg: 'blue.400',
      p: 4,
      color: 'white',
      _hover: {
        bg: 'green.400',
      },
    })({ theme })

    const className = emotionCss(alertStyles)

    return () =>
      h(
        chakra[props.as],
        {
          ...attrs,
          class: cx('chakra-alert', className),
          role: 'alert',
        },
        slots
      )
  },
})

export default CAlert
