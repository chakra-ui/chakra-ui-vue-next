<template>
  <chakra.p>👇🏽 There's actually some visually hidden text here :) 😀 </chakra.p>
  <c-visually-hidden> Visually Hidden </c-visually-hidden>
</template>

<script lang="ts">
import { CVisuallyHidden } from '@chakra-ui/c-visually-hidden/src'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseCVisuallyHiddenExample',
  components: { CVisuallyHidden },
})
</script>
