<template>
  <c-reset />
  <!-- <router-view v-slot="{ Component, route }">
    <c-container px="0" :max-w="route.path === '/' ? 'auto' : '1440px'">
      <c-animate-presence type="scale">
      <component :is="Component" />
      </c-animate-presence>
    </c-container>
  </router-view> -->
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
