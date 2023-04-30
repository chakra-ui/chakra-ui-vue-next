<script setup lang="ts">
import { CStack, CHeading } from "@chakra-ui/vue-layout"
import { CCard, CCardHeader } from "../src"

const variantNames = ["elevated", "outline", "filled", "unstyled"]
</script>
<template>
  <c-stack>
    <c-card v-for="variant in variantNames" :key="variant" :variant="variant">
      <c-card-header>
        <c-heading size="md">{{ variant }}</c-heading>
      </c-card-header>
    </c-card>
  </c-stack>
</template>
