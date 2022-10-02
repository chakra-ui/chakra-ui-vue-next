<template>
  <c-stack>
    <c-alert status="info" mb="3" v-if="alertVisible">
      <c-alert-title> Change </c-alert-title>
      <c-alert-description>
        CPinInput value changed, new value : {{ value }}
      </c-alert-description>
    </c-alert>
    <c-alert status="success" mb="3" v-if="completed">
      <c-alert-title> Success </c-alert-title>
      <c-alert-description>
        CPinInput value completed. Value : {{ value }}</c-alert-description
      >
    </c-alert>
    <chakra.p>An alert will show on change and on complete</chakra.p>
    <c-pin-input @change="triggerChange" @complete="complete">
      <c-pin-input-field />
      <c-pin-input-field />
      <c-pin-input-field />
      <c-pin-input-field />
    </c-pin-input>
  </c-stack>
</template>
<script setup>
import { ref } from "vue"
import { CPinInput, CPinInputField } from "../src"
const alertVisible = ref(false)
const completed = ref(false)
const value = ref("")

const triggerChange = (result) => {
  console.log(result?.value)
  alertVisible.value = true
  const currentValue = result?.value?.filter((item) => item)
  if (currentValue?.length < 4) completed.value = false
  value.value = result?.value?.join("")
}

const complete = (details) => {
  completed.value = true
  value.value = details.valueAsString
}
</script>
