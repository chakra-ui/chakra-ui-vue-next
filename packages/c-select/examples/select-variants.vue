<script setup lang="ts">
import { CStack } from "@chakra-ui/vue-next"
import { CSelect } from "../src"
</script>

<template>
  <c-stack>
    <c-select placeholder="Select option" variant="outline">
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </c-select>

    <c-select placeholder="Select option" variant="filled">
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </c-select>

    <c-select placeholder="Select option" variant="flushed">
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </c-select>

    <c-select placeholder="Select option" variant="unstyled">
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </c-select>
  </c-stack>
</template>
