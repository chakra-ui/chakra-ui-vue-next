import { componentResolver } from '../src'

it('should resolve chakra components with import name and path', () => {
  const components = [
    'CCloseButton',
    'CBox',
    'CPortal',
    'CHStack',
    'CVStack',
    'CBox',
    'CCircle',
    'CSquare',
    'CKbd',
  ]

  const path = '@chakra-ui/vue-next'

  components.forEach((templateComponent: string) => {
    expect(componentResolver(templateComponent)).toEqual({
      importName: templateComponent,
      path,
    })
  })
})
