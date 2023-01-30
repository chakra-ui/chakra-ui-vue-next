/** @ts-ignore */
import * as ChakraComponents from "@chakra-ui/vue-next"
import type * as Theme from "@chakra-ui/theme"
import type * as ThemeTools from "@chakra-ui/theme-tools"
import type * as CThemeProvider from "@chakra-ui/c-theme-provider"

export const componentResolver = (name: string) => {
  if (name in ChakraComponents) {
    return {
      importName: name,
      path: `@chakra-ui/vue-next`,
    }
  }
}
