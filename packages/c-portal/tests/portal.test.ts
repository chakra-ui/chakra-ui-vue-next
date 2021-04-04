import { nextTick, ref } from 'vue'
import { render, screen, waitMs } from '../../test-utils/src'
import { CPortal } from '../src'

const renderComponent = (props?: any) => {
  const base = {
    components: {
      CPortal,
    },
    template: '<c-portal><div>Portal content</div></c-portal>',
    ...props,
  }
  return render(base)
}

let PORTAL_RENDER_COUNT = 0
let PORTAL_TARGET_ELEMENT: () => HTMLElement | null

/**
 * Clean up to remove previous portals
 */
afterEach(() => {
  document.getElementById(`chakra__portal__${PORTAL_RENDER_COUNT}`)?.remove()

  PORTAL_RENDER_COUNT++

  PORTAL_TARGET_ELEMENT = () =>
    document.getElementById(`chakra__portal__${PORTAL_RENDER_COUNT}`)
})

it('should not render anything if no children exist', async () => {
  const { asFragment } = renderComponent()
  await waitMs(300)
  expect(asFragment()).toMatchSnapshot()
})

it('should create default target for default children', async () => {
  renderComponent()
  await waitMs(300)
  expect(document.body).toContainElement(PORTAL_TARGET_ELEMENT())
  expect(document.body.innerHTML).toMatchSnapshot()
})

it('should append default target to `document.body`', () => {
  renderComponent()
  expect(document.body).toContainElement(PORTAL_TARGET_ELEMENT())
  expect(PORTAL_TARGET_ELEMENT()).toContainElement(
    screen.getByText('Portal content')
  )
})

it('should render children to provided portal target', async () => {
  const target = document.createElement('div')
  target.style.display = 'inline-block'
  target.style.position = 'absolute'
  target.style.bottom = '50px'
  target.style.right = '50px'

  target.id = 'new-target'
  document.body.appendChild(target)

  await nextTick()

  renderComponent({
    template: `<c-portal to="#${target.id}"><div>Portal content</div></c-portal>`,
  })

  await nextTick()

  expect(document.body).toContainElement(target)
  expect(target).toContainElement(screen.getByText('Portal content'))
  expect(document.body.innerHTML).toMatchSnapshot()
})
