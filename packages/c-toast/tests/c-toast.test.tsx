import { h, Fragment, defineComponent } from "vue"
import { render } from "../../test-utils/src"
import { CToast } from "../src"
it("should render properly", () => {
  const { asFragment } = render(
    defineComponent(() => {
      return () => <h1>Hello World</h1>
    })
  )
  expect(asFragment()).toMatchSnapshot()
})
