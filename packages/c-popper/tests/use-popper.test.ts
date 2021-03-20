import { render } from '@chakra-ui/vue-test-utils/src'
import { usePopper } from '../src'
import { useToggle } from '@vueuse/core'
import { CButton } from '@chakra-ui/c-button'
import { nextTick } from 'vue'

const renderComponent = (props?: any) => {
  const base = {
    components: {
      CButton,
    },
    template: `
      <div>
        <c-button :ref="reference" @click="toggleIsOpen">Testing</c-button>
        <div v-if="isOpen" :ref="popper" style="padding: 20px; background: red">
          <div
            data-popper-arrow=""
            style="--popper-arrow-size: 10px; background: yellow"
          />
          Popper
        </div>
      </div>
    `,
    ...props,
  }
  return render(base)
}

it('should render properly', async () => {
  const { asFragment } = renderComponent({
    setup() {
      const [isOpen, toggleIsOpen] = useToggle(true)

      const { reference, popper } = usePopper({
        gutter: 16,
        placement: 'right-end',
      })

      return {
        isOpen,
        toggleIsOpen,
        reference,
        popper,
      }
    },
  })

  await nextTick()
  expect(asFragment()).toMatchSnapshot()
})
