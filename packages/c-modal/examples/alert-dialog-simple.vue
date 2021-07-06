<template>
  <chakra.div
    d="flex"
    justify-content="center"
    align-items="center"
    h="full"
    w="100%"
  >
    <c-button color-scheme="red" data-testid="open-modal" @click="open"
      >Delete customer</c-button
    >
    <!-- eslint-disable-next-line -->
    <c-alert-dialog v-model="isOpen" :least-destructive-ref="() => initialFocus">
      <c-alert-dialog-overlay />
      <c-alert-dialog-content>
        <c-alert-dialog-header>Delete Customer</c-alert-dialog-header>
        <c-alert-dialog-close-button data-testid="close-button" />
        <c-alert-dialog-body>
          Are you sure? You can't undo this action afterwards.
        </c-alert-dialog-body>

        <c-alert-dialog-footer>
          <c-button @click="close" mr="3" ref="initialFocus"> Cancel </c-button>
          <c-button id="initialFocus" color-scheme="red">Delete</c-button>
        </c-alert-dialog-footer>
      </c-alert-dialog-content>
    </c-alert-dialog>
  </chakra.div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const initialFocus = ref(null)

const isOpen = ref(false)
const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}
</script>
