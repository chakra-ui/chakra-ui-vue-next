<template>
  <c-stack>
    <c-button @click="notify"> Toast </c-button>
  </c-stack>
</template>

<script setup lang="ts">
import { useToast } from "../src"
import sentence from "random-sentence"

const toast = useToast()

/**
 * - Normalize transition.
 */

function notify() {
  const t = toast.value.create({
    title: sentence({ min: 2, max: 3 }),
    description: sentence({ words: 8 }),
    type: "success",
    duration: 100000,
  })
}
</script>
