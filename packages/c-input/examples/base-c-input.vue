<template>
  <chakra.div>
    <c-input @input="handleInput" v-model="input" />
  </chakra.div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')

function handleInput(val: string) {
  console.log('input', val)
}
</script>
