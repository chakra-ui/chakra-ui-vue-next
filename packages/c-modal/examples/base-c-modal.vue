<template>
  <chakra.div
    d="flex"
    justify-content="center"
    align-items="center"
    h="full"
    w="100%"
  >
    <c-button @click="isOpen = true">Checkout</c-button>
    <!-- eslint-disable-next-line -->
    <c-modal v-model:is-open="isOpen">
      <c-modal-overlay />
      <c-modal-content>
        <chakra.div p="10">
          <c-button @click="isOpen = false">Hello, Modal! ⚡️</c-button>
        </chakra.div>
      </c-modal-content>
    </c-modal>
  </chakra.div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>
