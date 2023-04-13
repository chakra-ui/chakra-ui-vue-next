<script setup lang="ts">
import { CStack } from "@chakra-ui/vue-next"
import { CSelect } from "../src"
</script>

<template>
  <c-stack>
    <c-select
      v-for="size in ['xs', 'sm', 'md', 'lg']"
      :key="size"
      :placeholder="`${size} size`"
      :size="size"
    />
  </c-stack>
</template>
