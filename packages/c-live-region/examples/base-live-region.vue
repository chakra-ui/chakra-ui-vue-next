<template>
  <button @click="region.speak('Filtering categories was successful')">
    Click Me
  </button>
</template>
<script setup lang="ts">
import { useLiveRegion } from "../src/use-live-region"

const region = useLiveRegion()
</script>
