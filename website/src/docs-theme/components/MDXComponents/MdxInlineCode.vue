<template>
  <chakra.code apply="mdx.code" :color="color"><slot /></chakra.code>
</template>
<script setup lang="ts">
import { useColorModeValue } from "@chakra-ui/c-color-mode"

const color = useColorModeValue("purple.500", "purple.200")
</script>
