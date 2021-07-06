<template>
  <c-reset />
  <router-view />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

const siteData = {
  title: 'Chakra UI Vue Next + Vite',
  description: 'Chakra UI Vue Next + Vite test',
}

useHead({
  title: siteData.title,
  meta: [
    {
      name: `description`,
      content: siteData.description,
    },
  ],
})
</script>
