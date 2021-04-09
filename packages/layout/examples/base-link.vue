<template>
  <chakra.div py="4">
    <chakra.h3>Link</chakra.h3>
    <chakra.div py="4">
      <!-- prettier-ignore -->
      <c-link as="router-link" to="/" pr="4" color="blue.400" color-scheme="red">CLink with as="router-link"</c-link>
      <c-link is-external href="/" color-scheme="red">CLink</c-link>
    </chakra.div>
  </chakra.div>
</template>
<script setup>
import { CLink } from '@chakra-ui/vue-layout'
</script>
