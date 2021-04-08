<template>
  <chakra.div
    d="flex"
    justify-content="center"
    align-items="center"
    h="full"
    w="100%"
  >
    <c-button @click="isOpen = true">Open Modal</c-button>
    <!-- eslint-disable-next-line -->
    <c-modal v-model:is-open="isOpen">
      <c-modal-overlay />
      <c-modal-content>
        <chakra.div bg="white" rounded="md" p="10">
          <c-button> Hello, Modal! ⚡️ </c-button>
        </chakra.div>
      </c-modal-content>
    </c-modal>
  </chakra.div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>
