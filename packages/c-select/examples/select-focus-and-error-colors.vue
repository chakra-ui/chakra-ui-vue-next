<script setup lang="ts">
import { CStack } from "@chakra-ui/vue-next"
import { CSelect } from "../src"
</script>

<template>
  <c-stack>
    <c-select
      focusBorderColor="lime"
      placeholder="Here is a sample placeholder"
    />
    <c-select
      focusBorderColor="pink.400"
      placeholder="Here is a sample placeholder"
    />
    <c-select
      isInvalid
      errorBorderColor="red.300"
      placeholder="Here is a sample placeholder"
    />
    <c-select
      isInvalid
      errorBorderColor="crimson"
      placeholder="Here is a sample placeholder"
    />
  </c-stack>
</template>
