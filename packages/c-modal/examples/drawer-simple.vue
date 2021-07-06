<template>
  <c-button @click="toggleOpen">Open</c-button>
  <c-drawer v-model="isOpen">
    <c-drawer-overlay />
    <c-drawer-content>
      <div>This is the drawer content</div>
      <button @click="isOpen = false">This is a button</button>
    </c-drawer-content>
  </c-drawer>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'

const [isOpen, toggleOpen] = useToggle(false)
</script>
