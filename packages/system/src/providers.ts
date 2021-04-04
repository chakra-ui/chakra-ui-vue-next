import { createContext } from '@chakra-ui/vue-utils'
import { Dict } from '@chakra-ui/utils'
import { SystemStyleObject } from '@chakra-ui/styled-system'
import { ComputedRef } from '@vue/reactivity'

const [StylesProvider, useStyles] = createContext<
  ComputedRef<Dict<SystemStyleObject>>
>({
  name: 'StylesContext',
  errorMessage:
    'useStyles: `styles` is undefined. Seems you forgot to provide `StylesProvider(...)` ',
})

export { StylesProvider, useStyles }
