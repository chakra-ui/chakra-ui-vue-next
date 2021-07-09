<template>
  <page-container :frontmatter="frontmatter" :headings="headings">
    <slot />
    <template #sidebar>
      <app-sidebar :routes="routes" />
    </template>
    <template #pagination>
      <app-pagination
        :previous="routeContext.prevRoute"
        :next="routeContext.nextRoute"
      ></app-pagination>
    </template>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { getHeadings } from '@/docs-theme/utils/get-headings'
import { getRoutes } from '@/docs-theme/utils/get-routes'
import { useRoute } from 'vue-router'
import { getRouteContext } from '@/docs-theme/utils/get-route-context'
import {
  findRouteByPath,
  removeFromLast,
} from '@/docs-theme/utils/find-route-by-path'

export default defineComponent({
  props: {
    frontmatter: {
      // prettier-ignore
      type: Object as PropType<{ title: string, slug: string }>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const { path } = useRoute()
    const routes = getRoutes(path)
    const headings = getHeadings(slots)

    const route = findRouteByPath(
      removeFromLast(props.frontmatter.slug, '#'),
      routes
    )
    const routeContext = getRouteContext(route, routes)

    return {
      headings,
      routes,
      routeContext,
    }
  },
})
</script>
