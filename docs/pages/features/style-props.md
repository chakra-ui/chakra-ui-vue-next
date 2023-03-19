# Style Props

Chakra UI adopts a convenient approach to styling its components by using style props.

Style props are a way to alter the style of a component by passing props
to it. It helps to save time by providing helpful shorthand ways to style
components.

Chakra UI uses [Styled System](https://styled-system.com/) to achieve this under the hood. We
extend styled-system's utilities to provide other helpful shorthands.

## Style Props Reference

The following table shows a list of every style prop and the properties within
each group. To learn more about it, you can also check the
[Styled System docs](https://styled-system.com/api):

### Margin & padding

```vue
<template>
  <!-- m="2" refers to the value of theme.space.[2] -->
  <c-box m="2">Tomato</c-box>
  
  <!-- You can also make use of custom values -->
  <c-box max-w="960px" mx="auto">Custom</c-box>

  <!-- sets margin `8px` on all viewports and `12px` from the first breakpoint and up -->
  <c-box :m="['2', '3']" />
</template>

<script setup>
import { CBox } from '@chakra-ui/vue-next'
</script>
```

| Prop                  | CSS Property                       | Theme Key |
| --------------------- | ---------------------------------- | --------- |
| `m`, `margin`         | `margin`                           | `space`   |
| `mt`, `marginTop`     | `margin-top`                       | `space`   |
| `mr`, `marginRight`   | `margin-right`                     | `space`   |
| `mb`, `marginBottom`  | `margin-bottom`                    | `space`   |
| `ml`, `marginLeft`    | `margin-left`                      | `space`   |
| `mx`                  | `margin-left` and `margin-right`   | `space`   |
| `my`                  | `margin-top` and `margin-bottom`   | `space`   |
| `p`, `padding`        | `padding`                          | `space`   |
| `pt`, `paddingTop`    | `padding-top`                      | `space`   |
| `pr`, `paddingRight`  | `padding-right`                    | `space`   |
| `pb`, `paddingBottom` | `padding-bottom`                   | `space`   |
| `pl`, `paddingLeft`   | `padding-left`                     | `space`   |
| `px`                  | `padding-left` and `padding-right` | `space`   |
| `py`                  | `padding-top` and `padding-bottom` | `space`   |

### Color & background color

```vue
<template>
  <!-- picks up a nested color value using dot notation -->
  <c-box color="gray.50" />
  <!-- You can also use raw CSS color values -->
  <c-box color="#f00" />
  <!-- Sets background color to pink -->
  <c-box bg="pink" />
</template>

<script setup>
import { CBox } from '@chakra-ui/vue-next'
</script>
```

| Prop                    | CSS Property       | Theme Key |
| ----------------------- | ------------------ | --------- |
| `color`                 | `color`            | `colors`  |
| `bg`, `backgroundColor` | `background-color` | `colors`  |
| `opacity`               | `opacity`          | none      |

### Typography
```vue
<template>
  <!-- font-size of `theme.fontSizes.md` -->
  <c-text font-size="md" />
  <!-- font-size `32px` -->
  <c-text font-size="32" />
  <!-- font-size `'2em'` -->
  <c-text font-size="2em" />
  <!-- text-align `left` on all viewports and `center` from the first breakpoint and up -->
  <c-text :text-align="[ 'left', 'center' ]" />
</template>

<script setup>
import { CText } from '@chakra-ui/vue-next'
</script>
```

| Prop             | CSS Property      | Theme Key        |
| ---------------- | ----------------- | ---------------- |
| `fontFamily`     | `font-family`     | `fonts`          |
| `fontSize`       | `font-size`       | `fontSizes`      |
| `fontWeight`     | `font-weight`     | `fontWeights`    |
| `lineHeight`     | `line-height`     | `lineHeights`    |
| `letterSpacing`  | `letter-spacing`  | `letterSpacings` |
| `textAlign`      | `text-align`      | none             |
| `fontStyle`      | `font-style`      | none             |
| `textTransform`  | `text-transform`  | none             |
| `textDecoration` | `text-decoration` | none             |

### Layout, width, and height

```vue
<template>
  <!-- verbose -->
  <c-box width="100%" height="32px" />
  <!-- shorthand -->
  <c-box w="100%" h="32px" />
  <!-- width `256px` -->
  <c-box w="256" />
  <!-- width `40px` -->
  <c-box w="40px" />
</template>

<script setup>
import { CBox } from '@chakra-ui/vue-next'
</script>
```


| Prop                | CSS Property     | Theme Key |
| ------------------- | ---------------- | --------- |
| `w`, `width`        | `width`          | `sizes`   |
| `h`, `height`       | `height`         | `sizes`   |
| `minW`, `minWidth`  | `min-width`      | `sizes`   |
| `maxW`, `maxWidth`  | `max-width`      | `sizes`   |
| `minH`, `minHeight` | `min-height`     | `sizes`   |
| `maxH`, `maxHeight` | `max-height`     | `sizes`   |
| `d`, `display`      | `display`        | none      |
| `size`              | `width` `height` | `sizes`   |
| `verticalAlign`     | `vertical-align` | none      |
| `overflow`          | `overflow`       | none      |
| `overflowX`         | `overflowX`      | none      |
| `overflowY`         | `overflowY`      | none      |

### Flexbox
```vue
<template>
  <!-- verbose -->
  <c-box display="flex" align-items="center" justify-content="space-between">
    Box with Flex props
  </c-box>
  
  <!-- shorthand using the `Flex` component -->
  <c-flex align="center" justify="center">
    Flex Container
  </c-flex>
</template>

<script setup>
import { CBox, CFlex } from '@chakra-ui/vue-next'
</script>
```

> Note: Props in `*` will only work if you use the `CFlex` component.

| Prop                                      | CSS Property       | Theme Key |
| ----------------------------------------- | ------------------ | --------- |
| `alignItems`, \*`align`                   | `align-items`      | none      |
| `alignContent`                            | `align-content`    | none      |
| `justifyItems`                            | `justify-items`    | none      |
| `justifyContent`, \*`justify`             | `justify-content`  | none      |
| `flexWrap`, \*`wrap`                      | `flex-wrap`        | none      |
| `flexDirection`, `flexDir`, \*`direction` | `flex-direction`   | none      |
| `flex`                                    | `flex` (shorthand) | none      |
| `flexGrow`                                | `flex-grow`        | none      |
| `flexShrink`                              | `flex-shrink`      | none      |
| `flexBasis`                               | `flex-basis`       | none      |
| `justifySelf`                             | `justify-self`     | none      |
| `alignSelf`                               | `align-self`       | none      |
| `order`                                   | `order`            | none      |

### Grid Layout
```vue
<template>
  <!-- verbose -->
  <c-box display="grid" grid-gap="2" grid-auto-flow="row dense">
    Grid
  </c-box>

  <!-- shorthand using the `Grid` component -->
  <c-grid gap="2" auto-flow="row dense">
    Grid
  </c-grid>
</template>

<script setup>
import { CBox, CGrid } from '@chakra-ui/vue-next'
</script>
```

> Note: Props in `*` will only work if you use the `CGrid` component.

| Prop                                       | CSS Property            | Theme Key |
| ------------------------------------------ | ----------------------- | --------- |
| `gridGap`, \*`gap`                         | `grid-gap`              | `space`   |
| `gridRowGap`, \*`rowGap`                   | `grid-row-gap`          | `space`   |
| `gridColumnGap`, \*`columnGap`             | `grid-column-gap`       | `space`   |
| `gridColumn`, \*`column`                   | `grid-column`           | none      |
| `gridRow`, \*`row`                         | `grid-row`              | none      |
| `gridArea`, \*`area`                       | `grid-area`             | none      |
| `gridAutoFlow`, \*`autoFlow`               | `grid-auto-flow`        | none      |
| `gridAutoRows`, \*`autoRows`               | `grid-auto-rows`        | none      |
| `gridAutoColumns`, \*`autoColumns`         | `grid-auto-columns`     | none      |
| `gridTemplateRows`, \*`templateRows`       | `grid-template-rows`    | none      |
| `gridTemplateColumns`, \*`templateColumns` | `grid-template-columns` | none      |
| `gridTemplateAreas`, \*`templateAreas`     | `grid-template-areas`   | none      |

### Background
```vue
<template>
  <!-- verbose -->
  <c-box
    background-image="url('/images/kyuubi.png')"
    background-position="center"
    background-repeat="no-repeat"
  >

  <!-- shorthand -->
  <c-box bg-image="url('/images/gaara.png')" bg-pos="center" bg-repeat="no-repeat" >
</template>

<script setup>
import { CBox } from '@chakra-ui/vue-next'
</script>
```

| Prop                                  | CSS Property            | Theme Key |
| ------------------------------------- | ----------------------- | --------- |
| `background`                          | `background`            | none      |
| `bgImage`, `backgroundImage`          | `background-image`      | none      |
| `bgSize`, `backgroundSize`            | `background-size`       | none      |
| `bgPos`,`backgroundPosition`          | `background-position`   | none      |
| `bgRepeat`,`backgroundRepeat`         | `background-repeat`     | none      |
| `bgAttachment`,`backgroundAttachment` | `background-attachment` | none      |

### Borders

```vue
<template>
  <c-box border="1px" border-radius="md" border-color="gray.200">
    Card
  </c-box>
</template>

<script setup>
import { CBox } from '@chakra-ui/vue-next'
</script>
```


| Prop                | CSS Property                   | Theme Field    |
| ------------------- | ------------------------------ | -------------- |
| `border`            | `border`                       | `borders`      |
| `borderWidth`       | `border-width`                 | `borderWidths` |
| `borderStyle`       | `border-style`                 | `borderStyles` |
| `borderColor`       | `border-color`                 | `colors`       |
| `borderTop`         | `border-top`                   | `borders`      |
| `borderTopWidth`    | `border-top-width`             | `borderWidths` |
| `borderTopStyle`    | `border-top-style`             | `borderStyles` |
| `borderTopColor`    | `border-top-color`             | `colors`       |
| `borderRight`       | `border-right`                 | `borders`      |
| `borderRightWidth`  | `border-right-width`           | `borderWidths` |
| `borderRightStyle`  | `border-right-style`           | `borderStyles` |
| `borderRightColor`  | `border-right-color`           | `colors`       |
| `borderBottom`      | `border-bottom`                | `borders`      |
| `borderBottomWidth` | `border-bottom-width`          | `borderWidths` |
| `borderBottomStyle` | `border-bottom-style`          | `borderStyles` |
| `borderBottomColor` | `border-bottom-color`          | `colors`       |
| `borderLeft`        | `border-left`                  | `borders`      |
| `borderLeftWidth`   | `border-left-width`            | `borderWidths` |
| `borderLeftStyle`   | `border-left-style`            | `borderStyles` |
| `borderLeftColor`   | `border-left-color`            | `colors`       |
| `borderX`           | `border-left` & `border-right` | `borders`      |
| `borderY`           | `border-top` & `border-bottom` | `borders`      |

### Border Radius

```vue
<template>
  <!-- This button will have no right borderRadius -->
  <c-button rounded-right="0">Button 1</c-button>

  <!-- This button will have no left borderRadius*/ -->
  <c-button rounded-left="0">Button 2</c-button>

  <!-- top left and top right radius will be `theme.radii.md` => 4px -->
  <c-button rounded-top="md">Button 2</c-button>
</template>

<script setup>
import { CButton } from '@chakra-ui/vue-next'
</script>
```


| Prop                                            | CSS Property                                               | Theme Field |
| ----------------------------------------------- | ---------------------------------------------------------- | ----------- |
| `rounded`, `borderRadius`                       | `border-radius`                                            | `radii`     |
| `roundedTopLeft`, `borderTopLeftRadius`         | `border-top-left-radius`                                   | `radii`     |
| `roundedTopRight`, `borderTopRightRadius`       | `border-top-right-radius`                                  | `radii`     |
| `roundedBottomRight`, `borderBottomRightRadius` | `border-bottom-right-radius`                               | `radii`     |
| `roundedBottomLeft`, `borderBottomLeftRadius`   | `border-bottom-left-radius`                                | `radii`     |
| `roundedTop`                                    | `border-top-left-radius` & `border-top-right-radius`       | `radii`     |
| `roundedRight`                                  | `border-top-right-radius` & `border-bottom-right-radius`   | `radii`     |
| `roundedBottom`                                 | `border-bottom-left-radius` & `border-bottom-right-radius` | `radii`     |
| `roundedLeft`                                   | `border-top-left-radius` & `border-bottom-left-radius`     | `radii`     |

### Position
```vue
<template>

  <!-- verbose -->
  <c-box position="absolute">Cover</c-box>

  <!-- shorthand -->
  <c-box pos="absolute">Cover</c-box>

  <c-box pos="absolute" top="0" left="0">
    Absolute with top and left
  </c-box>

  <c-box pos="fixed" w="100%" z-index="2">
    Fixed with zIndex
  </c-box>
</template>

<script setup>
import { CBox } from '@chakra-ui/vue-next'
</script>
```


| Prop             | CSS Property | Theme Field |
| ---------------- | ------------ | ----------- |
| `pos`,`position` | `position`   | none        |
| `zIndex`         | `z-index`    | `zIndices`  |
| `top`            | `top`        | `space`     |
| `right`          | `right`      | `space`     |
| `bottom`         | `bottom`     | `space`     |
| `left`           | `left`       | `space`     |

### Shadow
```vue
<template>
  <!-- verbose -->
  <!-- text-shadow will be `theme.shadows.sm` -->
  <!-- box-shadow will be `theme.shadows.md` -->
  <c-box text-shadow="sm" box-shadow="md" />

  <!-- raw CSS values -->
  <c-text text-shadow="2px 2px #ff0000" box-shadow="5px 10px #888888">
    Text with shadows
  </c-text>
</template>

<script setup>
import { CBox, CText } from '@chakra-ui/vue-next'
</script>
```


| Prop                 | CSS Property  | Theme Field |
| -------------------- | ------------- | ----------- |
| `textShadow`         | `text-shadow` | `shadows`   |
| `shadow`,`boxShadow` | `box-shadow`  | `shadows`   |

### Other Props

Asides from all the common style props listed above, all components will accept the
following props:

| Prop              | CSS Property       | Theme Field |
| ----------------- | ------------------ | ----------- |
| `animation`       | `animation`        | none        |
| `appearance`      | `appearance`       | none        |
| `transform`       | `transform`        | none        |
| `transformOrigin` | `transform-origin` | none        |
| `visibility`      | `visibility`       | none        |
| `whiteSpace`      | `white-space`      | none        |
| `userSelect`      | `user-select`      | none        |
| `pointerEvents`   | `pointer-events`   | none        |
| `wordBreak`       | `word-break`       | none        |
| `overflowWrap`    | `overflow-wrap`    | none        |
| `textOverflow`    | `text-overflow`    | none        |
| `boxSizing`       | `box-sizing`       | none        |
| `cursor`          | `cursor`           | none        |
| `resize`          | `resize`           | none        |
| `transition`      | `transition`       | none        |
| `objectFit`       | `object-fit`       | none        |
| `objectPosition`  | `object-position`  | none        |
| `objectPosition`  | `object-position`  | none        |
| `fill`            | `fill`             | `colors`    |
| `stroke`          | `stroke`           | `colors`    |
| `outline`         | `outline`          | none        |

## The `as` prop

The `as` prop is a feature that a lot of the components in `@chakra-ui/vue-next` will get because
they compose the Box component.

It allows you to pass an HTML tag or another component to a
Chakra component to be rendered as the base tag of that component along with all
it's styles and props.

For example, say you are using a Button component, and you need to make it a
link instead. You can compose `router-link` and Button like this:
<br/>

```vue
<template>
  <c-button as="router-link" to="/about">About Page Button</c-button>
</template>

<script setup>
import { CButton } from '@chakra-ui/vue-next'
</script>
```

This allows you to use all of the `Button` props and all of the `<router-link>` props
without having to wrap the Button in an `<router-link>` component.