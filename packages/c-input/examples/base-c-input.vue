<template>
  <chakra.div>
    <c-v-stack>
      <chakra.div>value: {{ input }}</chakra.div>
      <pre>{{ input }}</pre>
      <c-input v-model="input" data-testid="input" />
    </c-v-stack>
  </chakra.div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { chakra } from "../../core"

const input = ref("hello")

function handleInput(val: Event) {
  console.log("input", val)
}
</script>
