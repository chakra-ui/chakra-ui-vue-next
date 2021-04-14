import { ComponentOptions } from '@vue/runtime-core'
import theme from '@chakra-ui/vue-theme'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import * as vtl from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { Component, defineComponent, h, provide } from 'vue'
import { toHaveNoViolations, axe } from 'jest-axe'
import { RunOptions } from 'axe-core'

expect.extend(toHaveNoViolations)

const useDefaultProviders = () => {
  provide('$chakraTheme', theme)
  provide('$chakraColorMode', 'light')
  provide('$chakraIcons', {})
}

export type TestRenderProps = {
  [key: string]: any
  inlineAttrs?: string
} & Partial<Component>

type A11yOptions = { axeOptions?: RunOptions }
export interface RenderResult extends vtl.RenderResult {
  asFragment: (innerHTML?: string) => DocumentFragment
}

/** Render component instance */
export const render = (
  component: Component,
  ...rest: any | undefined
): RenderResult => {
  const utils = vtl.render(
    defineComponent({
      name: 'ChakraUIVueTestContainer',
      setup(_, { slots }) {
        useDefaultProviders()
        return () => h(component as any, slots)
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

/**
 * Validates against common a11y mistakes.
 *
 * Wrapper for jest-axe
 *
 * @example
 * ```ts
 * it('passes a11y test', async () => {
 *  await testA11Y(render(MyComponent));
 * });
 *
 * // sometimes we need to perform interactions first to render conditional UI
 * it('passes a11y test when open', async () => {
 *  const { container } = render(MyComponent, options);
 *
 *  fireEvent.click(screen.getByRole('button'));
 *
 *  await testA11Y(container, options);
 * });
 * ```
 */
export const testA11y = async (
  ui: vtl.RenderResult | Element,
  { axeOptions }: A11yOptions = {}
) => {
  let template = ui as Element
  if ('container' in ui) {
    template = ui.container
  }
  const results = await axe(template, axeOptions)

  expect(results).toHaveNoViolations()
}

export * from '@testing-library/vue'
export { userEvent, waitMs, useDefaultProviders }
export { axe }
