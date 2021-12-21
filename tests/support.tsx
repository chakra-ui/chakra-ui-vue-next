/// <reference types="cypress" />

import { mount as cyMount } from "@cypress/vue"
import { feActivity } from "feather-icons-paths"
import { MotionPlugin } from "@vueuse/motion"
import { h, Fragment, Component } from "vue"
import Chakra, { chakra, extendTheme } from "@chakra-ui/vue-next"
import { domElements, injectGlobal, toCSSVar } from "@chakra-ui/vue-system"
import { CReset } from "@chakra-ui/c-reset"
import "cypress-plugin-tab"

const theme = extendTheme({})

import "./env" // stub process.env
import "./a11y" // checkA11y and axeCore configuration
import "./styles" // root stylesheet
import "./snapshots" // @cypress/snapshot configuration
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
    Chakra,
    {
      extendTheme: theme,
      icons: {
        library: { feActivity },
      },
    },
  ],
]

// @ts-ignore
Cypress.Commands.add("mount", (MyComponent, options?) => {
  const rootComponent = () => {
    return (
      <>
        <MyComponent />
        <CReset />
      </>
    )
  }

  return cyMount(
    {
      render: rootComponent,
      components: { MyComponent, CReset },
    },
    {
      global: { plugins, components: globalComponents },
      ...options,
    }
  )
})
