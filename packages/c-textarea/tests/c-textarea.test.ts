import { render } from "../../test-utils/src"
import { CTextarea } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CTextarea)
  expect(asFragment()).toMatchSnapshot()
})
