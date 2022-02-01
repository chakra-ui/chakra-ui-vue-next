# Chakra Factory

Chakra factory serves as an **object of chakra enabled HTML elements**, and also
**a function that can be used to enable custom component** to receive chakra's
style props.

```bash
import { chakra } from "@chakra-ui/vue-next"
```

## Chakra JSX Elements

Create base HTML elements with theme-aware style props using `chakra.<element>`
notation. For example, if you want a plain HTML button with the ability to pass
chakra styles, you can write `<chakra.button />`.

```vue
<chakra.button
  px="3"
  py="2"
  bg="green.200"
  rounded="md"
  :_hover="{ bg: "green.300" }"
>
  Click me
</chakra.button>
```

This reduces the need to create custom component wrappers and name them. This
syntax is available for common HTML elements. See the reference for the full
[list of elements](https://github.com/chakra-ui/chakra-ui/blob/main/packages/system/src/system.utils.ts#L9)
supported.

```vue
<chakra.h1 fontSize="lg"> Heading </chakra.h1>
```

## Chakra factory function

This is a function that converts **non-chakra components** or **HTML element** to
chakra-enabled components so you can pass style props to them.

Consider a component called `my-awesome-component`, let's use the chakra factory
function to make it possible to pass style props.

The function will infer the prop types from the wrapped component and also add
chakra style props.

```vue
<template>
  <ChakraAwesomeComponent bg="red.200" fontSize="12px" />
</template>

<script setup>
  import { chakra } from "@chakra-ui/vue-next"
  import awesomeComponent from "my-awesome-components"

  const ChakraAwesomeComponent = chakra(awesomeComponent)
</script>
```

> Considering that Chakra uses `emotion` under the hood, ensure the non-chakra
> component accepts `className` as props for this to work correctly

### Attaching styles

In some instances, you might need to attach specific styles to the component
wrapped in the chakra factory

```vue
const ChakraAwesomeComponent = chakra(awesomeComponent, {
  baseStyle: {
    bg: "papayawhip",
    color: "red.500"
  },
})
```

You can also use the chakra factory on HTML elements as well.

```vue
const Card = chakra("div", {
  baseStyle: {
    shadow: "lg",
    rounded: "lg",
    bg: "white"
  },
})
```

## On DOM elements
If you wish to use the Chakra Factory on all dom elements to create base HTML elements
with theme-aware style props using `chakra.<element>` notation.

In your `main.ts` file make sure to import the chakra object from the '@chakra-ui/vue-next' package. 
Use a forEach() function to loop over all the dom elements and push them through the factory function (chakra()).

```vue
import { createApp } from 'vue'
import App from './App.vue'
import ChakraUIVuePlugin, { chakra } from '@chakra-ui/vue-next'
import { domElements } from '@chakra-ui/vue-system'

const app = createApp(App).use(ChakraUIVuePlugin)

domElements.forEach((tag) => {
  app.component(`chakra.${tag}`, chakra(tag))
})
// For example now `chakra.img` can be styled with style props.

app.mount('#app')
```