import { defineComponent } from 'vue'
import { render, testA11y } from '../../test-utils/src'
import { CButtonGroup, CButton } from '../src'

const renderComponent = (props?: any) => {
  const base = defineComponent({
    components: {
      CButtonGroup,
      CButton,
    },
    template: `
      <c-button-group variant="outline">
        <c-button color-scheme="blue">Save</c-button>
        <c-button>Cancel</c-button>
      </c-button-group>
    `,
    ...props,
  })
  return render(base)
}

it('should have no a11y violations', async () => {
  await testA11y(renderComponent())
})

it('should render properly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})
