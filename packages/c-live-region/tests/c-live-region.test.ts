import { render } from "@chakra-ui/vue-test-utils"
import { CLiveRegion } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CLiveRegion)
  expect(asFragment()).toMatchSnapshot()
})
