import {
  Component,
  defineComponent,
  Fragment,
  Suspense,
  Teleport,
  h,
} from 'vue'
import { DOMElements } from './system.utils'

type Tag =
  | string
  | typeof Fragment
  | typeof Teleport
  | typeof Suspense
  | Component

export const chakra = (tag: DOMElements, componentProps = {}) => {
  return defineComponent({
    inheritAttrs: false,
    props: componentProps,
    setup(props, { slots, attrs }) {
      return () => h(tag, {}, slots)
    },
  })
}
