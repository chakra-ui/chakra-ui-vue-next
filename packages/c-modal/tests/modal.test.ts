import { render } from "@chakra-ui/vue-test-utils"
import { CModal } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CModal)
  expect(asFragment()).toMatchSnapshot()
})
