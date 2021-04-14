<template>
  <chakra.div :min-h="['auto', 'auto', '100vh']" w="100%" pt="60px" bg="vue.50">
    <app-header :frontmatter="frontmatter" />
    <layout-docs style="border: 1px solid green" v-if="isDocs">
      <slot />
    </layout-docs>
    <layout-blog style="border: 1px solid red" v-else-if="isBlog">
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
const { path } = useRoute()
const rootPath = '/'
const blogPath = `${rootPath}blog`
const docsPath = `${rootPath}docs`
const isBlog = computed(() => path.startsWith(blogPath))
const isDocs = computed(() => path.startsWith(docsPath))
const props = defineProps<{ frontmatter: { title: string } }>()
useHead({
  title: props.frontmatter.title,
})
</script>
