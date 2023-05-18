<script setup lang="ts">
import { ref } from "vue"
import { CVStack } from "../../layout/index"
import { CRadio, CRadioGroup } from "../index"
import { RadioGroupContext } from "../src/radio-context"

const selectedVal = ref("")

const radioGroupRef = ref<RadioGroupContext>()
</script>
<template>
  <c-radio-group ref="radioGroupRef" v-model="selectedVal" v-slot="{ value }">
    <div>Current Value: {{ value }}</div>
    <c-v-stack>
      <c-radio value="opt-1">Option 1</c-radio>
      <c-radio value="opt-2">Option 2</c-radio>
      <c-radio value="opt-3">Option 3</c-radio>
    </c-v-stack>
  </c-radio-group>
  <button @click="() => radioGroupRef?.clearValue()">Clear</button>
</template>
