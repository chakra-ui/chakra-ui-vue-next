import theme from '@chakra-ui/vue-theme'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import * as vtl from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { Component, defineComponent, h, provide } from 'vue'

const useDefaultProviders = () => {
  provide('$chakraTheme', theme)
  provide('$chakraColorMode', 'light')
  provide('$chakraIcons', {})
}

export interface RenderResult extends vtl.RenderResult {
  asFragment: (innerHTML?: string) => DocumentFragment
}

/** Render component instance */
export const render = (
  component: Component | any,
  ...rest: any | undefined
): RenderResult => {
  const utils = vtl.render(
    defineComponent({
      name: 'ChakraUIVueTestContainer',
      setup(_, { slots }) {
        useDefaultProviders()
        return () => h(component, slots)
      },
    }),
    ...rest
  )

  return {
    ...utils,
    asFragment: (innerHTML = utils.container.innerHTML) => {
      if (typeof document.createRange === 'function') {
        return document.createRange().createContextualFragment(innerHTML)
      }

      const template = document.createElement('template')
      template.innerHTML = innerHTML
      return template.content
    },
  }
}

/**
 * Wait for given ms
 *
 * @param {number} duration
 */
function waitMs(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Get styles from document.styleSheets
 *
 * @param {String} selector
 *
 * @example className usage
 *  getElementStyles('.anyClassName')
 *
 * @example Emotion Classname
 *  const [className1, className2] = [...screen.getByTestId('aspectRatioBox').classList]
 *  const styles = getElementStyles(`.${className1}`)
 *  const pseudoStyles = getElementStyles(`.${className2}:before`)
 */
export function getElementStyles(selector: string) {
  const _selector = new RegExp(selector)
  let styles = ''
  let i
  let j
  const sel = _selector
  for (i = 0; i < document.styleSheets.length; ++i) {
    for (j = 0; j < document.styleSheets[i].cssRules.length; ++j) {
      const styleRules = document.styleSheets[i].cssRules[j] as any
      if (sel.test(styleRules.selectorText)) {
        // let selectorText = document.styleSheets[i].cssRules[j].selectorText
        const cssText = styleRules.style.cssText
        styles += cssText
      }
    }
  }
  return styles
}

export * from '@testing-library/vue'
export { userEvent, waitMs, useDefaultProviders }
