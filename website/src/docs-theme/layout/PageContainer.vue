<template>
  <!-- todo: skip-nav-link -->
  <!-- todo: ad-banner -->
  <app-header></app-header>
  <c-box as="main" class="main-content" w="full" maxW="8xl" mx="auto">
    <c-box :display="{ md: 'flex' }">
      <slot name="sidebar"></slot>
      <c-box flex="1" minW="0">
        <!-- todo: skin-nav-content -->
        <c-box id="content" px="5" mx="auto" minH="76vh">
          <c-flex>
            <c-box minW="0" flex="auto" :px="{ base: '4', sm: '6', xl: '8' }">
              <chakra.h1> {{ frontmatter.title }}</chakra.h1>
              <c-badge
                v-if="frontmatter.version"
                color-scheme="teal"
                letter-spacing="wider"
                >v{{ frontmatter.version }}</c-badge
              >
              <slot> Default Slots </slot>
              <c-box mt="40px">
                <c-box
                  ><edit-page-link :href="frontmatter.editUrl"></edit-page-link
                ></c-box>
                <slot name="pagination"></slot>
              </c-box>
              <c-box pb="20">
                <app-footer />
              </c-box>
            </c-box>
            <c-box>table of contents</c-box>
          </c-flex>
        </c-box>
      </c-box>
    </c-box>
  </c-box>
</template>
<script setup lang="ts">
import { defineProps } from 'vue-demi'

const props = defineProps<{
  frontmatter: {
    slug?: string
    title: string
    description?: string
    editUrl?: string
    version?: string
  }
  headings: any[]
}>()
</script>
