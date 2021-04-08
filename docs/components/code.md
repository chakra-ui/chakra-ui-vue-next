# Code

Code is a component used to display inline code. It is composed from the Box component with a font family of `mono` for displaying code.

## Import

```js
import { CCode } from "@chakra-ui/vue-next"
```

## Usage
```vue
<c-code>hello world</c-code>
```

### Code Color

Pass the `colorScheme` prop to customize the color of the Badge. `colorScheme` can be any **color key** that exists in `theme.colors`.

TODO: Link to theming page

```vue
<c-code>hello world, default</c-code>
<c-code color-scheme="green">hello world, green</c-code>
<c-code color-scheme="red">hello world, red</c-code>
<c-code color-scheme="purple">hello world, purple</c-code>
```

## Props

| Name | Type | Description | Default |
| :---: | :---: | :---: | :---: |
|`colorScheme`|`string`|Color Scheme to be applied|"cyan" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "teal" | "yellow" | "whiteAlpha" | "blackAlpha" | "linkedin" | "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram"`|`"gray"`|