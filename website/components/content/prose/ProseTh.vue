<script setup lang="ts">
import { chakra, useColorModeValue } from "@chakra-ui/vue-next"

const bg = useColorModeValue("gray.50", "whiteAlpha.100")
</script>

<template>
  <chakra.th :bg="bg" fontWeight="semibold" p="2" fontSize="sm">
    <slot />
  </chakra.th>
</template>
