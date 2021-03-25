import { componentResolver } from '../src'

it('should resolve chakra components with import name and path', () => {
  const components = [
    'CColorModeProvider',
    'CBox',
    'CPortal'
  ]

  const path = '@chakra-ui/vue-next'

  components.forEach((templateComponent: string) => {
    expect(componentResolver(templateComponent)).toEqual({ importName: templateComponent, path })
  });
})