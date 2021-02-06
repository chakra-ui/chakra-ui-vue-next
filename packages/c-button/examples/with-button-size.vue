<template>
  <c-button mr="3" size="xs" color-scheme="teal"> Tiny button </c-button>
  <c-button mr="3" size="sm" color-scheme="teal"> Small button </c-button>
  <c-button mr="3" size="md" color-scheme="teal"> Medium button </c-button>
  <c-button mr="3" size="lg" color-scheme="teal"> Large button </c-button>
</template>

<script lang="ts">
import { CButton } from '@chakra-ui/c-button/src'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CButton },
})
</script>
