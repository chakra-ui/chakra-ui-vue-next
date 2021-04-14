<template>
  <chakra.div py="4">
    <chakra.h3>Default Badge</chakra.h3>
    <c-badge> New ! </c-badge>
  </chakra.div>
  <chakra.div py="4">
    <chakra.h3>Outline Badges</chakra.h3>
    <c-badge
      v-for="(color, i) in colorSchemes"
      :key="i"
      :color-scheme="color"
      variant="outline"
      mr="2"
    >
      {{ color }}
    </c-badge>
  </chakra.div>
  <chakra.div py="4">
    <chakra.h3>Solid Badges</chakra.h3>
    <c-badge
      v-for="(color, i) in colorSchemes"
      :key="i"
      :color-scheme="color"
      variant="solid"
      mr="2"
    >
      {{ color }}
    </c-badge>
  </chakra.div>
  <chakra.div py="4">
    <chakra.h3>Subtle Badges</chakra.h3>
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
<script setup>
import { ref } from 'vue'

const colorSchemes = ref(['gray', 'green', 'red', 'orange', 'purple', 'teal'])
</script>
