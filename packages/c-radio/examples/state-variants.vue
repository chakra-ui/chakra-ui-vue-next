<script setup lang="ts">
import { CVStack } from "../../layout/index"
import { CRadio, CRadioGroup } from "../index"
</script>
<template>
  <c-radio-group value="1">
    <c-v-stack>
      <c-radio value="hello">Hello</c-radio>
      <c-radio value="disabled" disabled>I'm disabled</c-radio>
      <c-radio value="readonly" read-only>I can only be read</c-radio>
    </c-v-stack>
  </c-radio-group>
</template>
