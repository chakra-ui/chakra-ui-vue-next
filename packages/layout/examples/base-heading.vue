<template>
  <c-container :center-content="false">
    <c-stack spacing="4">
      <c-heading as="h1" size="4xl" is-truncated>
        (4xl) In love with Vue & Vite & Nuxt
      </c-heading>
      <c-heading as="h2" size="3xl" is-truncated>
        (3xl) In love with Vue & Vite & Nuxt
      </c-heading>
      <c-heading as="h2" size="2xl">
        (2xl) In love with Vue & Vite & Nuxt
      </c-heading>
      <c-heading as="h2" size="xl">
        (xl) In love with Vue & Vite & Nuxt
      </c-heading>
      <c-heading as="h3" size="lg">
        (lg) In love with Vue & Vite & Nuxt
      </c-heading>
      <c-heading as="h4" size="md">
        (md) In love with Vue & Vite & Nuxt
      </c-heading>
      <c-heading as="h5" size="sm">
        (sm) In love with Vue & Vite & Nuxt
      </c-heading>
      <c-heading as="h6" size="xs">
        (xs) In love with Vue & Vite & Nuxt
      </c-heading>
    </c-stack>
  </c-container>
</template>
<script setup lang="ts">
import { CStack } from '@chakra-ui/vue-layout'
</script>
