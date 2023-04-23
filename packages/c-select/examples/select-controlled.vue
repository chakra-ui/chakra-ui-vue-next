<script setup lang="ts">
import { ref } from "vue"
import { CSelect } from "../src"

const value = ref("Option 2")
</script>

<template>
  <div>Selected Value: {{ value }}</div>
  <c-select v-model="value" placeholder="Controlled select">
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
  </c-select>
</template>
