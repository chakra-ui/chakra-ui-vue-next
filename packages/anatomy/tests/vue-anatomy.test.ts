import { render } from "../../test-utils/src"
import { Anatomy } from "../src"

it("should render properly", () => {
  const { asFragment } = render(Anatomy)
  expect(asFragment()).toMatchSnapshot()
})
