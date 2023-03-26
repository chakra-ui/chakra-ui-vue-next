import { render } from "../../test-utils/src"
import { CTabs } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CTabs)
  expect(asFragment()).toMatchSnapshot()
})
