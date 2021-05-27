<template>
  <c-link :href="href" isExternal>
    <c-stack
      display="inline-flex"
      direction="row"
      spacing="1"
      align="center"
      opacity="0.7"
    >
      <c-icon name="edit" mr="1" />
      <chakra.span>Edit this page</chakra.span>
    </c-stack>
  </c-link>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

// @ts-ignore
const props = defineProps<{ href?: string }>()
</script>
