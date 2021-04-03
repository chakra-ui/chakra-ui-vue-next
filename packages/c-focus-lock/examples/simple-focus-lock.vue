<template>
  <chakra.div :ref="content">
    <button color-scheme="teal" id="but" ref="initialFocus">Button 1</button>
    <button color-scheme="yellow">Button 2</button>
    <button color-scheme="blue">Button 3</button>
  </chakra.div>
</template>

<script lang="ts" setup>
import { useFocusLock } from './use-focus-trap'
import { ref } from 'vue'
const initialFocus = ref(null)

const { content } = useFocusLock()
</script>
