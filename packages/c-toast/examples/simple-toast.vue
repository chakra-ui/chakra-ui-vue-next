<template>
  <c-stack>
    <c-h-stack>
      <c-button @click="notify" color-scheme="blue"> Toast </c-button>
      <c-button variant="outline" @click="dismissAll" color-scheme="blue">
        Dismiss All
      </c-button>
    </c-h-stack>
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
    type: "info",
    duration: 600000,
    placement: "bottom",
    // removeDelay: 100,
  })

  console.log("const t = ", t)
}
function dismissAll() {
  toast.value.toasts.map((_t) => toast.value.dismiss(_t.state.context.id))
}
</script>
