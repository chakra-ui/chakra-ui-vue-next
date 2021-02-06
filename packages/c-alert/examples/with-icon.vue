<template>
  <c-alert variant="left-accent" status="info" mb="3">
    <c-alert-icon mr="2" />
    <c-alert-title> Info alert </c-alert-title>
    <c-alert-description> Something just happened </c-alert-description>
  </c-alert>
  <c-alert variant="left-accent" status="warning" mb="3">
    <c-alert-icon mr="2" />
    <c-alert-title> Warning alert </c-alert-title>
    <c-alert-description> Something just happened </c-alert-description>
  </c-alert>
  <c-alert variant="left-accent" status="success" mb="3">
    <c-alert-icon mr="2" />
    <c-alert-title> Success alert </c-alert-title>
    <c-alert-description> Something just happened </c-alert-description>
  </c-alert>
  <c-alert variant="left-accent" status="error" mb="3">
    <c-alert-icon mr="2" />
    <c-alert-title> Error alert </c-alert-title>
    <c-alert-description> Something just happened </c-alert-description>
  </c-alert>
</template>

<script lang="ts">
import {
  CAlert,
  CAlertIcon,
  CAlertTitle,
  CAlertDescription,
} from '@chakra-ui/c-alert/src'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WithIconAlertExample',
  components: { CAlert, CAlertIcon, CAlertTitle, CAlertDescription },
})
</script>
