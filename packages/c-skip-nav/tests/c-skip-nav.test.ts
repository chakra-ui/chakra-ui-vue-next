import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "@chakra-ui/vue-test-utils/src"
import { wait } from "@testing-library/user-event/dist/utils"
import { Component } from "vue"
import { CSkipNavContent, CSkipNavLink } from "../src"

const MOCK_INPUT_PLACEHOLDER_TEXT = "Search"

const renderBaseTemplate = (options: Component = {}) => {
  return render({
    components: {
      CSkipNavLink,
      CSkipNavContent,
    },
    template: `
      <div>
        <c-skip-nav-link>Skip to Content</c-skip-nav-link>
        <c-skip-nav-content>
          <main>
            <form>
              <input type="text" placeholder=${MOCK_INPUT_PLACEHOLDER_TEXT} />
            </form>
          </main>
        </c-skip-nav-content>
      </div>
    `,
    ...options,
  })
}

const getSkipLink = () => screen.getByText("Skip to Content")

const getContentWrapper = () => screen.getByTestId("chakra-skip-nav")

const triggerSkipLink = async () => {
  const link = getSkipLink()
  await fireEvent.keyDown(link, {
    key: "Enter",
    code: "Enter",
  })
}

describe("CSkipNavLink", () => {
  it("should render properly", () => {
    const { asFragment } = render(CSkipNavLink)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe("CSkipNavContent", () => {
  it("should render properly", () => {
    const { asFragment } = render(CSkipNavContent)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe("CSkipNav Pair", () => {
  beforeEach(async () => {
    renderBaseTemplate()
    userEvent.tab()
  })
  it("should have the user tab to `CSkipNavLink` after initial render", () => {
    const link = getSkipLink()
    expect(link).toHaveAttribute("href", "#chakra-skip-nav")
  })

  it("should have the user navigate from `CSkipNavLink` to `CSkipNavContent` upon selection", async () => {
    await triggerSkipLink()
    const contentWrapper = getContentWrapper()

    wait().then(() => {
      expect(contentWrapper).toHaveFocus()
    })
  })

  it("should tab to input after wrapper focus", async () => {
    await triggerSkipLink()
    userEvent.tab()

    const input = screen.getByPlaceholderText(MOCK_INPUT_PLACEHOLDER_TEXT)

    expect(input).toHaveFocus()
  })
})
