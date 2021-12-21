import { render } from "../../test-utils/src"
import { CReset } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CReset)
  expect(asFragment()).toMatchSnapshot()
})
