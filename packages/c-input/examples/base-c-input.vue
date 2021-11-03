<template>
  <chakra.div>
    <c-v-stack>
      <chakra.div>value: {{ input }}</chakra.div>
      <c-input @input="handleInput" v-model="input" />
    </c-v-stack>
    <c-v-stack>
      <chakra.div>value: {{ input }}</chakra.div>
      <c-input @input="handleInput" v-model="input" />
    </c-v-stack>
    <c-v-stack>
      <chakra.div>value: {{ input }}</chakra.div>
      <c-input @input="handleInput" v-model="input" />
    </c-v-stack>
  </chakra.div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')

function handleInput(val: string) {
  console.log('input', val)
}
</script>
