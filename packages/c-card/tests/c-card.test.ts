import { render } from "../../test-utils/src"
import { CCard, CCardHeader, CCardBody } from "../src"

it("should render properly", () => {
  const { asFragment } = render({
    components: { CCard, CCardHeader, CCardBody },
    template: `
      <c-card>
        <c-card-header>
          Customer dashboard
        </c-card-header>
        <c-card-body>
            View a summary of all your customers over the last month.
        </c-card-body>
      </c-card>
    `,
  })
  expect(asFragment()).toMatchSnapshot()
})
