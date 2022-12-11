<template>
  <c-form-control id="name" is-required w="400px">
    <c-form-label> First name </c-form-label>
    <c-input :p="-2" id="name" placeholder="First Name" />
    <c-form-helper-text> Keep it very short and sweet! </c-form-helper-text>
    <c-form-error-message bg="unset">
      <c-form-error-icon />
      Your first name is invalid
    </c-form-error-message>
  </c-form-control>
  <chakra.aside bg="yellow.400"> </chakra.aside>
</template>

<script lang="tsx" setup>
import { chakra, CInput } from "@chakra-ui/vue-next"
</script>
