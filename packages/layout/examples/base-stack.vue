<template>
  <chakra.div py="4">
    <chakra.div py="4">
      <chakra.div>Stack Default</chakra.div>
      <c-h-stack spacing="4" divider>
        <chakra.div w="40px" h="40px" bg="yellow.200"> 1 </chakra.div>
        <chakra.div w="40px" h="40px" bg="tomato"> 2 </chakra.div>
        <chakra.div w="40px" h="40px" bg="pink.100"> 3 </chakra.div>
      </c-h-stack>
    </chakra.div>

    <chakra.div py="4">
      <chakra.div>Horizontal</chakra.div>
      <c-h-stack spacing="10">
        <chakra.div w="40px" h="40px" bg="yellow.200"> 1 </chakra.div>
        <chakra.div w="40px" h="40px" bg="tomato"> 2 </chakra.div>
        <chakra.div w="40px" h="40px" bg="pink.100"> 3 </chakra.div>
      </c-h-stack>
    </chakra.div>

    <chakra.div py="4">
      <chakra.div>Vertical</chakra.div>
      <c-v-stack spacing="2" align="stretch">
        <chakra.div h="40px" bg="yellow.200"> 1 </chakra.div>
        <chakra.div h="40px" bg="tomato"> 2 </chakra.div>
        <chakra.div h="40px" bg="pink.100"> 3 </chakra.div>
      </c-v-stack>
    </chakra.div>
  </chakra.div>
</template>
<script setup>
import { CHStack, CVStack } from '@chakra-ui/vue-layout'
</script>
