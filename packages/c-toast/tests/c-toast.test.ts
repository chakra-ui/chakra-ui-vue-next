import { render } from "../../test-utils/src"
import { CToast } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CToast)
  expect(asFragment()).toMatchSnapshot()
})
