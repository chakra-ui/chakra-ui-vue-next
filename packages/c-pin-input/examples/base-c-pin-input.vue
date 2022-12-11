<template>
  <c-pin-input v-model="value">
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
