<script setup lang="ts">
import { CSimpleGrid } from "../../layout"
import { CRadio, CRadioGroup } from "../"
const range = Array.from(Array(10)).map((_, i) => i + 1)
</script>
<template>
  <c-radio-group value="1">
    <c-simple-grid as="div" :columns="2" :spacing="[2, 4, 6]">
      <c-radio v-for="num in range" :key="num" :value="`Option ${num}`">{{
        `Option ${num}`
      }}</c-radio>
    </c-simple-grid>
  </c-radio-group>
</template>
