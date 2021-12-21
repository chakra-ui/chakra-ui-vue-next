import { render } from "../../test-utils/src"
import { CMotion } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CMotion)
  expect(asFragment()).toMatchSnapshot()
})
