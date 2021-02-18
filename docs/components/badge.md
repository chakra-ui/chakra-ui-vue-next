# Badge

Badges are used to highlight an item's status for quick recognition.

## Import

```bash
import { CBadge } from "@chakra-ui/vue-next"
```

## Usage
```vue
<c-badge color-scheme="blue">Badge</c-badge>
```

### Badge Color

Pass the `colorScheme` prop to customize the color of the Badge. `colorScheme`
can be any **color key** that exists in `theme.colors`.

TODO: Link to theming page

```vue
<c-badge>Default</c-badge>
<c-badge color-scheme="green">Success</c-badge>
<c-badge color-scheme="red">Removed</c-badge>
<c-badge color-scheme="purple">New</c-badge>
```

### Badge Variants

Pass the `variant` prop and set it to either `subtle`, `solid`, or `outline` to
get a different style.

```vue
<c-badge variant="outline" color-scheme="green">Default</c-badge>
<c-badge variant="solid" color-scheme="green">Success</c-badge>
<c-badge variant="subtle" color-scheme="green">Removed</c-badge>
```

TODO: Add composition examples

## Props

The `CBadge` component composes `CBox` component so you can pass props for `CBox`.
| Name | Type | Description | Default |
| :---: | :---: | :---: | :---: |
|`colorScheme`|`"blue" | "cyan" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "teal" | "yellow" | "whiteAlpha" | "blackAlpha" | "linkedin" | "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram"`| Theme color scheme |`"gray"`|
|`size` |	`"sm" | "md" | "lg" | "xs"` |	Sizes for Badge are not implemented in the default theme. You can extend the theme to implement them.	| - |
|`variant` |	`"outline" | "solid" | "subtle"` |		| `"subtle"` |
