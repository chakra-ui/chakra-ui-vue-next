# @chakra-ui/c-form-control

Form control component is used to manage form controls such input fields checkbox and radio buttons it provides components and context that make your form fields accessible by default

## Installation

```sh
yarn add @chakra-ui/c-form-control
# or
npm i @chakra-ui/c-form-control
```

## Import component

```ts
import {
  CFormControl,
  CFormLabel,
  CFormErrorMessage,
  CFormHelperText,
  CFormErrorIcon,
} from "@chakra-ui/c-form-control"
```

## Basic Usage

The `CFormControl` component automatically provides the `id` for the input
component to be fully accessible.

### With Input
```vue
<template>
  <c-form-control>
    <!-- Will automatically get the "for" attribute -->
    <c-form-label> First name </c-form-label>
    <!-- Will automatically get the "id" and corresponding "aria-*" propertues -->
    <c-input placeholder="Enter your first name..." />
    <!-- Will automatically get `id` and hides if `isInvalid` is passed to `CFormControl` -->
    <c-form-helper-text> Keep it very short and sweet! </c-form-helper-text>
    <!-- Will automatically gets `id` and shows if `isInvalid` is passed to `FormControl` -->
    <c-form-error-message>
      <c-form-error-icon />
      Your first name is invalid
    </c-form-error-message>
  </c-form-control>
</template>
```

## Focus, Invalid and Disabled States

- When the `CInput` component receives focus, it notifies the `CFormControl` and
  adds `data-focus` on the `FormLabel`. Simply pass `_focus` to the `FormLabel`
  to style this state.

- If `isInvalid` is passed to the `CFormControl`, it notifies the `Input` and
  adds `data-invalid` to the `FormLabel` so you can change the styles of the
  label.

- If `isDisabled` is passed to the `CFormControl`, it makes the `Input` disabled,
  and adds `data-disabled` to the `CFormLabel` so you can change the styles of
  the label.

## Changing the required indicator

To change the required indicator beside the `CFormLabel`, use the `indicator` slot to swap out the rendered indicator.

```vue
<template>
  <c-form-control id="first-name" is-required>
    <c-form-label>
      First name
      <template v-slot:indicator> 📍 </template>
    </c-form-label>
    <c-form-helper-text> Keep it very short and sweet! </c-form-helper-text>
  </c-form-control>
</template>
```

## Adding a Visual Icon
<!-- TODO: -->
```vue
<template>
  <c-form-control id="first-name" is-required>
    <c-form-label>First name</c-form-label>
    <c-form-helper-text> Keep it very short and sweet! </c-form-helper-text>
  </c-form-control>
</template>
```