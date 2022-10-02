import { CPinInput, CPinInputField } from "./../src"
import { render } from "../../test-utils/src"

const renderCPinInput = (props?) => {
  const template = `
    <CPinInput>
      <CPinInputField />
      <CPinInputField/>
      <CPinInputField/>
    </CPinInput>`
  const base = {
    components: {
      CPinInput,
      CPinInputField,
    },
    template,
    ...props,
  }
  return render(base)
}

describe("CPinInput", () => {
  it("should render properly", () => {
    const { asFragment } = renderCPinInput()
    expect(asFragment()).toMatchSnapshot()
  })
})
