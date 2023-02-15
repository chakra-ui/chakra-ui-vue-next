import {
  CAccordion,
  CAccordionItem,
  CAccordionButton,
  CAccordionIcon,
  CAccordionPanel,
} from "../src"
import {
  Component,
  defineComponent,
  getCurrentInstance,
  h,
  nextTick,
} from "vue"
import {
  render,
  screen,
  focus,
  userEvent,
  testA11y,
} from "@chakra-ui/vue-test-utils"

const CCollapseStub = defineComponent(
  ({ isOpen }: { isOpen: boolean }, { slots, attrs }) => {
    const ctx = getCurrentInstance()
    return () => <div hidden={!isOpen}>{slots}</div>
  }
)
CCollapseStub.name = "CCollapseStub"

jest.mock("@chakra-ui/c-motion", () => ({
  ...jest.requireActual("@chakra-ui/c-motion"),
  CCollapse: CCollapseStub,
}))

const renderComponent = (options: Component = {}) => {
  return render({
    components: {
      CAccordion,
      CAccordionItem,
      CAccordionButton,
      CAccordionIcon,
      CAccordionPanel,
    },
    template: `
      <c-accordion>
        <c-accordion-item>
          <c-accordion-button>
            <c-v-stack align="flex-start" w="full">
              <chakra.p font-weight="bold"> Chakra UI </chakra.p>
              <chakra.p font-size="0.8em">Yatches, Boats and Dinghies</chakra.p>
            </c-v-stack>
            <c-accordion-icon element="c-accordion-item" />
          </c-accordion-button>
          <c-accordion-panel> Sample accordion content </c-accordion-panel>
        </c-accordion-item>
        <c-accordion-item>
          <c-accordion-button>
            <c-v-stack align="flex-start" w="full">
              <chakra.p font-weight="bold"> Mirror World </chakra.p>
              <chakra.p font-size="0.8em">Yatches, Boats and Dinghies</chakra.p>
            </c-v-stack>
            <c-accordion-icon />
          </c-accordion-button>
          <c-accordion-panel> Sample accordion content </c-accordion-panel>
        </c-accordion-item>
        <c-accordion-item>
          <c-accordion-button>
            <c-v-stack align="flex-start" w="full">
              <chakra.p font-weight="bold"> Xtellar </chakra.p>
              <chakra.p font-size="0.8em">Yatches, Boats and Dinghies</chakra.p>
            </c-v-stack>
            <c-accordion-icon />
          </c-accordion-button>
          <c-accordion-panel> Sample accordion content </c-accordion-panel>
        </c-accordion-item>
      </c-accordion>
    `,
    ...options,
  })
}

