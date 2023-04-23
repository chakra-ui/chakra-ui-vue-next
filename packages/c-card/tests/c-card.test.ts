import { render } from "../../test-utils/src"
import { CCard } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CCard)
  expect(asFragment()).toMatchSnapshot()
})
