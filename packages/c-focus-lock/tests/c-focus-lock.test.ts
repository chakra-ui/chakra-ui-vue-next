import { unrefElement } from "@chakra-ui/vue-utils"
import { ref, watchEffect } from "vue"
import { render, screen, userEvent, waitMs } from "@chakra-ui/vue-test-utils"
import { CFocusLock, useFocusTrap } from "../src"

const renderComponent = (props?: any) => {
  const base = {
    components: {
      // CPortal,
      CFocusLock,
    },
    template: `
        <div ref="target" data-testid="focus-lock-container">
          <input data-testid="input" />
          <input />
          <input />
        </div>
    `,
    setup() {
      const target = ref()
      const containers = ref<Set<HTMLElement>>(new Set())
      watchEffect(
        (onInvalidate) => {
          let el: HTMLElement
          if (target.value) {
            el = unrefElement(target)
            containers.value.add(el)
          }

          onInvalidate(() => {
            containers.value.delete(el)
          })
        },
        { flush: "post" }
      )
      useFocusTrap(containers, ref(true))

      return {
        target,
      }
    },
    ...props,
  }
  return render(base)
}

it.skip("should focus first focusable child when mounted", async () => {
  renderComponent()

  /** We delay so that focus lock has time to activate */
  await waitMs(500)

  const input = screen.getByTestId("input")
  expect(input).toHaveFocus()
})

it.skip("should focus first focusable child when after tab cycle is complete", async () => {
  renderComponent()

  /** We delay so that focus lock has time to activate */
  await waitMs(500)

  await userEvent.tab()
  await waitMs(200)
  await userEvent.tab()
  await waitMs(200)
  await userEvent.tab()
  await waitMs(200)

  const input = screen.getByTestId("input")
  expect(input).toHaveFocus()
})

it.skip("should focus initialFocus element when initialFocus element is provided", async () => {
  renderComponent({
    template: `
      <div ref="target" data-testid="focus-lock-container">
        <input />
        <button ref="initialFocus" data-testid="initial-focus-element">Focus me first</button>
        <input />
      </div>
    `,
    setup() {
      const target = ref()
      const initialFocus = ref()
      const containers = ref<Set<HTMLElement>>(new Set())
      watchEffect(
        (onInvalidate) => {
          let el: HTMLElement
          if (target.value) {
            el = unrefElement(target)
            containers.value.add(el)
          }

          onInvalidate(() => {
            containers.value.delete(el)
          })
        },
        { flush: "post" }
      )
      useFocusTrap(
        containers,
        ref(true),
        ref({
          initialFocus: initialFocus.value,
        })
      )

      return {
        target,
        initialFocus,
      }
    },
  })

  /** We delay so that focus lock has time to activate */
  await waitMs(500)

  const button = screen.getByTestId("initial-focus-element")
  expect(button).toHaveFocus()
})

it.skip("should deactivate focus-lock when clickOutsideDeactivates=`true` and click event happens outside focus lock", async () => {
  renderComponent({
    template: `
      <div :ref="lock" data-testid="focus-lock-container">
        <input />
        <button :ref="initialFocus" data-testid="initial-focus-element">Focus me first</button>
        <input />
      </div>
      <button data-testid="click-outside-focus-trap">Outside</button>
    `,
    setup() {
      // TODO: Add clickOutside deactivates option
      return {
        initialFocus,
      }
    },
  })

  /** We delay so that focus lock has time to activate */
  await waitMs(500)

  const initialFocus = screen.getByTestId("initial-focus-element")
  const outsideButton = screen.getByTestId("click-outside-focus-trap")

  expect(initialFocus).toHaveFocus()
  expect(outsideButton).not.toHaveFocus()

  await userEvent.click(outsideButton)

  expect(initialFocus).not.toHaveFocus()
  expect(outsideButton).toHaveFocus()
})

it("should render properly", () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})
