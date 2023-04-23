import { render } from "@chakra-ui/vue-test-utils"
import { CMotion } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CMotion)
  expect(asFragment()).toMatchSnapshot()
})
