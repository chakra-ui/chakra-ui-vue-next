import { h, Fragment, defineComponent } from "vue"
import { render } from "@chakra-ui/vue-test-utils"
import { CToast } from "../src"
it("should render properly", () => {
  const { asFragment } = render(
    defineComponent(() => {
      return () => <h1>Hello World</h1>
    })
  )
  expect(asFragment()).toMatchSnapshot()
})
