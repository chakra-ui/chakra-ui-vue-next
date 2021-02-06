<template>
  <div>
    <c-button mr="3" color-scheme="blue"> Base button</c-button>
    <c-button mr="3" color-scheme="green"> Base button</c-button>
    <c-button mr="3" color-scheme="orange"> Base button</c-button>
    <c-button mr="3" color-scheme="pink"> Base button</c-button>
  </div>
</template>

<script lang="ts">
import { CButton } from '@chakra-ui/c-button/src'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CButton },
})
</script>
