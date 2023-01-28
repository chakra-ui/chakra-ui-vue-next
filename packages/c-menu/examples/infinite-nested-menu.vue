<template>
  <c-menu aria-label="crud" @select="log">
    <c-menu-trigger>Click me</c-menu-trigger>
    <c-menu-list>
      <c-menu-item value="Add"
        ><chakra.span>A</chakra.span><chakra.span>dd</chakra.span></c-menu-item
      >
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
import { ref } from "vue"
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
} from "../src"
const log = (val) => console.log(val)
const menu = ref()

const openMenu = () => menu.value.open()
</script>
