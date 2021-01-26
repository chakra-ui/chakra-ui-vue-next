<template>
  <c-alert status="info" mb="3"> Info alert </c-alert>
  <c-alert status="success" mb="3"> Success alert </c-alert>
  <c-alert status="warning" mb="3"> Warning alert </c-alert>
  <c-alert status="error" mb="3"> Error alert </c-alert>
</template>

<script lang="ts">
import { CAlert } from '@chakra-ui/c-alert/src'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WithStatusAlertExample',
  components: { CAlert },
})
</script>
