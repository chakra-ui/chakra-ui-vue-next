<template>
  <c-form-control id="first-name" is-required w="400px">
    <c-form-label> First name </c-form-label>
    <c-input placeholder="First Name" />
    <c-form-helper-text> Keep it very short and sweet! </c-form-helper-text>
    <c-form-error-message>
      <c-form-error-icon />
      Your first name is invalid
    </c-form-error-message>
  </c-form-control>
</template>

<script lang="tsx" setup>
import { CInput } from './components'
</script>
