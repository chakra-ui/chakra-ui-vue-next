<template>
  <chakra.div
    d="flex"
    justify-content="center"
    align-items="center"
    h="full"
    w="100%"
  >
    <c-button
      color-scheme="blue"
      data-testid="open-modal"
      @click="isOpen = true"
      >Open modal</c-button
    >
    <c-button ref="finalFocus" data-testid="final-focus" ml="3"
      >Other button</c-button
    >
    <!-- eslint-disable-next-line -->
    <c-modal v-model="isOpen" :initial-focus-ref="'#initialFocus'" :blockScrollOnMount="false" :final-focus-ref="() => $refs.finalFocus">
      <c-modal-overlay />
      <c-modal-content>
        <c-modal-header>Modal header</c-modal-header>
        <c-modal-close-button data-testid="close-button" />
        <c-modal-body>
          <chakra.p>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
            ullamco deserunt aute id consequat veniam incididunt duis in sint
            irure nisi.
          </chakra.p>
        </c-modal-body>

        <c-modal-footer>
          <c-button @click="isOpen = false" mr="3"> Close </c-button>
          <c-button id="initialFocus" ref="initialFocus"
            >Secondary action</c-button
          >
        </c-modal-footer>
      </c-modal-content>
    </c-modal>
  </chakra.div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
const finalFocus = ref()
const initialFocus = ref()
</script>
