<template>
  <chakra.div>
    <c-v-stack>
      <chakra.div>value: {{ input }}</chakra.div>
      <pre>{{ input }}</pre>
      <c-input v-model="input" />
    </c-v-stack>
    <chakra.input
      v-model="input"
      @input="handleInput"
      placeholder="Raw input"
      type="text"
    />
  </chakra.div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { chakra } from "@chakra-ui/vue-next"

const input = ref("")

function handleInput(val: Event) {
  console.log("input", val)
}
</script>
