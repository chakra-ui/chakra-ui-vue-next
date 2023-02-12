<script setup>
import {
  CMenu,
  CMenuList,
  CMenuItem,
  CMenuTrigger,
  CMenuGroup,
  CMenuDivider,
} from "../src"
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
