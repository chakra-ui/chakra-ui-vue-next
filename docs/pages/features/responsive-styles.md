# Responsive Styles

Chakra UI supports responsive styles out of the box. Instead of manually adding
`@media` queries and adding nested styles throughout your code, Chakra UI allows
you to provide object and array values to add mobile-first responsive styles.

> We use the `@media(min-width)` media query to ensure your interfaces are
> mobile-first.

Responsive syntax relies on the breakpoints defined in the theme object. Chakra
UI provides default breakpoints, here's what it looks like:

```js
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})
```

To make styles responsive, you can use either the array or object syntax.

## The Array syntax

All style props accept arrays as values for mobile-first responsive styles. This
is the recommended method.

Let's say you have a `Box` with the following properties:

```vue
<c-box bg="red.200" w="400px">
  This is a box
</c-box>
```

To make the `width` or `w` responsive using the array syntax, here's what you
need to do:

```vue
<c-box bg="red.200" :w=[300, 400, 500]>
  This is a box
</c-box>
```

To interpret array responsive values, Chakra UI converts the values defined in
`theme.breakpoints` and sorts them in ascending order. Afterward, we map the
values defined in the array to the breakpoints

```js
import { createBreakpoints } from "@chakra-ui/theme-tools"

// This is the default breakpoint
const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})

// Internally, we transform to this
const breakpoints = ["0em", "30em", "48em", "62em", "80em", "96em"]
```

Here's how to interpret this syntax:

- `300px`: From `0em` upwards
- `400px`: From `30em` upwards
- `500px`: From `48em` upwards

> To skip certain breakpoints, you can pass `null` to any position in the array
> to avoid generating unnecessary CSS.

## The Object syntax

You can also define responsive values with breakpoint aliases in an object. Any
undefined alias key will define the base, non-responsive value.

Let's say you have a `Text` that looks like this:

```vue
<c-text fontSize="40px">This is a text</c-text>
```

To make the `fontSize` responsive using the object syntax, here's what you need
to do:

```vue
<c-text :fontSize={ base: "24px", md: "40px", lg: "56px" }>
  This is responsive text
</c-text>
```

> **Remember, Chakra UI uses the min-width media query for responsive design**.
> The breakpoints are: `sm = 30em`, `md = 48em`, `lg = 62em`, `xl = 80em`

Here's how to interpret this syntax:

- `base`: From `0em` upwards
- `md`: From `48em` upwards
- `lg`: From `62em` upwards

## More Examples

This works for every style prop in the theme specification, which means you can
change the style of most properties at a given breakpoint.

```vue
<template>
  <c-box
    :height={
      base: "100%", // 0-48em
      md: "50%", // 48em-80em,
      xl: "25%", // 80em+
    }
    bg="teal.400"
    :width=[
      "100%", // 0-30em
      "50%", // 30em-48em
      "25%", // 48em-62em
      "15%", // 62em+
    ]
  />
  {/* responsive font size */}
  <c-box :fontSize=["sm", "md", "lg", "xl"]>Font Size</c-box>
  {/* responsive margin */}
  <c-box :mt=[2, 4, 6, 8] width="full" height="24px" bg="tomato" />
  {/* responsive padding */}
  <c-box bg="papayawhip" :p=[2, 4, 6, 8]>
    Padding
  </c-box>
</template>
```

## Under the hood

This shortcut is an alternative to writing media queries out by hand. Given the
following:

```vue
<c-box :width=[1, 1 / 2, 1 / 4] />
or
<c-box :width="['100%', 0.5, 0.25]" />
```

It'll generate a CSS that looks like this

```css
.Box {
  width: 100%;
}

@media screen and (min-width: 40em) {
  .Box {
    width: 50%;
  }
}

@media screen and (min-width: 52em) {
  .Box {
    width: 25%;
  }
}
```

___NOTE___: In the shortcut example `'100%'` is used instead of `1` because in the default Chakra UI Vue theme, `theme.sizes[1] = 0.25rem`. This means that using a prop like `:width="1"` will render a width of 4px and not `'100%'`

The equivalent of this style if you passed it as an object.

```js
// First, create an alias for breakpoints
const breakpoints = ["30em", "48em", "62em", "80em"];
// aliases
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];
```

then

```vue
<c-box :width="{ base: 1, sm: 1 / 2, md: 1 / 4 }" />
```

## Customizing Breakpoints

In some scenarios, you might need to define custom breakpoints for your
application. We recommended using common aliases like `sm`, `md`, `lg`, and
`xl`.

To define custom breakpoints, install `@chakra-ui/theme-tools`, and use the
`createBreakpoints` utility we provide.

> Note: Ensure the css unit of your breakpoints are the same. Use all `px` or
> all `em`, don't mix them.

```vue
// 1. Import the utilities
import { extendTheme } from "@chakra-ui/vue-next"
import { createBreakpoints } from "@chakra-ui/theme-tools"

// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
})

// 3. Extend the theme
const theme = extendTheme({ breakpoints })

// 4. Now you can use the custom breakpoints
function Example() {
  return <c-box :width={ base: "100%", sm: "50%", md: "25%" } />
}
```

> Note: If you're using **pixels** as breakpoint values make sure to **always**
> provide a value for the `2xl` breakpoint, which by its default pixels value is
> **"1536px"**.

## Demo

Here's a simple example of a marketing page component that uses a stacked layout
on small screens, and a side-by-side layout on larger screens **(resize your
browser to see it in action)**:

```vue
<c-box p="4" :display={ md: "flex" }>
  <c-box flexShrink="0">
    <c-image
      borderRadius="lg"
      :width={ md: 40 }
      src="https://bit.ly/2jYM25F"
      alt="Person paying for a purchase"
    />
  </c-box>
  <c-box :mt={ base: 4, md: 0 } :ml={ md: 6 }>
    <c-text
      fontWeight="bold"
      textTransform="uppercase"
      fontSize="sm"
      letterSpacing="wide"
      color="teal.600"
    >
      Marketing
    </c-text>
    <c-link
      mt="1"
      display="block"
      fontSize="lg"
      lineHeight="normal"
      fontWeight="semibold"
      href="#"
    >
      Finding customers for your new business
    </c-link>
    <c-text mt="2" color="gray.500">
      Getting a new business off the ground is a lot of hard work. Here are five
      ideas you can use to find your first customers.
    </c-text>
  </c-box>
</c-box>
```
