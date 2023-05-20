import { TestRenderProps, render, testA11y } from "@chakra-ui/vue-test-utils"
import {
  CStat,
  CStatGroup,
  CStatLabel,
  CStatNumber,
  CStatHelpText,
  CStatArrow,
} from "../src"

const renderComponent = (props: TestRenderProps = {}) => {
  const base = {
    components: {
      CStat,
      CStatGroup,
      CStatLabel,
      CStatNumber,
      CStatHelpText,
      CStatArrow,
    },
    template: `
    <c-stat-group data-testid="group">
      <c-stat>
        <c-stat-label>Sent</c-stat-label>
        <c-stat-number>345,670</c-stat-number>
        <c-stat-help-text>
          <c-stat-arrow type="increase" />
          23.36%
        </c-stat-help-text>
      </c-stat>

      <c-stat>
        <c-stat-label>Clicked</c-stat-label>
        <c-stat-number>45</c-stat-number>
        <c-stat-help-text>
          <c-stat-arrow type="decrease" />
          9.05%
        </c-stat-help-text>
      </c-stat>
    </c-stat-group>
    `,
    ...props,
  }
  return render(base)
}

describe("CStat", () => {
  it("should render properly", () => {
    const { asFragment, getByTestId } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
    expect(getByTestId("group")).toBeTruthy()
  })

  it("should pass a11y tests", async () => {
    await testA11y(renderComponent())
  })
})
