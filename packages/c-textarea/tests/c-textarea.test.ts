import { render } from "@chakra-ui/vue-test-utils"
import { CTextarea } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CTextarea)
  expect(asFragment()).toMatchSnapshot()
})
