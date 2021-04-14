import * as ChakraComponenets from '@chakra-ui/vue-next'

export const componentResolver = (name: string) => {
  if (name in ChakraComponenets) {
    return {
      importName: name,
      path: `@chakra-ui/vue-next`,
    }
  }
}
