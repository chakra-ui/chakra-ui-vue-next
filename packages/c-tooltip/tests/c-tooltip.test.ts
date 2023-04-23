import { render } from "@chakra-ui/vue-test-utils"
import { CTooltip } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CTooltip)
  expect(asFragment()).toMatchSnapshot()
})
