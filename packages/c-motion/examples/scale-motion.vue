<template>
  <chakra.div>
    <c-button @click="toggleIsOpen" mb="10"> Toggle Scale </c-button>

    <c-motion type="scale">
      <chakra.div
        bg="teal.100"
        px="4"
        py="4"
        font-weight="bold"
        rounded="md"
        shadow="lg"
        v-if="isMounted"
      >
        Fade component
      </chakra.div>
    </c-motion>
  </chakra.div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'

const [isMounted, toggleIsOpen] = useToggle(true)
</script>
