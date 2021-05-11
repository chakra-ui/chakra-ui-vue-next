<template>
  <page-container :frontmatter="frontmatter" :headings="headings">
    <slot />
    <template #sidebar>hello sidebar</template>
  </page-container>
</template>

<script lang="ts" setup>
const props = defineProps<{ frontmatter: { title: string } }>()
const headings = []
</script>
