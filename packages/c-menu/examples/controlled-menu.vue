<script setup>
import { ref } from "vue"
import { CMenu, CMenuList, CMenuItem, CMenuTrigger } from "../src"

const menu = ref(null)
</script>
<template>
  <c-button color-scheme="purple" @click="menu.open()">Open menu</c-button>
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
