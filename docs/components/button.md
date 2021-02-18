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