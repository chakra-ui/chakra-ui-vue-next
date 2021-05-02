<template>
  <c-box :as="as" :apply="apply">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// @ts-ignore
// eslint-disable-next-line prettier/prettier
const props = defineProps<{ as?: string, apply?: string }>()
</script>
