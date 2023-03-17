# CSS Variables

Chakra UI now converts theme tokens (colors, font sizes, etc) to CSS Custom
Properties (also known as "CSS variables").

CSS variables are now supported in all modern browsers, and we think they are
useful to:

- avoid prop interpolations;
- avoid class name regeneration from
  [emotion](https://emotion.sh/docs/introduction);
- reduce runtime evaluation of token values in Theme context;
- use theme token outside Chakra's component (embedded forms, markdown content,
  etc.)

## Overview

There are three main components you should know about when using CSS variables:

- How Chakra converts tokens to custom properties
- How to consume them in and outside Chakra's component
- Where we attach the custom properties to

## Converting theme tokens to CSS variables

By default, Chakra UI converts theme tokens defined in your theme (or our
default theme) to CSS variables internally so you don't have to.

Given a theme object that looks like this:

```js
const theme = {
  fontSizes: {
    lg: '18px',
  },
  colors: {
    gray: {
      100: '#fafafa',
      200: '#f7f7f7',
    },
  },
}
```

When you pass this theme to the `ChakraProvider`, we'll automatically generate
CSS variables that look like:

```css
:root {
  --chakra-fontSizes-lg: '18px';
  --chakra-colors-gray-100: '#fafafa';
  --chakra-colors-gray-200: '#f7f7f7';
}
```

> Note: **The generated custom properties are prefixed with `chakra-*`** to
> avoid conflicts with third-party CSS.

## Consuming CSS Variables

When using Chakra's components, we manage the conversion of theme tokens to
their respective CSS variable.

```vue
// You type this
<c-box color="gray.100" />

// Chakra generates something like
.css-box {
   color: "var(--chakra-colors-gray-100)"
}
```

> Note: We do this automatically when you pass style props or use the `sx` prop.

### Styling non-chakra components

In certain scenarios, you might need to style components that are not managed by
Chakra. In this case, you can use the raw CSS variable values.

```vue
// let's say you have an embedded form
<FormiumForm />
```

You can write custom CSS to style the components

```css
.formium-form {
  color: var(--chakra-colors-gray-700);
  background-color: var(--chakra-colors-gray-50);
}
```

or wrap the component in `<c-box/>` and style it with convenience.

```vue
<c-box :sx="{ '.formium': { bg: 'gray.50', color: 'gray.700' } }">
  <FormiumForm />
</c-box>
```

## Creating scoped, theme-aware CSS variables

> This is experimental and might be removed in future versions

When using the `sx` prop or components created with the `chakra` factory, 
you can create variables that reference theme tokens. This makes it possible to change property values
based on breakpoint, or light/dark mode with ease.

```vue
<c-box
  :sx="{
    // "colors.gray.100" is shorthand for `var(--chakra-colors-gray.100)`
    '--banner-color': 'colors.gray.100',
    '.external-banner': {
      bg: 'var(--banner-color)',
      '.button': {
        borderColor: 'var(--banner-color)',
      },
    },
  }"
>
  <ExternalBanner />
</c-box>
```