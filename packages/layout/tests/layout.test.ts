import {
  CAspectRatio,
  CBox,
  CSquare,
  CCenter,
  CContainer,
  CCircle,
  CDivider,
  CGrid,
  CHeading,
  CLink,
  CLinkBox,
  CLinkOverlay,
  CBadge,
  CStack,
  CSimpleGrid,
  CVStack,
  CSpacer,
  CHStack,
  CGridItem,
  CKbd,
  CList,
  CListItem,
  COrderedList,
  CUnorderedList,
  CListIcon,
  CText,
} from '../src'
import { CFlex } from '@chakra-ui/vue-next'
import { render, testA11y } from '../../test-utils/src'

describe('<CLink />', () => {
  const renderComponent = () =>
    render({
      components: { CLink },
      template: `<CLink>CLink</CLink>
      <CLink is-external>CLink external</CLink>
      `,
    })

  it('should render properly', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('a11y test', async () => {
    await testA11y(renderComponent())
  })
})
describe('<CLinkBox /> <CLinkOverlay />', () => {
  const renderComponent = () =>
    render({
      components: { CHeading, CLink, CLinkBox, CLinkOverlay },
      template: `
      <c-link-box as="article">
        <c-heading as="h2" font-size="20">
          <c-link-overlay is-external href="https://vue.chakra-ui.com">Some blog post</c-link-overlay>
        </c-heading>
        <p>
          As a side note, using quotation marks around an attribute value is
          required only if this value is not a valid identifier.
        </p>
        <c-link is-external href="https://google.com">Some inner link</c-link>
      </c-link-box>
      `,
    })

  it('should render properly', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('<CBadge />', () => {
  const renderComponent = () =>
    render({
      components: { CBadge },
      template: `<CBadge>this is a badge</CBadge>`,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('a11y test', async () => {
    await testA11y(renderComponent())
  })
})

describe('<CStack />', () => {
  const renderComponent = () =>
    render({
      components: { CHStack, CVStack, CStack },
      template: `
      <CStack><div>1</div><div>2</div></CStack>
      <CHStack><div>1</div><div>2</div></CHStack>
      <CVStack><div>1</div><div>2</div></CVStack>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('a11y test', async () => {
    await testA11y(renderComponent())
  })
})

describe('<CAspectRatio />', () => {
  const renderComponent = () =>
    render({
      components: { CAspectRatio },
      template: `
      <c-aspect-ratio maxW="360px" :ratio="16 / 9" mb="4">
        <img src="https://bit.ly/naruto-sage" alt="img" />
      </c-aspect-ratio>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('a11y test', async () => {
    await testA11y(renderComponent())
  })
})

describe('<CBox />', () => {
  const renderComponent = () =>
    render({
      components: { CBox },
      template: `
      <c-box bg="tomato" w="100%" p="4" color="white" max-w="300px">
        This is a div
      </c-box>
      <c-box as="section" bg="tomato" w="100%" p="4" color="white" max-w="300px">
        This is a box with as="section"
      </c-box>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('<CSquare /> & <CCircle />', () => {
  const renderComponent = () =>
    render({
      components: { CSquare, CCircle },
      template: `
      <c-square size="40px" bg="purple.700" color="white">
        S
      </c-square>
      <c-circle size="40px" bg="red.500" color="white">
        C
      </c-circle>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('<CCenter />', () => {
  const renderComponent = () =>
    render({
      components: { CCenter },
      template: `
      <c-center w="40px" h="40px" bg="purple.700" color="white">
        C
      </c-center>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('<CContainer />', () => {
  const renderComponent = () =>
    render({
      components: { CContainer },
      template: `
      <c-container max-w="1000px">
        container
      </c-container>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('<CDivider />', () => {
  const renderComponent = () =>
    render({
      components: { CDivider, CCenter },
      template: `
      <c-divider border-color="green.500" border-top-width="10px"></c-divider>
      <c-center height="50px">
        <c-divider
          border-left-width="5px"
          border-color="red.500"
          orientation="vertical"
        ></c-divider>
      </c-center>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('a11y test', async () => {
    await testA11y(renderComponent())
  })
})

describe('<CGrid /> & <CGridItem />', () => {
  const renderComponent = () =>
    render({
      components: { CBox, CGrid, CGridItem },
      template: `
      <c-grid template-columns="repeat(5, 1fr)" gap="6">
        <c-box w="100%" h="10" bg="blue.500" />
        <c-box w="100%" h="10" bg="blue.500" />
        <c-box w="100%" h="10" bg="blue.500" />
        <c-box w="100%" h="10" bg="blue.500" />
        <c-box w="100%" h="10" bg="blue.500" />
      </c-grid>
      <c-grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap="4"
      >
        <c-grid-item rowSpan="2" colSpan="1" bg="tomato" />
        <c-grid-item colSpan="2" bg="papayawhip" />
        <c-grid-item colSpan="2" bg="papayawhip" />
        <c-grid-item colSpan="4" bg="tomato" />
      </c-grid>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('<CHeading />', () => {
  const renderComponent = () =>
    render({
      components: { CStack, CHeading },
      template: `
      <c-stack spacing="4">
        <c-heading as="h1" size="4xl" is-truncated>(4xl) In love with Vue & Vite & Nuxt</c-heading>
        <c-heading as="h2" size="3xl" is-truncated> (3xl) In love with Vue & Vite & Nuxt</c-heading>
        <c-heading as="h2" size="2xl">(2xl) In love with Vue & Vite & Nuxt</c-heading>
        <c-heading as="h2" size="xl"> (xl) In love with Vue & Vite & Nuxt </c-heading>
        <c-heading as="h3" size="lg"> (lg) In love with Vue & Vite & Nuxt </c-heading>
        <c-heading as="h4" size="md"> (md) In love with Vue & Vite & Nuxt </c-heading>
        <c-heading as="h5" size="sm"> (sm) In love with Vue & Vite & Nuxt </c-heading>
        <c-heading as="h6" size="xs"> (xs) In love with Vue & Vite & Nuxt </c-heading>
      </c-stack>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('<CKbd />', () => {
  const renderComponent = () =>
    render({
      components: { CKbd },
      template: `
      <span> <c-kbd>shift</c-kbd> + <c-kbd>H</c-kbd> </span>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('<CList /> <CListItem /> <CUnorderedList /> <COrderedList /> <CListIcon /> ', () => {
  const renderComponent = () =>
    render({
      components: { CList, CListItem, COrderedList, CUnorderedList, CListIcon },
      template: `
      <c-ordered-list>
        <c-list-item>Lorem ipsum dolor sit amet</c-list-item>
        <c-list-item>Facilisis in pretium nisl aliquet</c-list-item>
      </c-ordered-list>
      <c-unordered-list>
        <c-list-item>Lorem ipsum dolor sit amet</c-list-item>
        <c-list-item>Consectetur adipiscing elit</c-list-item>
      </c-unordered-list>
      <c-list>
        <c-list-item>
          <c-list-icon name="check-circle" color="green.500" />
          Lorem ipsum dolor sit amet.
        </c-list-item>
        <c-list-item>
          <c-list-icon name="exclamation" color="green.500" />
          Facilisis in pretium nisl aliquet
        </c-list-item>
      </c-list>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('<CSimpleGrid />', () => {
  const renderComponent = () =>
    render({
      components: { CSimpleGrid, CBox },
      template: `
      <c-simple-grid
        columns="2"
        :spacingX="['5px', '40px']"
        :spacingY="['5px', '20px']"
        minChildWidth="100px"
      >
        <c-box bg="tomato" height="80px">simple 1</c-box>
        <c-box bg="tomato" height="80px">simple 2</c-box>
        <c-box bg="tomato" height="80px">simple 3</c-box>
        <c-box bg="tomato" height="80px">simple 4</c-box>
        <c-box bg="tomato" height="80px">simple 5</c-box>
      </c-simple-grid>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('<CSpacer />', () => {
  const renderComponent = () =>
    render({
      components: { CFlex, CSpacer, CBox },
      template: `
      <c-flex>
        <c-box p="4" bg="red.400"> Box 1 </c-box>
        <c-spacer />
        <c-box p="4" bg="green.400"> Box 2 </c-box>
      </c-flex>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('<CText />', () => {
  const renderComponent = () =>
    render({
      components: { CText },
      template: `
      <c-text>normal:</c-text>
      <c-text fontSize="6xl">(6xl) In love with Vue & Vite & Nuxt</c-text>
      <c-text>truncated:</c-text>
      <c-text maxW="sm" isTruncated>
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
      </c-text>
      <c-text>line clamp:</c-text>
      <c-text :noOfLines="[1, 2, 3]" maxW="sm">
        "The quick brown fox jumps over the lazy dog" is an English-language
        pangram—a sentence that contains all of the letters of the English alphabet.
        Owing to its existence, Chakra was created.
      </c-text>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})
