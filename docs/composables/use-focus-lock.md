# useFocusLock

The **`useFocusLock`** hook is an internal hook for Chakra UI Vue used to encapsulate `focus-trap` into an extendable composable hook.

This allows us to compose the behaviour required for focus trapping accessible dialogs and modals into a single hook and can be extended as a component

## Import

```bash
import { useFocusLock } from "@chakra-ui/c-focus-lock"
```

This composable accepts options to modify the positioning fo the popover as well as the modifiers of the popper. It returns an object of properties that can be used to bind the template refs to the popper instance

## Usage

```vue
<template>
  <chakra.div
    :ref="lock"
    p="4"
    border="4px dashed"
    rounded="lg"
    border-color="gray.400"
    d="inline-block"
  >
    <chakra.p mb="2">Inside focus trap</chakra.p>
    <c-button @click="options.enabled = true" color-scheme="teal">
      Enable focus lock
    </c-button>
    <c-button :ref="initialFocus" color-scheme="yellow" mx="2"
      >Button 2</c-button
    >
    <c-button color-scheme="blue">Button 3</c-button>
  </chakra.div>
</template>

<script lang="ts">
import { useFocusLock, FocusLockOptions } from '@chakra-ui/c-focus-lock'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const options: FocusLockOptions = reactive({
      enabled: true,
      onActivate: () => {
        console.log('focus lock ENABLED')
      },
      onDeactivate: () => {
        console.log('focus lock DEACTIVATED')
      },
    })

    const { lock, initialFocus } = useFocusLock(options)

    return {
      lock,
      options,
      initialFocus,
    }
  },
})
</script>


```

## Props
These are the options for the `usePopper` composable. These properties are similar to the options listed in the [@popperjs/core](https://popper.js.org/docs/v2/) documentation.
```ts
export interface FocusLockOptions {
  /**
   * Determines whether the focus lock is active or inactive
   * @default true
   */
  enabled: boolean
  /**
   * Invoked handler when focus-lock is activated
   */
  onActivate?: () => void
  /**
   * Invoked handler when focus-lock is deactivated
   */
  onDeactivate?: () => void
  /**
   * Invoked handler when focus-lock is activated.
   *
   * By default, an error will be thrown if the focus lock
   * contains no elements in its tab order. With this
   * option you can specify a fallback element to
   * programmatically receive focus if no other
   * tabbable elements are found.
   */
  fallbackFocus?: FocusTarget
  /**
   * Determines whether focus lock is activated when user clicks outside.
   * @default true
   */
  clickOutsideDeactivates?: boolean | ((e: MouseEvent) => boolean)
  persistentFocus?: boolean | ((e: MouseEvent) => boolean)
  /**
   * Determines whether to return focus to the previously focused element
   * before the focus-trap was activated, after the focus trap has been deactivated.
   */
  returnFocus?: boolean
  preventScroll?: boolean
  escapeDeactivates?: boolean
  delayInitialFocus?: boolean
}
```