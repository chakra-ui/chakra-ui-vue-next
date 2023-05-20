<script setup lang="ts">
import { CStack, CHeading, CText } from "@chakra-ui/vue-layout"
import { CCardBody, CCard, CCardHeader } from "../src"

const sizeTokens = ["sm", "md", "lg"]
</script>
<template>
  <c-stack>
    <c-card v-for="size in sizeTokens" :key="size" :size="size">
      <c-card-header>
        <c-heading size="md">{{ size }}</c-heading>
      </c-card-header>
      <c-card-body>
        <c-text>size = {{ size }}</c-text>
      </c-card-body>
    </c-card>
  </c-stack>
</template>
