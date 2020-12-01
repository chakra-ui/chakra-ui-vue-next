import {
  h,
  defineComponent,
  VNodeProps,
  VNode,
  Component,
  Fragment,
  Teleport,
  Suspense,
  DefineComponent,
  onMounted,
} from 'vue'

import { css } from '@chakra-ui/vue-styled-system'
import theme from '@chakra-ui/vue-theme'

type Tag =
  | string
  | typeof Fragment
  | typeof Teleport
  | typeof Suspense
  | Component

const CAlert = defineComponent({
  props: {
    as: {
      type: [String, Object],
      default: 'div',
    },
  },
  setup() {
    onMounted(() => {
      console.log(
        css({
          bg: 'blue.400',
          p: 4,
          color: 'white',
        })({ theme })
      )
    })
  },
  render() {
    return h(
      this.as,
      {
        ...this.$attrs,
        role: 'alert',
      },
      this.$slots.default && this.$slots.default()
    )
  },
})

export default CAlert
