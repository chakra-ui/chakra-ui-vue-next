import * as ChakraComponents from "@chakra-ui/vue-next"
import type * as Theme from "@chakra-ui/theme"

export const componentResolver = (name: string) => {
  if (name in ChakraComponents) {
    return {
      importName: name,
      path: `@chakra-ui/vue-next`,
    }
  }
}
