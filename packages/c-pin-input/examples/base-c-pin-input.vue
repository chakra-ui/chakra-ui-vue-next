<template>
  <c-pin-input v-model="value" spacing="1">
    <c-pin-input-field />
    <c-pin-input-field />
    <c-pin-input-field />
    <c-pin-input-field />
  </c-pin-input>
</template>
<script setup>
import { ref } from "vue"
import { CPinInput, CPinInputField } from "../src"
const value = ref(["1", "2"])
</script>
