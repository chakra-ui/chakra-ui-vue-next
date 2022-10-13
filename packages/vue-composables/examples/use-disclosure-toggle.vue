<template>
  <c-v-stack gap="4">
    <c-button @click="toggle">This is a button</c-button>
    <c-center h="4">
      <c-box :hidden="!isOpen">Toggled On with onToggle!</c-box>
    </c-center>
  </c-v-stack>
</template>
<script setup lang="ts">
import { useDisclosure } from "../src/use-disclosure"

const { toggle, isOpen } = useDisclosure()
</script>
