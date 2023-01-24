<template>
  <c-v-stack gap="4">
    <c-button v-bind="buttonProps">This is a button</c-button>
    <c-center h="4">
      <c-box v-bind="disclosureProps">Toggled On with Props!</c-box>
    </c-center>
  </c-v-stack>
</template>
<script setup lang="ts">
import { useDisclosure } from "../src/use-disclosure"

const { buttonProps, disclosureProps } = useDisclosure()
</script>
