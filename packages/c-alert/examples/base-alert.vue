<template>
  <c-alert> HELLO ALERT </c-alert>
</template>

<script lang="ts">
import CAlert from '@chakra-ui/c-alert/src'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseAlertExample',
  components: { CAlert },
})
</script>
