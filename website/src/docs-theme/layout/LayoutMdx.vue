<template>
  <page-container :frontmatter="frontmatter" :headings="headings">
    <slot />
    <template #sidebar>
      <app-sidebar :routes="routes" />
    </template>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { getHeadings } from '@/docs-theme/utils/get-headings'
import { getRoutes } from '@/docs-theme/utils/get-routes'
import { useRoute } from 'vue-router'

export default defineComponent({
  props: {
    frontmatter: {
      type: Object as PropType<{ title: string }>,
    },
  },
  setup(props, { slots }) {
    const { path } = useRoute()
    const routes = getRoutes(path)
    const headings = getHeadings(slots)
    return {
      headings,
      routes,
    }
  },
})
</script>
