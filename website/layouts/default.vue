<script setup lang="ts">
import { chakra, CHStack, CIcon } from "@chakra-ui/vue-next"
import { useColorModeValue } from "@chakra-ui/c-color-mode"
import TopNavigation from "~/components/navigation/top-navigation.vue"
import Sidebar from "~/components/navigation/sidebar.vue"
import { useContent } from "#imports"
import { useRoute } from "#app"
import { watchEffect } from "vue"
import TableOfContents from "~/components/navigation/table-of-contents.vue"

/**
 * Styling
 */
const color = useColorModeValue("gray.700", "white")
const bg = useColorModeValue("white", "gray.800")
const colorModeClass = useColorModeValue(undefined, "chakra-ui-dark")

const { path } = useRoute()
</script>

<template>
  <chakra.div
    :min-h="['auto', 'auto', '100vh']"
    w="100%"
    :color="color"
    :bg="bg"
    :class="colorModeClass"
  >
    <TopNavigation />
    <chakra.div max-w="8xl" mx="auto" d="flex">
      <!-- Sidebar Navigation -->
      <chakra.div
        :display="{ base: 'none', lg: 'block' }"
        position="fixed"
        z-index="30"
        bottom="0"
        top="6rem"
        left="max(0px, calc(50% - 45rem))"
        right="auto"
        width="19.5rem"
        pb="10"
        px="8"
        overflow-y="auto"
        overscroll-behavior="contain"
      >
        <sidebar />
      </chakra.div>
      <chakra.main
        :pl="{ lg: '19.5rem' }"
        pt="4"
        pb="24"
        :pr="{ xl: 16 }"
        class="chakra-prose"
      >
        <chakra.div :mr="{ xl: '15.5rem' }">
          <slot />

          <c-h-stack align-items="center" mt="6">
            <c-icon name="info" />
            <p>Edit this page on GitHub</p>
          </c-h-stack>
        </chakra.div>
        <table-of-contents />
      </chakra.main>
    </chakra.div>
  </chakra.div>
</template>
