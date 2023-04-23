import { render } from "@chakra-ui/vue-test-utils"
import { CTabs } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CTabs)
  expect(asFragment()).toMatchSnapshot()
})
