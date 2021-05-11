<template>
  <chakra.div
    :min-h="['auto', 'auto', '100vh']"
    w="100%"
    :bg="bg"
    :color="color"
  >
    <layout-mdx :frontmatter="frontmatter">
      <slot />
    </layout-mdx>
  </chakra.div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { useColorModeValue } from '@chakra-ui/c-color-mode'
const { path } = useRoute()

const rootPath = '/'
const blogPath = `${rootPath}blog`
const docsPath = `${rootPath}docs`
const isBlog = computed(() => path.startsWith(blogPath))
const isDocs = computed(() => path.startsWith(docsPath))
const props = defineProps<{ frontmatter: { title: string } }>()

const layoutMap = {
  blog: 'layout-mdx',
  guides: 'layout-mdx',
  docs: 'layout-mdx',
  changelog: 'layout-mdx',
  default: 'page-container',
}

const bg = useColorModeValue('white', 'gray.800')
const color = useColorModeValue('gray.700', 'whiteAlpha.900')
useHead({
  title: props.frontmatter.title,
})
</script>
