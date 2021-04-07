# @chakra-ui/c-icon

A component to display icons in the browser

## Installation

```sh
yarn add @chakra-ui/c-icon
# or
npm i @chakra-ui/c-icon
```

### Adding custom icons
All Chakra icons are registered in the Chakra plugin under the `icons.extend` key. So you
can extend this object to add your own icons. Here are the steps:

- Export the icon's `svg` from Figma, Sketch, etc.
- Use a tool like [SvgOmg](https://svgomg.firebaseapp.com) to reduce the size
  and minify the markup.
- Add the icon to the theme object.

> Add the `fill=currentColor` attribute to the `path` or `g` so that when you
> this `<Icon color="gray.200"/>`, it works correctly.

<br />

```js
// Step 1: Each icon should be stored as an object of `path` and `viewBox`
const customIcons = {
  icon1: {
    path: `<path fill="currentColor" d="..." />`,
    // If the icon's viewBox is `0 0 24 24`, you can ignore `viewBox`
    viewBox: "0 0 40 40",
  },
  icon2: {
    path: `
      <g fill="currentColor">
        <path d="..."/>
      </g>
    `
  }
};

// Step 2: Add the custom icon to the Chakra plugin
const app = createApp(App)
  .use(ChakraUIVuePlugin, {
    icons: {
      // ...
      extend: customIcons
    }
  })
```

You can now consume your custom icons in your template like this:

```vue
<template>
  <c-icon name="icon1" color="yellow.600" />
  <c-icon name="icon2" color="green.300" />
</template>
```

> You can access the full merged icons object under `this.$chakra.icons` in your Vue components.
