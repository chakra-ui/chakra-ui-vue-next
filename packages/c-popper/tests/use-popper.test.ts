import { render, waitMs } from '@chakra-ui/vue-test-utils/src'
import { usePopper } from '../src'
import { useToggle } from '@vueuse/core'
import { CButton } from '@chakra-ui/c-button'
import { onMounted } from 'vue'

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
  let _referenceEl: any
  let _popperEl: any
  const { asFragment } = renderComponent({
    setup() {
      const [isOpen, toggleIsOpen] = useToggle(true)

      const { reference, referenceEl, popperEl, popper } = usePopper({
        gutter: 16,
        placement: 'right-end',
      })

      onMounted(() => {
        _referenceEl = referenceEl.value
        _popperEl = popperEl.value
      })

      return {
        isOpen,
        toggleIsOpen,
        reference,
        popper,
      }
    },
  })

  await waitMs(300)
  expect(asFragment()).toMatchSnapshot()
  expect(_referenceEl instanceof Element).toBe(true)
  expect(_popperEl instanceof Element).toBe(true)
})
