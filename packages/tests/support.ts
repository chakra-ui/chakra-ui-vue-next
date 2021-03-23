import { mount as cyMount } from '@cypress/vue'

import ChakraUIVuePlugin, { chakra } from '@chakra-ui/vue-next'
import { domElements } from '@chakra-ui/vue-system'
import { feActivity } from 'feather-icons-paths'
import { MotionPlugin } from '@vueuse/motion'
import { h } from 'vue'

import './a11y'
import axeCore from 'axe-core'
import {CReset} from '@chakra-ui/c-reset'

const style = document.createElement('style')
style.innerText = `html, body {
  margin: 0;
  height: 100vh;
  width: 100vw;
}

html {
  line-height: 1.5;
  color: rgb(26, 32, 44);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#app {
  height: inherit;
  width: inherit;
}

a {
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}`

document.head.appendChild(style)

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
  return cyMount({
    render: () => [h(component), h(CReset)],
    components: { CReset, component }
  }, {
    global: {
      plugins: [
        MotionPlugin,
        [ChakraUIVuePlugin, { icons: { library: { feActivity } } }]
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


