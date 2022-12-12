<template>
  <chakra.li>
    <nuxt-link :to="props.navItemPath">
      <chakra.a
        :aria-current="isCurrent ? 'page' : undefined"
        text-style="sidebarLink"
        :sx="{
          color: 'currentColor',
          position: 'relative',
          '&:after': {
            content: `''`,
            position: 'absolute',
            width: '100%',
            transform: 'scaleX(0)',
            height: '1px',
            top: '85%',
            left: 0,
            backgroundColor: 'currentColor',
            transformOrigin: 'bottom right',
            transition: 'transform .4s cubic-bezier(.86, 0, .07, 1)',
          },
          '&:hover::after': {
            transform: 'scaleX(1)',
            transformOrigin: 'bottom left',
          },
        }"
        :_hover="{
          textDecoration: 'none',
        }"
      >
        <slot />
      </chakra.a>
    </nuxt-link>
  </chakra.li>
</template>

<script lang="ts" setup>
import type { NavItem } from "@nuxt/content/dist/runtime/types"
import { computed } from "vue"
import { useRoute } from "vue-router"

const props = defineProps<{
  navItemPath: NavItem["_path"]
}>()

const route = useRoute()
const isCurrent = computed(() => route.path === props.navItemPath)
</script>
