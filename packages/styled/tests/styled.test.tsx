import styled from "../src"
import { h, Fragment, defineComponent } from "vue"
import { render } from "../../test-utils/src"
import { createSerializer } from "@emotion/jest"
import { css } from '../src/styled'
import { EmotionThemeProvider } from '../src/theming'
import { keyframes } from '@chakra-ui/vue-system'

expect.addSnapshotSerializer(createSerializer())

describe.only("styled", () => {
  it("should be truthy", () => {
    expect(1).toBe(1)
  })

  it('no dynamic', () => {
    const H1 = styled.h1`
      float: left;
    `
    const { asFragment } = render(() => {
      return <H1>Hello</H1>
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('basic render', () => {
    const fontSize = 20
    const H1 = styled.h1`
      color: blue;
      font-size: ${fontSize + 'px'};
      @media (min-width: 420px) {
        color: blue;
      }
    `

    const { asFragment } = render(() => {
      return <H1>Hello</H1>
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('basic render with object as style', () => {
    const fontSize = 20
    const H1 = styled.h1({ fontSize })

    const { asFragment } = render(() => {
      return <H1>Hello world</H1>
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('object as style', () => {
    const H1 = styled.h1(
      props => ({
        fontSize: props.fontSize
      }),
      props => ({ flex: props.flex }),
      { display: 'flex' }
    )

    const { asFragment } = render(() => {
      return <H1>Hello world</H1>
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('object as class', () => {
    const myclass = { myclass: 'myclass' }
    const Comp = styled.div``

    const { asFragment } = render(() => {
      // @ts-expect-error
      return <Comp class={myclass}>Hello world with class as string</Comp>
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('glamorous style api & composition', () => {
    const H1 = styled.h1(props => ({ fontSize: props.fontSize }))
    const H2 = styled(H1)(props => ({ flex: props.flex }), {
      display: 'flex'
    })

    const { asFragment } = render(() => {
      // @ts-expect-error
      return <H2 fontSize={20} flex={1}>
      hello world
    </H2>
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('inline function return value is a function', () => {
    const fontSize = () => 20
    const Blue = styled('h1')`
      font-size: ${() => fontSize}px;
    `

    const { asFragment } = render(() => {
      return (
        <Blue>hello world</Blue>
      )
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('call expression', () => {
    const fontSize = () => 20
    const Div = styled('div')`
      font-size: ${fontSize}px;
    `

    const { asFragment } = render(() => {
      return (
        <Div>hello world</Div>
      )
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('nested', () => {
    const fontSize = '20px'
    const H1 = styled.h1`
      font-size: ${fontSize};
    `

    const Thing = styled.div`
      display: flex;
      & div {
        color: green;

        & span {
          color: red;
        }
      }
    `

    const { asFragment } = render(() => {
      return (
        <Thing>
          hello <H1>This will be green</H1> world
        </Thing>
      )
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('random expressions undefined return', () => {
    const H1 = styled('h1')`
      ${props =>
        props.prop &&
        css`
          font-size: 1rem;
        `};
      color: green;
    `

    const { asFragment } = render(() => {
      return (
        // @ts-expect-error
        <H1 class={'legacy__class'}>hello world</H1>
      )
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('random object expression', () => {
    const margin = (t, r, b, l) => {
      return props => ({
        marginTop: t,
        marginRight: r,
        marginBottom: b,
        marginLeft: l
      })
    }
    const H1 = styled.h1`
      background-color: hotpink;
      ${props => props.prop && { fontSize: '1rem' }};
      ${margin(0, 'auto', 0, 'auto')};
      color: green;
    `

    const { asFragment } = render(() => {
      return (
        // @ts-expect-error
        <H1 class={'legacy__class'} prop>
          hello world
        </H1>
      )
    })
    expect(asFragment()).toMatchSnapshot()
  })

  test('composition', () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize + 'px'};
    `

    const H2 = styled(H1)`
      font-size: ${(fontSize * 2) / 3 + 'px'};
    `

    const { asFragment } = render(() => {
      return (
        // @ts-expect-error
        <H2 class={'legacy__class'} prop>
          hello world
        </H2>
      )
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('input placeholder', () => {
    const Input = styled.input`
      ::placeholder {
        background-color: green;
      }
    `

    const { asFragment } = render(() => {
      return (<Input>hello world</Input>)
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('input placeholder object', () => {
    const Input = styled('input')({
      '::placeholder': {
        backgroundColor: 'green'
      }
    })

    const { asFragment } = render(() => {
      return (<Input>hello world</Input>)
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('object composition', () => {
    const imageStyles = css({ width: 96, height: 96 })

    css([{ color: 'blue' }])

    const red = css([{ color: 'red' }])

    const blue = css([red, { color: 'blue' }])

    const prettyStyles = css([
      {
        borderRadius: '50%',
        transition: 'transform 400ms ease-in-out',
        ':hover': {
          transform: 'scale(1.2)'
        }
      },
      { border: '3px solid currentColor' }
    ])

    const Avatar = styled('img')`
      ${prettyStyles};
      ${imageStyles};
      ${blue};
    `

    const { asFragment } = render(() => {
      return (<Avatar />)
    })
    expect(asFragment()).toMatchSnapshot()
  })

  test('handles more than 10 dynamic properties', () => {
    const H1 = styled('h1')`
      text-decoration: ${'underline'};
      border-right: solid blue 54px;
      background: ${'white'};
      color: ${'black'};
      display: ${'block'};
      border-radius: ${'3px'};
      padding: ${'25px'};
      width: ${'500px'};
      z-index: ${100};
      font-size: ${'18px'};
      text-align: ${'center'};
      border-left: ${p => p.theme.blue};
    `

    const { asFragment } = render(() => {
      return (
        // @ts-expect-error
        <H1 class={'legacy__class'} theme={{ blue: 'blue' }}>
          hello world
        </H1>
      )
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('function in expression', () => {
    const fontSize = 20
    const H1 = styled('h1', { label: 'H1' })`
      font-size: ${fontSize + 'px'};
    `

    const H2 = styled(H1)`
      font-size: ${({ scale }) => fontSize * scale + 'px'};
    `

    const { asFragment } = render(() => {
      return (
        // @ts-expect-error
        <H2 scale={2} class={'legacy__class'}>
          hello world
        </H2>
      )
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('composition', () => {
    const fontSize = '20px'

    const cssA = css`
      color: blue;
    `

    const cssB = css`
      ${cssA};
      color: red;
    `

    const BlueH1 = styled('h1')`
      ${cssB};
      color: blue;
      font-size: ${fontSize};
    `

    const FinalH1 = styled(BlueH1)`
      font-size: 32px;
    `

    const { asFragment } = render(() => {
      return (
        // @ts-expect-error
        <FinalH1 scale={2} class={'legacy__class'}>
          hello world final
        </FinalH1>
      )
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('higher order component', () => {
    const fontSize = 20
    const Content = styled('div')`
      font-size: ${fontSize}px;
    `

    const squirtleBlueBackground = css`
      background-color: #7fc8d6;
    `

    const flexColumn = Component => {
      const NewComponent = styled(Component)`
        ${squirtleBlueBackground};
        background-color: #343a40;
        flex-direction: column;
      `

      return NewComponent
    }

    const ColumnContent = flexColumn(Content)

    const { asFragment } = render(() => {
      return (
       <ColumnContent />
      )
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('composition based on props', () => {
    const cssA = css`
      color: blue;
    `

    const cssB = css`
      color: green;
    `

    const H1 = styled('h1')`
      ${props => (props.a ? cssA : cssB)};
    `

    // @ts-expect-error
    const { asFragment: asFragment1 } = render(() => <H1 a>hello world</H1>)
    expect(asFragment1()).toMatchSnapshot()

    const { asFragment: asFragment2 } = render(() => <H1>hello world</H1>)
    expect(asFragment2()).toMatchSnapshot()
  })

  it('objects', () => {
    const H1 = styled('h1')({ padding: 10 }, props => ({
      display: props.display
    }))

    // @ts-expect-error
    const { asFragment } = render(() => <H1 display="flex">hello world</H1>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('objects with spread properties', () => {
    const defaultText = { fontSize: 20 }
    const Figure = styled.figure({ ...defaultText })
    const { asFragment } = render(() => <Figure>hello world</Figure>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('composing components', () => {
    const Button = styled.button`
      color: green;
    `
    const OtherButton = styled(Button)`
      display: none;
    `

    const AnotherButton = styled(OtherButton)`
      display: flex;
      justify-content: center;
    `

    const { asFragment } = render(() => <AnotherButton>hello world</AnotherButton>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('prop filtering', () => {
    const Link = styled.a`
      color: green;
    `
    const rest = { m: [3], pt: [4] }
    const { asFragment } = render(() => (
      <Link
        // @ts-expect-error
        a
        b
        wow
        prop
        filtering
        is
        cool
        aria-label="some label"
        data-wow="value"
        href="link"
        {...rest}
      >
        hello world
      </Link>
    ))
    expect(asFragment()).toMatchSnapshot()
  })

  it('throws if undefined is passed as the component', () => {
    expect(
      () =>
        // $FlowFixMe
        styled(undefined)`
          display: flex;
        `
    ).toThrowErrorMatchingSnapshot()
  })

  it('"withComponent" will replace tags but keep styling classes', () => {
    const Title = styled('h1')`
      color: green;
    `

    // @ts-expect-error
    const Subtitle = Title.withComponent('h2')

    const { asFragment } = render(() => (
      <article>
        <Title>My Title</Title>
        <Subtitle>My Subtitle</Subtitle>
      </article>
    ))

    expect(asFragment()).toMatchSnapshot()
  })

  it('withComponent with function interpolation', () => {
    const Title = styled('h1')`
      color: ${props => props.color || 'green'};
    `
    // @ts-expect-error
    const Subtitle = Title.withComponent('h2')

    const { asFragment } = render(() => (
      <article>
        <Title>My Title</Title>
        <Subtitle>My Subtitle</Subtitle>
      </article>
    ))

    expect(asFragment()).toMatchSnapshot()
  })

  it('withComponent does carry styles from flattened component', () => {
    const SomeComponent = styled.div`
      color: green;
    `
    const AnotherComponent = styled(SomeComponent)`
      color: hotpink;
    `
    // @ts-expect-error
    const OneMoreComponent = AnotherComponent.withComponent('p')
    const { asFragment } = render(() => (
      <OneMoreComponent />
    ))
    expect(asFragment()).toMatchSnapshot()
  })

  it('theming', () => {
    const Div = styled.div`
      color: ${props => props.theme.primary};
    `

    const { asFragment } = render(defineComponent(() => {
      EmotionThemeProvider({
        primary: 'hotpink'
      })

      return () => (
        <Div>this should be hotpink</Div>
      )
    })
  )

    expect(asFragment()).toMatchSnapshot()
  })

  it('keyframes with css call', () => {
    let SomeComp = styled.div(
      css`
        animation: ${keyframes({
          'from,to': { color: 'green' },
          '50%': { color: 'hotpink' }
        })};
      `
    )

    const { asFragment } = render(() => (
      <SomeComp />
    ))

    expect(asFragment()).toMatchSnapshot()
  })

  it("same component rendered multiple times", () => {
    const SomeComponent = styled.div`
      color: green;
    `
    const { asFragment } = render(() => (
      <SomeComponent />
    ))
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
    expect(render(() => (
      <SomeComponent />
    )).asFragment()).toEqual(render(() => (
      <SomeComponent />
    )).asFragment())

    expect(render(() => (
      <SomeComponent>
        <SomeComponent />
        <SomeComponent />
      </SomeComponent>
    )).asFragment()).toMatchSnapshot()
  })

  it("component selectors", () => {
    let Target = styled('div', {
      // if anyone is looking this
      // please don't do this.
      // use the babel plugin/macro.
      target: 'e322f2d3tbrgf2e0'
    })`
      color: hotpink;
    `

    let SomeComponent = styled.div`
      color: green;
      ${Target.toString()} {
        color: yellow;
      }
    `
    expect(render(() => (
      <SomeComponent>
        <Target />
      </SomeComponent>
    )).asFragment()).toMatchSnapshot()
  })
})
