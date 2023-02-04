<template>
  <c-stack>
    <c-button @click="notify"> Toast </c-button>
  </c-stack>
</template>

<script setup lang="ts">
import { useToast } from "../src"

const toast = useToast()

/**
 * - Render the toast container imperatively (do not require consumer to manually import toast component).
 * - Provide `useToast` hook.
 * - Styles the toasts based in toast status.
 * - Normalize transition.
 */

function notify() {
  const t = toast.value.create({
    title: "Hey yo!",
    description: "Welcome to the world of bread!",
    duration: 20000,
  })

  console.log("t", t)
}
</script>
