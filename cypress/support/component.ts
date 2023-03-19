/// <reference types="cypress" />

// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands"

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress/vue"
import Chakra, {
  chakra,
  extendTheme,
  extendChakra,
  CReset,
} from "../../packages/vue"
import { mode } from "@chakra-ui/theme-tools"
import { feActivity, feUser } from "feather-icons-paths"
import { h, Fragment, defineComponent } from "vue"

import { domElements } from "../../packages/system"

import { MotionPlugin } from "@vueuse/motion"
import "./env"

const chakraOptions = extendChakra({
  cssReset: true,
  icons: {
    library: {
      feActivity,
      feUser,
    },
  },
  extendTheme: extendTheme({}),
})

// @ts-ignore
Cypress.Commands.add("mount", (component, options = {}) => {
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []
  options.global.components = options.global.components || {}
  options.global.plugins.push({
    install(app) {
      app.use(MotionPlugin)
      app.use(Chakra, chakraOptions)
    },
  })

  domElements.forEach((tag) => {
    // @ts-ignore
    options.global.components[`chakra?.${tag}`] = chakra(tag)
  })

  // <component> is a built-in component that comes with Vue
  // @ts-ignore
  return mount(component, options)
})
