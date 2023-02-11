# @chakra-ui/c-menu

An accessible dropdown menu for the common dropdown menu button design pattern. Menu uses roving tabIndex for focus management.


## Installation

```sh
npm i @chakra-ui/c-menu
```

## Imports

This package exports the following components :

- `CMenu` : The wrapper component provides context, state, and focus management.
- `CMenuList` :  The wrapper for the menu items. Must be a direct child of `CMenu`.
- `CMenuTrigger`: The trigger for the menu list. Must be a direct child of `CMenu`.
- `CMenuItem`:  The trigger that handles menu selection. Must be a direct child of a `CMenuList`.
- `CMenuGroup` : A wrapper to group related menu items.
- `CMenuDivider` :  A wrapper to group related menu items.
- `CSubMenu` : The wrapper component for sub menus. This is similar to `CMenu`. Must be a direct child of `CMenuList`
- `CSubMenuList`: Wrapper for sub menu items. Must be a direct child of `CSubMenu`.
- `CSubMenuItem` : The trigger that handles sub menu selection. Similar to `CMenuItem`. Must be a direct child of `CSubMenuList`.
- `CSubMenuTrigger`: This renders as a sub menu item but behaves like a trigger to open a sub menu.

## Usage

```html
<script setup>
import { CMenu, CMenuList, CMenuItem, CMenuTrigger } from "@chakra-ui/c-menu"
</script>
<template>
  <c-menu>
    <c-menu-trigger>Open menu</c-menu-trigger>
    <c-menu-list>
      <c-menu-item>Add</c-menu-item>
      <c-menu-item>Remove</c-menu-item>
      <c-menu-item>Update</c-menu-item>
      <c-menu-item>Patch</c-menu-item>
    </c-menu-list>
  </c-menu>
</template>
```

### Accessing internal state 

To access internal state of a `CMenu`, use a `ref` on the menu to access it throught template ref.
You'll get access to `isOpen`, `open` and `close`. This will allow you to have a controlled usage of the component.

```html
<script setup>
import { ref } from "vue"
import { CMenu, CMenuList, CMenuItem, CMenuTrigger } from "@chakra-ui/c-menu"

const menu = ref(null)
</script>
<template>
  <c-button color-scheme="purple" @click="menu.open()">Trigger menu</c-button>
  <c-menu ref="menu">
    <c-menu-trigger>Open menu</c-menu-trigger>
    <c-menu-list>
      <c-menu-item>Add</c-menu-item>
      <c-menu-item>Remove</c-menu-item>
      <c-menu-item>Update</c-menu-item>
      <c-menu-item>Patch</c-menu-item>
    </c-menu-list>
  </c-menu>
</template>
```

### Customizing the trigger 

The default `CMenuTrigger` can be styled using the usual styled-system props, but it starts off plainly styled.

## Menu Group

To group related `CMenuItems`, use the `CMenuGroup` component and pass it a title for the group name.

```html
<script setup>
import {
  CMenu,
  CMenuList,
  CMenuItem,
  CMenuTrigger,
  CMenuGroup,
  CMenuDivider,
} from "@chakra-ui/c-menu"
</script>
<template>
  <c-menu>
    <c-menu-trigger>Open menu</c-menu-trigger>
    <c-menu-list>
      <c-menu-group group-title="Actions">
        <c-menu-item>Add</c-menu-item>
        <c-menu-item>Remove</c-menu-item>
        <c-menu-item>Update</c-menu-item>
        <c-menu-item>Patch</c-menu-item>
      </c-menu-group>
      <c-menu-divider></c-menu-divider>
      <c-menu-group group-title="Social">
        <c-menu-item>Discord</c-menu-item>
        <c-menu-item>Twitter</c-menu-item>
        <c-menu-item>Github</c-menu-item>
      </c-menu-group>
    </c-menu-list>
  </c-menu>
</template>
```

## Infinite Sub Menus

You can have as much as sub menus as you want. To achieve this, just use the `CSubMenu` component along with the `label` prop and respect the same architecture as the `CMenu`.

```html
<template>
  <c-menu aria-label="crud">
    <c-menu-trigger>Click me</c-menu-trigger>
    <c-menu-list>
      <c-menu-item value="Add">
        Add
      </c-menu-item>
      <c-menu-item>Remove</c-menu-item>
      <c-menu-divider></c-menu-divider>
      <c-sub-menu label="update">
        <c-sub-menu-trigger>Update &rarr;</c-sub-menu-trigger>
        <c-sub-menu-list>
          <c-sub-menu-item>Value 1</c-sub-menu-item>
          <c-sub-menu-item>Value 2</c-sub-menu-item>
          <c-sub-menu-item>Value 3</c-sub-menu-item>
          <c-sub-menu label="Value 4">
            <c-sub-menu-trigger>Value 4 &rarr;</c-sub-menu-trigger>
            <c-sub-menu-list>
              <c-sub-menu-item>SubValue 1</c-sub-menu-item>
              <c-sub-menu-item>SubValue 2</c-sub-menu-item>
              <c-sub-menu-item>SubValue 3</c-sub-menu-item>
              <c-sub-menu label="SubValue 4">
                <c-sub-menu-trigger>SubValue 4 &rarr;</c-sub-menu-trigger>
                <c-sub-menu-list>
                  <c-sub-menu-item>SubSubValue 1</c-sub-menu-item>
                  <c-sub-menu-item>SubSubValue 2</c-sub-menu-item>
                  <c-sub-menu-item>SubSubValue 3</c-sub-menu-item>
                </c-sub-menu-list>
              </c-sub-menu>
            </c-sub-menu-list>
          </c-sub-menu>
        </c-sub-menu-list>
      </c-sub-menu>
    </c-menu-list>
  </c-menu>
</template>
<script setup>
import {
  CMenu,
  CMenuList,
  CMenuTrigger,
  CMenuItem,
  CSubMenu,
  CMenuDivider,
  CSubMenuTrigger,
  CSubMenuList,
  CSubMenuItem,
  CMenuGroup,
} from "@chakra-ui/c-menu"
</script>
```




