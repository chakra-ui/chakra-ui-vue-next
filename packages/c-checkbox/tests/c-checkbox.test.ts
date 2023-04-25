// @ts-ignore
import { render } from "@chakra-ui/vue-test-utils"
// @ts-ignore
import { CCheckbox } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CCheckbox)
  expect(asFragment()).toMatchSnapshot()
})
