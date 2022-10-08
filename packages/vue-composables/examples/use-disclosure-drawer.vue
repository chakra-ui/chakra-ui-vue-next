<template>
  <c-button @click="onOpen">Open Drawer</c-button>
  <c-drawer placement="right" v-model="isOpen">
    <c-drawer-overlay />
    <c-drawer-content>
      <c-drawer-header borderBottomWidth="1px">Basic Drawer</c-drawer-header>
      <c-drawer-close-button @click="onClose" />
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

const { onOpen, onClose, isOpen } = useDisclosure()
</script>
