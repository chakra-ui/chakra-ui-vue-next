<template>
  <chakra.div>
    <c-v-stack>
      <chakra.div>value: {{ input }}</chakra.div>
      <c-input @input="handleInput" v-model="input" />
    </c-v-stack>
    <c-v-stack>
      <chakra.div>value: {{ input }}</chakra.div>
      <c-input variant="filled" @input="handleInput" v-model="input" />
    </c-v-stack>
    <c-v-stack>
      <chakra.div>value: {{ input }}</chakra.div>
      <c-input
        variant="flushed"
        placeholder="Flushed"
        @input="handleInput"
        v-model="input"
      />
    </c-v-stack>
  </chakra.div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { chakra } from '@chakra-ui/vue-next'

const input = ref('')

function handleInput(val: Event) {
  console.log('input', val)
}
</script>
