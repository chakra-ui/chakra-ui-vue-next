<template>
  <div>
    <h2>Base Box</h2>
    <c-box>{{ val }}</c-box>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CBox from '../src'

export default defineComponent({
  components: { CBox },
  setup() {
    const val = ref('Hello box')
    console.log('Base box setup ')

    return { val }
  },
})
</script>
