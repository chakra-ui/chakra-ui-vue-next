<template>
  <c-alert status="info" mb="3">
    <c-alert-title> Info alert </c-alert-title>
    <c-alert-description> Something just happened </c-alert-description>
  </c-alert>
</template>

<script lang="ts">
import { CAlert, CAlertTitle, CAlertDescription } from '@chakra-ui/c-alert/src'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WithTitleExample',
  components: { CAlert, CAlertTitle, CAlertDescription },
})
</script>
