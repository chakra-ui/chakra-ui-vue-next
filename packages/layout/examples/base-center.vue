<template>
  <c-v-stack align="start" spacing="4">
    <c-box>
      <c-box>Center</c-box>
      <c-center w="40px" h="40px" bg="tomato" color="white">
        <c-icon name="phone"></c-icon>
      </c-center>
    </c-box>
    <c-box>
      <c-box>Square</c-box>
      <c-square size="40px" bg="purple.700" color="white">
        <c-icon name="phone"></c-icon>
      </c-square>
    </c-box>
    <c-box>
      <c-box>Circle</c-box>
      <c-circle size="40px" bg="teal.700" color="white">
        <c-icon name="phone"></c-icon>
      </c-circle>
    </c-box>
  </c-v-stack>
</template>
<script setup>
import { CHStack, CVStack } from '@chakra-ui/vue-layout'
</script>
