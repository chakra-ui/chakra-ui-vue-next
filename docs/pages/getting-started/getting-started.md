---
title: Getting Started
description: How to install and set up Chakra UI in your project
version: 1.0+
---


# Installation

Using Chakra UI Vue in your Vue.js project is very simple. Install the package and its dependencies.

```bash
yarn add @chakra-ui/vue-next
```

## Usage

Before you can use Chakra, you have to add it to the Vue.js instance. This will be done in your `main.ts` file.

```jsx
import { createApp } from 'vue'
import App from './App.vue'
import ChakraUIVuePlugin from '@chakra-ui/vue-next'

const app = createApp(App).use(ChakraUIVuePlugin)
app.mount('#app')
```

## Using Chakra Components

When you can use a Chakra UI Vue component, you will first have to import the Chakra component you want to use, for example, the `CButton`.

```jsx
import { CButton } from "@chakra-ui/vue-next"
```

Next, you have to add it to the components option.

```jsx
export default defineComponent({
  name: 'YOUR COMPONENT NAME',
  components: {
    CButton
  }
})
```

You are now able to use it in the template.

```html
<c-button variant-color="green">Button</c-button>
```

### C-Reset

Sometimes you may need to apply css reset styles to your application. Chakra UI exports a `CReset` that'll remove browser default styles. It's heavily inspired by `Tailwind's preflight`.

> 🚨 We highly recommend that you add the `CReset` at the root of your application to ensure all components work correctly.

```jsx
import { CReset } from "@chakra-ui/vue-next"
```

And at the root level template add the following

```html
<c-reset />
```