<template>
  <c-stack>
    <chakra.div mb="3">
      <c-tag mr="3" size="sm" variant="solid"> Sample Tag </c-tag>
      <c-tag mr="3" size="md" variant="solid"> Sample Tag </c-tag>
      <c-tag mr="3" size="lg" variant="solid"> Sample Tag </c-tag>
    </chakra.div>

    <chakra.div>
      <c-tag mr="3" size="sm" colorScheme="teal" variant="subtle">
        Sample Tag
      </c-tag>
      <c-tag mr="3" size="md" colorScheme="teal" variant="subtle">
        Sample Tag
      </c-tag>
      <c-tag mr="3" size="lg" colorScheme="teal" variant="subtle">
        Sample Tag
      </c-tag>
    </chakra.div>

    <chakra.div>
      <c-tag mr="3" size="sm" colorScheme="purple" variant="outline">
        Sample Tag
      </c-tag>
      <c-tag mr="3" size="md" colorScheme="purple" variant="outline">
        Sample Tag
      </c-tag>
      <c-tag mr="3" size="lg" colorScheme="purple" variant="outline">
        Sample Tag
      </c-tag>
    </chakra.div>
  </c-stack>
</template>
<script setup>
import { CTag } from "../src"
</script>
