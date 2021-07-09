<template>
  <chakra.div
    :min-h="['auto', 'auto', '100vh']"
    w="100%"
    :bg="bg"
    :color="color"
  >
    <layout-mdx
      :frontmatter="frontmatter"
      v-if="layoutComponent === 'layout-mdx'"
    >
      <slot />
    </layout-mdx>
    <page-container
      :frontmatter="frontmatter"
      v-if="layoutComponent === 'page-container'"
    >
      <slot />
    </page-container>
  </chakra.div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { useColorModeValue } from '@chakra-ui/c-color-mode'
const { path } = useRoute()

const props = defineProps<{ frontmatter: { title: string } }>()

const layoutMap = {
  blog: 'layout-mdx',
  guides: 'layout-mdx',
  docs: 'layout-mdx',
  changelog: 'layout-mdx',
  default: 'page-container',
}

// convert to dynamic import? maybe.
const layoutComponent = computed(() => {
  const layout = Object.entries(layoutMap).find(([layoutPath, _component]) =>
    String(path).startsWith(`/${layoutPath}`)
  )
  if (!layout) return layoutMap.default
  return layout[1]
})

const bg = useColorModeValue('white', 'gray.800')
const color = useColorModeValue('gray.700', 'whiteAlpha.900')
useHead({
  title: props.frontmatter.title,
})
</script>
