<template>
  <MDXProvider :components="components">
    <c-reset />
    <router-view />
  </MDXProvider>
</template>

<script setup lang="ts">
import { MDXProvider } from "@mdx-js/vue"
import { MdxComponents } from "./docs-theme/components/MdxComponents"

import { useHead } from "@vueuse/head"

const siteData = {
  title: "Chakra UI Vue Next + Vite",
  description: "Chakra UI Vue Next + Vite test",
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

const components = MdxComponents
</script>
