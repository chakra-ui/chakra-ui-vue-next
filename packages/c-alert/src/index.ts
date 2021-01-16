import { h, defineComponent } from 'vue'

import { css } from '@chakra-ui/styled-system'
import { css as emotionCss, cx } from '@emotion/css'
import theme from '@chakra-ui/vue-theme'

const CAlert = defineComponent({
  props: {
    as: {
      type: [String, Object],
      default: 'div',
    },
  },
  render() {
    const alertStyles = css({
      bg: 'blue.400',
      p: 4,
      color: 'white',
      _hover: {
        bg: 'green.400',
      },
    })({ theme })

    const className = emotionCss(alertStyles)

    return h(
      this.as,
      {
        ...this.$attrs,
        class: cx('chakra-alert', className),
        role: 'alert',
      },
      this.$slots.default && this.$slots.default()
    )
  },
})

export default CAlert
