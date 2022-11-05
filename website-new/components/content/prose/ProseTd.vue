<script setup lang="ts">
import { chakra } from "@chakra-ui/vue-next"
</script>

<template>
  <chakra.td
    p="2"
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
  >
    <slot />
  </chakra.td>
</template>
