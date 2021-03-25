import kebabCase from 'lodash.kebabcase'

export const componentResolver = (name: string) => {
  if (kebabCase(name).startsWith('c-'))
    return {
      importName: name,
      path: `@chakra-ui/vue-next`,
  }
}
