<template>
  <c-alert
    font-weight="bold"
    px="4"
    py="3"
    bg="yellow.300"
    aria-role="alert"
    rounded="md"
  >
    HELLO ALERT
  </c-alert>
  <p>Alert paragraph</p>
</template>

<script lang="ts">
import CAlert from '@chakra-ui/c-alert/src'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseAlertExample',
  components: { CAlert },
})
</script>
