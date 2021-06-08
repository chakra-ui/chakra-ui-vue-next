<template>
  <CBox
    as="nav"
    aria-labelledby="toc-title"
    width="16rem"
    flexShrink="0"
    :display="{ base: 'none', xl: 'block' }"
    position="sticky"
    pt="2"
    pb="10"
    pr="4"
    top="6rem"
    right="0"
    fontSize="sm"
    alignSelf="start"
    maxHeight="calc(100vh - 8rem)"
    overflowY="auto"
    :sx="{ overscrollBehavior: 'contain' }"
    v-bind="$attrs"
  >
    <CText
      as="h2"
      id="toc-title"
      textTransform="uppercase"
      fontWeight="bold"
      fontSize="xs"
      :color="useColorModeValue('gray.700', 'gray.400').value"
      letterSpacing="wide"
    >
      On this page
    </CText>
    <COrderedList spacing="1" ml="0" mt="4" styleType="none">
      <CListItem
        v-for="heading in headings"
        :key="heading.id"
        :title="heading.text"
        :ml="heading.level === 'h3' ? '4' : undefined"
      >
        <chakra.a
          py="1"
          display="block"
          :fontWeight="heading.id === activeId ? 'bold' : 'medium'"
          :href="`#${heading.id}`"
          :aria-current="heading.id === activeId ? 'location' : undefined"
          :color="useColorModeValue('gray.600', 'gray.400').value"
          :_hover="{
            color: useColorModeValue('gray.900', 'gray.200').value,
          }"
        >
          {{ heading.text }}
        </chakra.a>
      </CListItem>
    </COrderedList>
  </CBox>
</template>
<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import { useColorModeValue } from '@chakra-ui/vue-next'
import type { Heading } from '@/docs-theme/utils/get-headings'
import { useToc } from '../hooks/useToc'
import { useRoute } from 'vue-router'
import { tryOnMounted } from '@vueuse/core'

// @ts-ignore
const props = defineProps<{
  headings?: Array<Heading>
}>()
const { hash } = useRoute()
const { activeTocId: activeId, scrollToHash } = useToc()

tryOnMounted(() => {
  scrollToHash(hash)
})
</script>
