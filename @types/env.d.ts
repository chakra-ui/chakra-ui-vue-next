import type {
  ComponentPublicInstance,
  FunctionalComponent,
  HTMLAttributes,
  VNode,
  DefineComponent,
} from "vue"
import type { ChakraProps } from "@chakra-ui/vue-system"
import { ChakraFactoryProps, ComponentWithProps } from "@chakra-ui/vue-system"

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass
      extends DefineComponent<ChakraFactoryProps>,
        ComponentWithProps<ChakraFactoryProps> {
      $props: {}
    }
    interface ElementAttributesProperty {
      $props: {}
    }

    interface IntrinsicAttributes
      extends Omit<HTMLAttributes, "color">,
        ChakraProps {}
  }
}

declare module "vue" {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>
}
