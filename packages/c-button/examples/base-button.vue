<template>
  <div>
    <c-button class="my-other-class"> Base button ◻️ </c-button>
  </div>
</template>

<script lang="ts">
import CButton from '@chakra-ui/c-button/src'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CButton },
})
</script>
