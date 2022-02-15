<template>
  <div>
    <div>Hello world</div>
    <TextComponent class="babab"> I am a sample </TextComponent>
    <Heading1>Heading 1</Heading1>
    <H1 color="pink" flex="1" font-size="20px">H1</H1>
    <Thing>
      <div>
        hello
        <Header1>This will be green. <span>I will be red</span></Header1> world
      </div>
    </Thing>
    <Blue>Blue sentence</Blue>
    <HHEDING font-size="35px">Random sentence</HHEDING>
    <HEader12>Header 12</HEader12>
    <Input placeholder="hello world" />
    <DynamicPropThemedH1 :theme="{ blue: 'blue' }">
      Dynamic Prop Themed H1
    </DynamicPropThemedH1>
    <ExpressionH2 :scale="2" class="legacy__class">
      With Dynamic Functional expression
    </ExpressionH2>
    <Aside> Set me aside </Aside>
  </div>
</template>

<script lang="tsx" setup>
import { defineComponent, h } from "vue"
import styled from "../src"

const TextComponent = styled.h1`
  color: red;
  font-size: 34px;
  @media (min-width: 420px) {
    color: blue;
  }
`

const fontSize = "20px"
const Heading1 = styled.h1({ fontSize })

// const H1 = styled.h1(
//   (props) => ({
//     color: props.color,
//   }),
//   (props) => ({ flex: props.flex }),
//   { display: "flex" }
// )
const H1 = styled.h1((props) => {
  return {
    fontSize: props.fontSize,
    ...props,
  }
})

const Header1 = styled.h1`
  font-size: ${fontSize};
`

const HEader12 = styled(Header1)`
  color: purple;
`

const Thing = styled.div`
  display: flex;
  color: green;
  & div {
    & span {
      color: red;
    }
  }
`
const Blue = styled("h2")`
  font-size: ${() => fontSize};
`

const margin = (t, r, b, l) => {
  return (props) => ({
    marginTop: t,
    marginRight: r,
    marginBottom: b,
    marginLeft: l,
  })
}

const HHEDING = styled.h1`
  background-color: hotpink;
  ${(props) => props.prop && { fontSize: "3rem" }};
  ${margin(0, "auto", 0, "auto")};
  color: green;
`

const Input = styled("input")({
  "::placeholder": {
    backgroundColor: "green",
  },
})

const DynamicPropThemedH1 = styled("h1")`
  text-decoration: ${"underline"};
  border-right: solid blue 54px;
  background: ${"white"};
  color: ${"black"};
  display: ${"block"};
  border-radius: ${"3px"};
  padding: ${"25px"};
  width: ${"500px"};
  z-index: ${100};
  font-size: ${"18px"};
  text-align: ${"center"};
  border-left: ${(p) => p.theme.blue};
`

const fontSizeNo = 20
const ExpressionH1 = styled("h1")`
  font-size: ${fontSizeNo + "px"};
`

var Aside = styled.aside`
  padding: 3px;
  font-weight: bold;
`
const ExpressionH2 = styled(ExpressionH1)`
  font-size: ${({ scale }) => fontSizeNo * scale + "px"};
`
</script>
