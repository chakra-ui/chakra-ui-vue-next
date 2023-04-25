import { render } from "@chakra-ui/vue-test-utils"
import { CReset } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CReset)
  expect(asFragment()).toMatchSnapshot()
})
