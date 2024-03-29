import { createContext } from "@chakra-ui/vue-utils"
import { Dict } from "@chakra-ui/utils"
import { SystemStyleObject } from "@chakra-ui/styled-system"
import { ComputedRef } from "vue"

const [StylesProvider, useStyles] = createContext<
  ComputedRef<Dict<SystemStyleObject>>
>({
  name: "StylesContext",
  errorMessage:
    "useStyles: `styles` is undefined. Seems you forgot to provide `StylesProvider(...)` ",
})

export { StylesProvider, useStyles }

export const createStylesContext = <AnatomyParts extends readonly string[]>(
  componentName: string
) =>
  createContext<
    ComputedRef<{ [K in AnatomyParts[number]]: SystemStyleObject }>
  >({
    name: `${componentName}StylesContext`,
    errorMessage: `useStyles: "styles" is undefined. Seems you forgot to wrap the components in "<${componentName} />" `,
  })
