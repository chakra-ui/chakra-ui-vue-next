<template>
  <chakra.th :bg="bg" fontWeight="semibold" p="2" fontSize="sm">
    <slot />
  </chakra.th>
</template>
<script setup lang="ts">
import { useColorModeValue } from '@chakra-ui/c-color-mode'

const bg = useColorModeValue('gray.50', 'whiteAlpha.100')
</script>
