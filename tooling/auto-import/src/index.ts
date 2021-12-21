import * as ChakraComponents from "@chakra-ui/vue-next"

export const componentResolver = (name: string) => {
  if (name in ChakraComponents) {
    return {
      importName: name,
      path: `@chakra-ui/vue-next`,
    }
  }
}
