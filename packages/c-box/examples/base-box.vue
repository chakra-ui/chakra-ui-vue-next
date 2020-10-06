<template>
  <div>
    <h2>Base Box</h2>
    <p>{{ val }}</p>
  </div>
</template>

<script lang="ts">
import CBox from '@chakra-ui/c-box'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const val = ref('Hello box')
    console.log('Base box setup ')
    return {
      val
    }
  }
})
</script>