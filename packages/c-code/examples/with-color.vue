<template>
  <chakra.div>
    <c-code
      v-for="(color, i) in colorSchemes"
      :key="i"
      :color-scheme="color"
      ml="2"
    >
      {{ color }}
    </c-code>
  </chakra.div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const colorSchemes = ref([
  'gray',
  'green',
  'red',
  'yellow',
  'orange',
  'purple',
  'teal',
])
</script>
