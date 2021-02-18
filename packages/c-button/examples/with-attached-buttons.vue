<template>
  <chakra.div>
    <c-button-group
      shadow="xl"
      variant="outline"
      :color-scheme="color"
      is-attached
    >
      <c-button variant="solid">Save</c-button>
      <c-button>Cancel</c-button>
    </c-button-group>
  </chakra.div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const color = ref('yellow')
</script>
