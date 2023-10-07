<template>
  <chakra.div py="4">
    <chakra.div py="4">
      <chakra.div>Stack Default</chakra.div>
      <c-stack spacing="4" divider>
        <chakra.div w="40px" h="40px" bg="yellow.200"> 1 </chakra.div>
        <chakra.div w="40px" h="40px" bg="tomato"> 2 </chakra.div>
        <chakra.div w="40px" h="40px" bg="pink.100"> 3 </chakra.div>
      </c-stack>
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
      <c-v-stack as="ul" spacing="2" align="stretch">
        <chakra.div h="40px" bg="yellow.200"> 1 </chakra.div>
        <chakra.div h="40px" bg="tomato"> 2 </chakra.div>
        <chakra.div h="40px" bg="pink.100"> 3 </chakra.div>
        <chakra.span></chakra.span>
      </c-v-stack>
    </chakra.div>
  </chakra.div>
</template>
<script lang="ts" setup>
import { CHStack, CVStack } from "../src"
import { chakra } from "../../system/src"
</script>
