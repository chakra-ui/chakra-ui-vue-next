<template>
  <c-stack>
    <c-button @click="notify"> Toast </c-button>
    <c-toast-container />
  </c-stack>
</template>

<script setup lang="ts">
import { CToast, $toast, CToastContainer } from "../src"

function notify() {
  $toast.value.create({
    title: "Hey yo!",
    description: "Welcome to the world of men!",
  })
}
</script>
