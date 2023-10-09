<template>
  <chakra.div py="4">
    <chakra.div py="4">
      <chakra.div>Stack Default</chakra.div>
      <CStack spacing="4" divider>
        <chakra.div w="40px" h="40px" bg="yellow.200"> 1 </chakra.div>
        <chakra.div w="40px" h="40px" bg="tomato"> 2 </chakra.div>
        <chakra.div w="40px" h="40px" bg="pink.100"> 3 </chakra.div>
      </CStack>
    </chakra.div>

    <chakra.div py="4">
      <chakra.div>Horizontal</chakra.div>
      <CHStack spacing="10">
        <chakra.div w="40px" h="40px" bg="yellow.200"> 1 </chakra.div>
        <chakra.div w="40px" h="40px" bg="tomato"> 2 </chakra.div>
        <chakra.div w="40px" h="40px" bg="pink.100"> 3 </chakra.div>
      </CHStack>
    </chakra.div>

    <chakra.div py="4">
      <chakra.div>Vertical</chakra.div>
      <CVStack spacing="2" align="stretch">
        <chakra.div h="40px" bg="yellow.200"> 1 </chakra.div>
        <chakra.div h="40px" bg="tomato"> 2 </chakra.div>
        <chakra.div h="40px" bg="pink.100"> 3 </chakra.div>
        <chakra.span></chakra.span>
      </CVStack>
    </chakra.div>

    <chakra.div py="4">
      <chakra.div>As prop UL</chakra.div>
      <CStack as="ul" spacing="2" align="stretch">
        <chakra.li w="40px" h="40px" bg="yellow.200"> 1 </chakra.li>
        <chakra.li w="40px" h="40px" bg="tomato"> 2 </chakra.li>
        <chakra.li w="40px" h="40px" bg="pink.100"> 3 </chakra.li>
      </CStack>
    </chakra.div>
  </chakra.div>
</template>

<script setup lang="ts">
import { chakra } from "../../system/src"
</script>
