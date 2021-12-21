import { render, waitMs, screen } from "../../test-utils/src"
import { hideOthers } from "../src"
import { useRef } from "@chakra-ui/vue-utils"
import { nextTick, ref, onMounted } from "vue"

const renderComponent = (props?: any) => {
  const base = {
    template: `
        <main>
          <div v-if="open" :ref="targetRef" data-testid="aria-container">
            <input data-testid="input" />
            <button>Another button</button>
          </div>
          <section data-testid="outside-aria-container">Outside aria hidden</section>
        </main>
    `,
    setup() {
      const [targetRef, targetEl] = useRef()
      const open = ref(true)

      onMounted(async () => {
        await nextTick()
        if (targetEl.value) {
          hideOthers(targetEl.value)
        }
      })

      return {
        targetRef,
        open,
      }
    },
    ...props,
  }
  return render(base)
}

function assert(active: boolean = true) {
  const ariaContainer = screen.getByTestId("aria-container")
  const outsideAriaContainer = screen.getByTestId("outside-aria-container")

  if (active) {
    expect(ariaContainer).not.toHaveAttribute("aria-hidden", "true")
    expect(outsideAriaContainer).toHaveAttribute("aria-hidden", "true")
    expect(outsideAriaContainer).toHaveAttribute("chakra-aria-hidden", "true")
  } else {
    expect(ariaContainer).not.toHaveAttribute("aria-hidden", "true")
    expect(outsideAriaContainer).not.toHaveAttribute("aria-hidden", "true")
    expect(outsideAriaContainer).not.toHaveAttribute(
      "chakra-aria-hidden",
      "true"
    )
  }
}

it("should render properly", () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it("should match aria-hidden snapshot", async () => {
  renderComponent()
  await waitMs(300)
  expect(document.body.innerHTML).toMatchSnapshot()
})

it("should apply aria-hidden attribute to other elements except target", async () => {
  renderComponent()
  await waitMs(300)

  assert(true)
})

it.todo(
  "should remove aria-hidden attributes form other elements except target when job is undone"
)