describe("<CAccordion /> component", () => {
  it.only("should render properly", () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it("should toggle the accordion on click", async () => {
    const { asFragment } = renderComponent({
      template: `
        <c-accordion>
          <c-accordion-item>
            <h2>
              <c-accordion-button>Trigger</c-accordion-button>
            </h2>
            <c-accordion-panel>Panel</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>
      `,
    })

    expect(asFragment()).toMatchSnapshot()
    const trigger = screen.getByText("Trigger")
    await userEvent.click(trigger)
    await nextTick()
    expect(trigger).toHaveAttribute("aria-expanded", "true")

    // you can't toggle an accordion without passing `allowToggle`
    await userEvent.click(trigger)
    await nextTick()
    expect(trigger).toHaveAttribute("aria-expanded", "true")
  })

  it("arrow up & down moves focus to next/previous accordion", async () => {
    renderComponent({
      template: `
        <c-accordion>
          <c-accordion-item>
            <h2>
              <c-accordion-button>Section 1 title</c-accordion-button>
            </h2>
            <c-accordion-panel>Panel 1</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item>
            <c-accordion-button>Section 2 title</c-accordion-button>
            <c-accordion-panel>Panel 2</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>
      `,
    })

    const first = screen.getByText("Section 1 title")
    const second = screen.getByText("Section 2 title")

    await first.focus()
    await nextTick()

    await userEvent.keyboard("{arrowdown}")
    expect(second).toHaveFocus()

    await userEvent.keyboard("{arrowup}")
    expect(first).toHaveFocus()
  })

  it("home & end keys moves focus to first/last accordion", async () => {
    renderComponent({
      template: `
        <c-accordion>
          <c-accordion-item>
            <h2>
              <c-accordion-button>First section</c-accordion-button>
            </h2>
            <c-accordion-panel>Panel 1</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item>
            <c-accordion-button>Section 2 title</c-accordion-button>
            <c-accordion-panel>Panel 2</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item>
            <c-accordion-button>Last section</c-accordion-button>
            <c-accordion-panel>Panel 3</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>
      `,
    })

    const first = screen.getByText("First section")
    const last = screen.getByText("Last section")

    await first.focus()
    await nextTick()

    await userEvent.keyboard("{home}")
    expect(first).toHaveFocus()

    await userEvent.keyboard("{end}")
    expect(last).toHaveFocus()
  })

  it("only one accordion can be visible + is not toggleable", async () => {
    renderComponent({
      template: `
        <c-accordion>
          <c-accordion-item>
            <h2>
              <c-accordion-button>First section</c-accordion-button>
            </h2>
            <c-accordion-panel>Panel 1</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item>
            <c-accordion-button>Section 2 title</c-accordion-button>
            <c-accordion-panel>Panel 2</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item>
            <c-accordion-button>Last section</c-accordion-button>
            <c-accordion-panel>Panel 3</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>
      `,
    })

    const first = screen.getByText("First section")

    await userEvent.click(first)
    await nextTick()
    expect(first).toHaveAttribute("aria-expanded", "true")

    await userEvent.click(first)
    await nextTick()
    expect(first).toHaveAttribute("aria-expanded", "true")
  })

  it("only one accordion can be visible + is togglable", async () => {
    renderComponent({
      template: `
        <c-accordion allow-toggle>
          <c-accordion-item>
            <h2>
              <c-accordion-button>First section</c-accordion-button>
            </h2>
            <c-accordion-panel>Panel 1</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item>
            <c-accordion-button>Section 2 title</c-accordion-button>
            <c-accordion-panel>Panel 2</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item>
            <c-accordion-button>Last section</c-accordion-button>
            <c-accordion-panel>Panel 3</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>
      `,
    })

    const first = screen.getByText("First section")

    await userEvent.click(first)
    await nextTick()
    expect(first).toHaveAttribute("aria-expanded", "true")

    await userEvent.click(first)
    await nextTick()
    expect(first).toHaveAttribute("aria-expanded", "false")
  })
  it("multiple accordions can be opened + is toggleable", async () => {
    renderComponent({
      template: `
        <c-accordion allow-multiple>
          <c-accordion-item>
            <h2>
              <c-accordion-button>First section</c-accordion-button>
            </h2>
            <c-accordion-panel>Panel 1</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item>
            <c-accordion-button>Second section</c-accordion-button>
            <c-accordion-panel>Panel 2</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>
      `,
    })

    const first = screen.getByText("First section")
    const second = screen.getByText("Second section")

    await userEvent.click(first)
    await nextTick()
    expect(first).toHaveAttribute("aria-expanded", "true")

    await userEvent.click(second)
    await nextTick()
    expect(first).toHaveAttribute("aria-expanded", "true")
  })

  it("has the proper aria attributes", async () => {
    renderComponent({
      template: `
        <c-accordion>
          <c-accordion-item>
            <h2>
              <c-accordion-button>Section 1 title</c-accordion-button>
            </h2>
            <c-accordion-panel>Panel 1</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>
      `,
    })

    const button = screen.getByText("Section 1 title")
    const panel = screen.getByText("Panel 1")

    expect(button).toHaveAttribute("aria-controls")
    expect(button).toHaveAttribute("aria-expanded")
    expect(panel).toHaveAttribute("aria-labelledby")
  })
  it("tab moves focus to the next focusable element", async () => {
    renderComponent({
      template: `
        <c-accordion allow-toggle>
          <c-accordion-item>
            <h2>
              <c-accordion-button>First section</c-accordion-button>
            </h2>
            <c-accordion-panel>Panel 1</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item>
            <c-accordion-button>Second section</c-accordion-button>
            <c-accordion-panel>Panel 2</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item>
            <c-accordion-button>Last section</c-accordion-button>
            <c-accordion-panel>Panel 3</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>
      `,
    })

    const first = screen.getByText("First section")
    const second = screen.getByText("Second section")
    const last = screen.getByText("Last section")

    await userEvent.tab()
    await nextTick()
    expect(first).toHaveFocus()

    await userEvent.tab()
    await nextTick()
    expect(second).toHaveFocus()

    await userEvent.tab()
    await nextTick()
    expect(last).toHaveFocus()
  })

  it("aria-controls for button is same as id for panel", async () => {
    renderComponent({
      template: `
        <c-accordion>
          <c-accordion-item>
            <h2>
              <c-accordion-button>Section 1 title</c-accordion-button>
            </h2>
            <c-accordion-panel>Panel 1</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>
      `,
    })

    const button = screen.getByText("Section 1 title")
    const panel = screen.getByText("Panel 1")
    expect(button.getAttribute("aria-controls")).toEqual(
      panel.getAttribute("id")
    )
  })
  it("panel has role=region and aria-labelledby", async () => {
    renderComponent({
      template: `
        <c-accordion>
          <c-accordion-item>
            <h2>
              <c-accordion-button>Section 1 title</c-accordion-button>
            </h2>
            <c-accordion-panel>Panel 1</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>
      `,
    })

    const panel = screen.getByText("Panel 1")

    expect(panel).toHaveAttribute("aria-labelledby")
    expect(panel).toHaveAttribute("role", "region")
  })
  it.todo("aria-expanded is true/false when accordion is open/closed")
})
