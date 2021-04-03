import { mount as cyMount } from '@cypress/vue'
import { feActivity } from 'feather-icons-paths'
import { MotionPlugin } from '@vueuse/motion'
import { h, Fragment } from 'vue'

import ChakraUIVuePlugin, { chakra } from '@chakra-ui/vue-next'
import { domElements } from '@chakra-ui/vue-system'
import { CReset } from '@chakra-ui/c-reset'

import './env' // stub process.env
import './a11y' // checkA11y and axeCore configuration
import './styles' // root stylesheet
import './snapshots' // @cypress/snapshot configuration

/**
 * Chakra-specific root component configuration
 */

// Register Chakra components globally
const globalComponents = domElements.reduce((acc, tag) => {
  acc[`chakra.${tag}`] = chakra(tag)
  return acc
}, {})

const plugins = [
  MotionPlugin,
  [
    ChakraUIVuePlugin,
    {
      // TODO: import icons from the same place that Playground does
      icons: {
        library: { feActivity },
      },
    },
  ],
]

// @ts-ignore
Cypress.Commands.add('mount', (MyComponent, options?) => {
  // createApp root element
  const rootComponent = () => (
    <>
      <MyComponent />
      <CReset />
    </>
  )

  return cyMount(
    {
      render: rootComponent,
      components: { MyComponent, CReset },
    },
    {
      global: { plugins, components: globalComponents },
      ...options, // To override values for specific tests
    }
  )
})
