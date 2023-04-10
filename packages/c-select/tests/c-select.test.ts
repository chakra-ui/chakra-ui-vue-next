import { render } from "../../test-utils/src"
import { CSelect } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CSelect)
  expect(asFragment()).toMatchSnapshot()
})
