<template>
  <c-container>
    There are many benefits to a joint design and development system. Not only
    does it bring benefits to the design team, but it also brings benefits to
    engineering teams. It makes sure that our experiences have a consistent look
    and feel, not just in our design specs, but in production
  </c-container>
  <c-v-stack my="4">
    <c-container max-w="container.xl">Extra-Large Container</c-container>
    <c-container max-w="container.lg">Large Container</c-container>
    <c-container max-w="container.md">Medium Container</c-container>
    <c-container max-w="container.sm">Small Container</c-container>
  </c-v-stack>
</template>
<script setup>
import { CVStack } from '@chakra-ui/vue-layout'
</script>
