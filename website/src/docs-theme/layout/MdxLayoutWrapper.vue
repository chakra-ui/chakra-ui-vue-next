<template>
  <chakra.div
    :min-h="['auto', 'auto', '100vh']"
    w="100%"
    :bg="bg"
    :color="color"
  >
    <app-header :frontmatter="frontmatter" />
    <layout-docs v-if="isDocs">
      <slot />
    </layout-docs>
    <layout-blog v-else-if="isBlog">
      <slot />
    </layout-blog>
    <layout-default v-else class="default">
      <slot />
    </layout-default>
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

const bg = useColorModeValue('white', 'gray.800')
const color = useColorModeValue('gray.700', 'whiteAlpha.900')
useHead({
  title: props.frontmatter.title,
})
</script>
