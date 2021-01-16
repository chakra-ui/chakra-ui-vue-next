<template>
  <c-alert> HELLO ALERT </c-alert>
  <p>Alert paragraph</p>
</template>

<script lang="ts">
import CAlert from '@chakra-ui/c-alert/src'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CAlert },
})
</script>
