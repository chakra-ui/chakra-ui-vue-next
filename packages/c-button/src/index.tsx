import { defineComponent } from "vue"

export { default as CButton } from "./button"
export { default as CButtonGroup } from "./button-group"
export { default as CIconButton } from "./icon-button"
import { Foo } from "./icon-button"
export { Foo }

const Bar = defineComponent((_, { slots }) => {
  return () => <Foo>{slots}</Foo>
})
