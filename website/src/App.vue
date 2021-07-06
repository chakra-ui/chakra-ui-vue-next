<template>
  <c-reset />
  <router-view
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0 }"
    :leave="{ opacity: 0, y: -100 }"
  />
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
