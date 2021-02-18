<template>
  <chakra.div>
    <c-badge
      v-for="(color, i) in colorSchemes"
      :key="i"
      :color-scheme="color"
      variant="subtle"
      mr="2"
    >
      {{ color }}
    </c-badge>
  </chakra.div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const colorSchemes = ref(['gray', 'green', 'red', 'orange', 'purple', 'teal'])
</script>
