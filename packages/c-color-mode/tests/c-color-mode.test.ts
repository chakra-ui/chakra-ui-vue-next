import { defineComponent, nextTick } from "vue"
import { render, userEvent, waitMs } from "@chakra-ui/vue-test-utils"
import { useColorMode } from "../src"

const renderComponent = (props?: any) => {
  const base = defineComponent({
    template: `
      <div>
        <div data-testid="colormode"> {{ colorMode }} </div>
        <button data-testid="toggle" @click="toggleColorMode">Toggle color mode</button>
      </div>
    `,
    setup() {
      const { colorMode, toggleColorMode } = useColorMode()
      return {
        colorMode,
        toggleColorMode,
      }
    },
    ...props,
  })
  return render(base)
}

it.skip("should toggle colormode", async () => {
  const { getByTestId, asFragment } = renderComponent()
  expect(getByTestId("colormode").textContent).toBe("light")

  await userEvent.click(getByTestId("toggle"))
  await waitMs(500)
  await nextTick()
  expect(getByTestId("colormode").textContent).toBe("dark")

  await userEvent.click(getByTestId("toggle"))
  await waitMs(500)
  await nextTick()
  expect(getByTestId("colormode").textContent).toBe("light")

  expect(asFragment()).toMatchSnapshot()
})
