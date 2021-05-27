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
import docsSidebar from '@/config/docs-sidebar.json'
import guidesSidebar from '@/config/guides-sidebar.json'
import blogSidebar from '@/config/blog-sidebar.json'
import { getHeadings } from '@/docs-theme/utils/get-headings'
import { useRoute } from 'vue-router'

export function getRoutes(slug: string) {
  // for home page, use docs sidebat
  if (slug === '/') return docsSidebar.routes

  const configMap = {
    '/resources': docsSidebar,
    '/changelog': docsSidebar,
    '/guides': guidesSidebar,
    '/blog': blogSidebar,
    '/docs': docsSidebar,
  }

  const [_path, sidebar] =
    Object.entries(configMap).find(([path, _sidebar]) =>
      slug.startsWith(path)
    ) ?? []

  return sidebar?.routes ?? []
}

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
