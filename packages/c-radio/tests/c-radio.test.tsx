import { defineComponent, h } from "vue"
import { render } from "@chakra-ui/vue-test-utils/src"
import { CRadio, CRadioGroup } from "../src"

it("should render properly", () => {
  const { asFragment } = render({
    components: { CRadioGroup, CRadio },
    template: `
      <CRadioGroup>
        <CRadio value="1">One</CRadio>
        <CRadio value="2">Two</CRadio>
        <CRadio value="3">Three</CRadio>
      </CRadioGroup>
    `,
  })
  expect(asFragment()).toMatchSnapshot()
})
