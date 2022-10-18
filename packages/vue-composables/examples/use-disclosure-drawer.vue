<template>
  <c-button @click="open">Open Drawer</c-button>
  <c-drawer placement="right" v-model="isOpen">
    <c-drawer-overlay />
    <c-drawer-content>
      <c-drawer-header borderBottomWidth="1px">Basic Drawer</c-drawer-header>
      <c-drawer-close-button @click="close" />
      <c-drawer-body>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </c-drawer-body>
    </c-drawer-content>
  </c-drawer>
</template>
<script lang="ts" setup>
import { useDisclosure } from "../src/use-disclosure"

const { open, close, isOpen } = useDisclosure()
</script>
