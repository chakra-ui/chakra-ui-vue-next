---
title: Getting Started
---

# Project setup with Vite

## Scaffolding Vite Project

If you want to use Vite you can start with using the Vite + Vue3 (+ TS) template. This can be done by using the Vite Scaffolding tool.

With NPM:

```bash
npm init @vitejs/app
```

With Yarn:

```bash
yarn create @vitejs/app
```

Take a look at the Vite documentation for more information here. [https://vitejs.dev/guide/#scaffolding-your-first-vite-project](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

## Adding Chakra UI Vue Next

First you need to install the Chakra UI Vue Next package.

```bash
yarn add @chakra-ui-vue
```

### Locally for now

For now I've to use Yarn link. 

In the Chakra UI Vue Next packages you run: 

```bash
yarn build && yarn link
```

Then inside the Vite project you can link to the packages

```bash
yarn link "@chakra-ui/vue-next"
yarn link "@chakra-ui/vue-system"
yarn link "@chakra-ui/vue-theme"
yarn link "@chakra-ui/vue-utils"
yarn link "@chakra-ui/c-button"
```

## Usage

Before you can use Chakra, you have to add it to the Vue.js instance. This will be done in your `main.ts` file. 

```tsx
import { createApp } from 'vue'
import App from './App.vue'
import ChakraUIVuePlugin from '@chakra-ui/vue-next'
import { domElements } from '@chakra-ui/vue-system'

const app = createApp(App).use(ChakraUIVuePlugin)
app.mount('#app')
```

If you wish to use the Chakra Factory ([https://chakra-ui.com/docs/features/chakra-factory](https://chakra-ui.com/docs/features/chakra-factory)) to create base html elements with theme-aware style props using `chakra.<element>` notation.
Make sure import the `chakra object` from `'@chakra-ui/vue-next'` and to add the following forEach function.

```tsx
import { createApp } from 'vue'
import App from './App.vue'
import ChakraUIVuePlugin, { chakra } from '@chakra-ui/vue-next'
import { domElements } from '@chakra-ui/vue-system'

const app = createApp(App).use(ChakraUIVuePlugin)

domElements.forEach((tag) => {
  app.component(`chakra.${tag}`, chakra(tag))
})

app.mount('#app')
```

## Chakra in components

When you can use a Chakra UI Vue component in your components, you will first have to import the Chakra component you want to use, for example, the CButton.

```tsx
import { CButton } from "@chakra-ui/vue-next"
```

Next, you have to add it to the components option. 

```tsx
export default defineComponent({
  name: 'YOUR COMPONENT NAME',
  components: {
    CButton
  }
})
```

Now you are able to use it in the template of your component.

```tsx
<c-button variant-color="green">Button</c-button>
```

### C-Reset

Sometimes you may need to apply css reset styles to your application. Chakra UI exports a `CReset` that'll remove browser default styles. It's heavily inspired by `Tailwind's preflight`.

```tsx
import { CReset } from "@chakra-ui/vue-next"
```

And at the root level template add the following

```html
<c-reset />
```

## Using an icon library

Most times, you might need to use icons from a popular icon library like `feather-icons`. Here's how to go about it.

Make sure to install the `feather-icons-paths` package with

```bash
yarn add feather-icons-paths
```

Inside your `main.ts` file you can import the icons you wish to use and add those to the `ChakraUIVuePlugin` options.

```tsx
const app = createApp(App).use(ChakraUIVuePlugin, {
  icons: {
    library: {
      feGithub
    }
  }
})
```

Since the `feather-icons-paths` package doesn't have provide any `types` you've to declare it otherwise you might get some `Could not find a declaration file for module X` errors.

If you are using `Volar` inside the `shims-vue.d.ts` you can declare the module.

```tsx
declare module 'feather-icons-paths'
```

### Usage

Icons can then be used in `Charka` components like `CIcon` and `CButton`. This happens by passing the `name` prop. This name must match an icon key in `theme.icons`.

```tsx
<c-icon color="red.400" size="10" name="activity" />
```
