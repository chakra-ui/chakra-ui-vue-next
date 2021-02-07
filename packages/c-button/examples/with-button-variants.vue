<template>
  <c-button mr="3" variant="solid" color-scheme="teal"> Solid </c-button>
  <c-button mr="3" variant="outline" color-scheme="teal"> Outline </c-button>
  <c-button mr="3" variant="ghost" color-scheme="teal"> Ghost </c-button>
  <c-button mr="3" variant="link" color-scheme="teal"> Link </c-button>
</template>

<script lang="ts">
import { CButton } from '@chakra-ui/c-button/src'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CButton },
})
</script>
