<template>
  <!-- todo: skip-nav-link -->
  <!-- todo: ad-banner -->
  <app-header></app-header>
  <c-box as="main" class="main-content" w="full" maxW="8xl" mx="auto">
    <c-box :display="{ md: 'flex' }" h="100%">
      <slot name="sidebar"></slot>
      <c-box flex="1" minW="0" h="100%">
        <!-- todo: skip-nav-content -->
        <c-box id="content" px="5" mx="auto" minW="0" w="full" flex="1">
          <c-flex>
            <c-box
              minW="0"
              flex="auto"
              :px="{ base: '4', sm: '6', xl: '8' }"
              :pb="{ base: 24, lg: 16 }"
              pt="6"
            >
              <c-box maxW="48rem">
                <chakra.h1> {{ frontmatter.title }}</chakra.h1>
                <c-badge
                  v-if="frontmatter.version"
                  color-scheme="teal"
                  letter-spacing="wider"
                  >v{{ frontmatter.version }}</c-badge
                >
                <slot> Default Slots </slot>
                <c-box mt="40px">
                  <c-box>
                    <edit-page-link
                      :href="frontmatter.editUrl"
                    ></edit-page-link>
                  </c-box>
                  <slot name="pagination"></slot>
                </c-box>
                <c-box pb="20">
                  <app-footer />
                </c-box>
              </c-box>
            </c-box>
            <table-of-contents
              :visibility="headings.length === 0 ? 'hidden' : 'initial'"
              :headings="headings"
            />
          </c-flex>
        </c-box>
      </c-box>
    </c-box>
  </c-box>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import type { Heading } from '@/docs-theme/utils/get-headings'

// @ts-ignore
const props = defineProps<{
  frontmatter: {
    slug?: string
    title: string
    description?: string
    editUrl?: string
    version?: string
  }
  headings: Heading[]
}>()
</script>
