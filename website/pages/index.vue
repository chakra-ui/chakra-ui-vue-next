<script lang="ts" setup>
import { chakra, CHStack, CButton } from "@chakra-ui/vue-next"

definePageMeta({
  layout: "home",
})
</script>

<template>
  <chakra.main py="10">
    <c-h-stack max-w="8xl" mx="auto" px="4">
      <nuxt-link to="/getting-started" #="{ href, navigate }">
        <c-button
          as="a"
          :href="href"
          @click="navigate"
          color-scheme="emerald"
          right-icon="arrow-right"
          :_hover="{ textDecoration: 'none' }"
        >
          Get Started
        </c-button>
      </nuxt-link>
    </c-h-stack>
  </chakra.main>
</template>
