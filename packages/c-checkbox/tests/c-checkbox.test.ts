// @ts-ignore
import { render } from "../../test-utils/src"
// @ts-ignore
import { CCheckbox } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CCheckbox)
  expect(asFragment()).toMatchSnapshot()
})
