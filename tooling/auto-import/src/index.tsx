import * as ChakraComponents from "@chakra-ui/vue-next"
import type { ComponentResolverFunction } from "unplugin-vue-components"

export const componentResolver: ComponentResolverFunction = (name: string) => {
  if (name in ChakraComponents) {
    return {
      importName: name,
      path: `@chakra-ui/vue-next`,
    }
  } else {
    return undefined as any
  }
}
