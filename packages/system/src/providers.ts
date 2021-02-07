import { createContext, Dict } from '@chakra-ui/vue-utils'
import { SystemStyleObject } from '@chakra-ui/styled-system'

const [StylesProvider, useStyles] = createContext<Dict<SystemStyleObject>>({
  name: 'StylesContext',
  errorMessage:
    'useStyles: `styles` is undefined. Seems you forgot to provide `StylesProvider(...)` ',
})

export { StylesProvider, useStyles }
