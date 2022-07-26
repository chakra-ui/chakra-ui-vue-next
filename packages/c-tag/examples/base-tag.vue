<template>
  <c-stack>
    <chakra.div mb="3">
      <c-tag mr="3" size="sm"> Sample Tag </c-tag>
      <c-tag mr="3" size="md"> Sample Tag </c-tag>
      <c-tag mr="3" size="lg"> Sample Tag </c-tag>
    </chakra.div>

    <chakra.div>
      <c-tag mr="3" size="sm" colorScheme="teal"> Sample Tag </c-tag>
      <c-tag mr="3" size="md" colorScheme="teal"> Sample Tag </c-tag>
      <c-tag mr="3" size="lg" colorScheme="teal"> Sample Tag </c-tag>
    </chakra.div>
  </c-stack>
</template>
<script setup>
import { CTag } from "../src"
</script>
