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
        v-for="heading in headings || []"
        :key="heading.id"
        :title="heading.text"
        :pl="heading.level === 'h3' ? 4 : 2"
        rounded="md"
        transition="all 0.2s ease-in-out"
        position="relative"
        z-index="0"
        :sx="
          isActiveId(heading.id)
            ? {
                bg: mode('blackAlpha.50', 'whiteAlpha.50'),
                '&::before': {
                  content: `''`,
                  position: 'absolute',
                  top: '50%',
                  bottom: 0,
                  left: 0,
                  zIndex: 10,
                  h: '80%',
                  w: '3px',
                  borderRadius: '9999px',
                  bg: mode('blackAlpha.700', 'whiteAlpha.700'),
                  transform: 'translate(50%, -50%)',
                },
              }
            : {
                bg: 'transparent',
              }
        "
      >
        <chakra.a
          py="1"
          display="block"
          :fontWeight="isActiveId(heading.id) ? 'bold' : 'medium'"
          :href="`#${heading.id}`"
          :aria-current="isActiveId(heading.id) ? 'location' : undefined"
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
import { computed, defineProps } from "vue"
import { chakra, useColorModeValue } from "@chakra-ui/vue-next"
import { mode } from "@chakra-ui/vue-theme-tools"
import type { Heading } from "@/docs-theme/utils/get-headings"
import { useToc } from "../hooks/useToc"
import { useRoute } from "vue-router"
import { tryOnMounted } from "@vueuse/core"

// @ts-ignore
defineProps<{
  headings?: Array<Heading>
}>()
const { hash } = useRoute()
const { activeTocId: activeId, scrollToHash } = useToc()

const isActiveId = computed(() => (id: string) => id === activeId.value)
tryOnMounted(() => {
  scrollToHash(hash)
})
</script>
