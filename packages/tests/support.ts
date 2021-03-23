import { mount as cyMount } from '@cypress/vue'

import ChakraUIVuePlugin, { chakra } from '@chakra-ui/vue-next'
import { domElements } from '@chakra-ui/vue-system'
import { feActivity } from 'feather-icons-paths'
import { MotionPlugin } from '@vueuse/motion'

import './a11y'
import axeCore from 'axe-core'

axeCore.configure({
  rules: [
    { id: 'color-contrast', enabled: false }
  ]
})

const components = domElements.reduce((acc, tag) => {
  acc[`chakra.${tag}`] = chakra(tag)
  return acc
}, {})


// @ts-ignore
Cypress.Commands.add('mount', (component, options?) => {
  return cyMount(component, {
    global: {
      plugins: [
        MotionPlugin,
        [ChakraUIVuePlugin, { icons: { library: { feActivity }}}]
      ],
      components
    },
    ...options
  })
})

Cypress.Commands.add('checkA11y', () => {
  // @ts-ignore
  expect().to.be.accessible
})
