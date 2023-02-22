# @chakra-ui/c-icon

A component to display icons in the browser

## Installation

```sh
yarn add @chakra-ui/c-icon
# or
npm i @chakra-ui/c-icon
```

### Creating inline icons
If you with to create new icons on the fly, you can create an icon component which accepts Chakra UI style props using the `createIcon` API as shown below:
```ts

const DocumentationIcon = createIcon({
  name: "Documentation",
  viewBox: "0 2.4 24 24",
  path: `<path fill="currentColor" d="M6 24.4q-.825 0-1.413-.587T4 22.4v-16q0-.825.588-1.412T6 4.4h12q.825 0 1.413.588T20 6.4v16q0 .825-.588 1.413T18 24.4H6Zm0-2h12v-16h-2v6.125q0 .3-.25.438t-.5-.013L13.5 11.9l-1.75 1.05q-.25.15-.5.013t-.25-.438V6.4H6v16Zm5-16h5h-5Zm-5 0h12H6Z"/>`,
})

```
This creates a `DocumentationIcon` component that you can style with Chakra UI props as shown in the template below:
```vue
<template>
  <DocumentationIcon :box-size="20" color="tomato" />
</template>
```

### Adding custom icons to theme
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
