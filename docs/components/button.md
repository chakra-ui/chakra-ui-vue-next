# Button

The Button component is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.

## Import

```bash
import { CButton, CButtonGroup } from "@chakra-ui/vue-next"
```

- `CButton`: The button component with support for custom icons, spinners, etc.
- `CButtonGroup`: Used to group buttons whose actions are related, with an option to flush them together.

## Usage
```vue
<c-button color-scheme="blue">Button</c-button>
```

### Button sizes
Use the `size` prop to change the size of the button. You can set the value to `xs`, `sm`, `md`, or `lg`.

```vue{1,4,7,10}
<c-button color-scheme="teal" size="xs">
  Button
</c-button>
<c-button color-scheme="teal" size="sm">
  Button
</c-button>
<c-button color-scheme="teal" size="md">
  Button
</c-button>
<c-button color-scheme="teal" size="lg">
  Button
</c-button>
```

### Button variants

Use the `variant` prop to change the visual style of the Button. You can set the
value to `solid`, `ghost`, `outline`, or `link`.

```vue{1,4,7,10}
<c-button color-scheme="teal" variant="solid">
  Button
</c-button>
<c-button color-scheme="teal" variant="outline">
  Button
</c-button>
<c-button color-scheme="teal" variant="ghost">
  Button
</c-button>
<c-button color-scheme="teal" variant="link">
  Button
</c-button>
```

### Button with icon

You can add left and right icons to the Button component using the `left-icon`
and `right-icon` props respectively.

::: warning TODO
TODO: Link to icon documentation

:::

### Button loading state

Pass the `is-loading` prop to show its loading state. By default, the button will
show a spinner and leave the button's width unchanged.

You can also pass the `loading-text` prop to show a spinner and the loading text.
```vue
<c-button is-loading color-scheme="teal" variant="solid">
  Email
</c-button>
<c-button is-loading loading-text="Submitting" color-scheme="teal" variant="outline">
  Submit
</c-button>
```

### Grouping Buttons

You can use the `CStack` or `CButtonGroup` component to group buttons. When you
use the `CButtonGroup` component, it allows you to:

- Set the `size` and `variant` of all buttons within it.
- Add `spacing` between the buttons.
- Flush the buttons together by removing the border radius of the its children
  as needed.

```vue
<c-button-group size="sm" is-attached variant="outline">
  <c-button mr="-px">Save</c-button>
  <c-icon-button aria-label="Add to friends" icon="plus" />
</c-button-group>
```

## Accessibility

- `CButton` has `role` of `button`.
- When `CButton` has focus, <kbd>Space</kbd> or <kbd>Enter</kbd> activates it.

## Composition

Theming props passed into the `CButton` component (e.g. `variant`, `colorScheme`, etc.) are converted to style props. This means you can override any style of the `CButton` via type style props.

## Props

### Button Props

`CButton` composes the `CBox` component, so you can pass all its props.
These are props specific to the `CButton` component:

## Composition

All props you pass (`variant`, `colorScheme`, etc.) are converted to style
props. This means you can override any style of the Button via props.

```vue
<!--
  The size prop affects the height of the button.
  It can still be overriden by passing a custom height
-->
<c-button
  size="md"
  height="48px"
  width="200px"
  border="2px"
  border-color="green.500"
>
  Button
</c-button>
```

---

## Custom Button

In the event that you need to make your own custom button, you can leverage the
`CBox` component. It provides the `hover`, `focus`, `active` and `disabled` style
props to style the button.

```vue
<!-- Button from facebook.com -->
<c-box
  as="button"
  height="24px"
  line-height="1.2"
  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
  border="1px"
  px="8px"
  border-radius="2px"
  font-size="14px"
  font-weight="semibold"
  bg="#f5f6f7"
  border-color="#ccd0d5"
  color="#4b4f56"
  :_hover="{ bg: '#ebedf0' }"
  :_active="{
    bg: '#dddfe2',
    transform: 'scale(0.98)',
    borderColor: '#bec3c9',
  }"
  :_focus="{
    boxShadow:
      '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
  }"
>
  Join Group
</c-box>
```
## Props
### Button Props
| Name | Type | Description | Default |
| :---: | :---: | :---: | :---: |
|`colorScheme`|`"blue" | "cyan" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "teal" | "yellow" | "whiteAlpha" | "blackAlpha" | "linkedin" | "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram"`| Theme color scheme |`"gray"`|
|`iconSpacing`|`SystemProps["marginRight"]`| The space between the icon and the label | - |
|`iconSpacing` |	`SystemProps["marginRight"]` |	The space between the button icon and label. | - |
|`isActive` |	`boolean` |	If `true`, the button will be styled in its active state.	| - |
|`isDisabled` |	`boolean` |	If `true`, the button will be disabled. |	- |
|`isFullWidth` |	`boolean` |	If `true`, the button will take up the full width of its container.| - |
|`isLoading` |	`boolean` |	If `true`, the button will show a spinner.|	| - |
|`leftIcon` |	`string` |	If added, the button will show an icon before the button's label.	| - |
|`loadingText` |	`string` |	The label to show in the button when `isLoading` is true If no text is passed, it only shows the spinner	| - |
|`rightIcon` |	`string` |	If added, the button will show an icon after the button's label.	| - |
|`size` |	`"sm" | "md" | "lg" | "xs"` |		|`"md"` |
|`variant` |	`"link" | "outline" | "solid" | "ghost" | "unstyled"` |		| `"solid"` |

### Button Group Props

`CButtonGroup` composes the `CBox` component, so you can pass all its props.
These are props specific to the `CButtonGroup` component:

| Name | Type | Description | Default |
| :---: | :---: | :---: | :---: |
| `colorScheme` |	`"blue" | "cyan" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "teal" | "yellow" | "whiteAlpha" | "blackAlpha" | |"linkedin" | "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram"` |	Color Schemes for ButtonGroup are not implemented in the default theme. You can extend the theme to implement them.	|-|
| `isAttached` |	`boolean` |	If `true`, the borderRadius of button that are direct children will be altered to look flushed together	|-|
| `isDisabled` |	`boolean` |	If `true`, all wrapped button will be disabled |	-|
| `size` |	`"sm" | "md" | "lg" | "xs"`|		|-|
| `spacing` |	`SystemProps["marginRight"]`	The spacing between the buttons	| `'0.5rem'`|
| `variant` |	`"link" | "outline" | "solid" | "ghost" | "unstyled"` |	|