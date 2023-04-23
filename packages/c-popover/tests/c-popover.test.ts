import { render } from "@chakra-ui/vue-test-utils"
import { CPopover } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CPopover)
  expect(asFragment()).toMatchSnapshot()
})
