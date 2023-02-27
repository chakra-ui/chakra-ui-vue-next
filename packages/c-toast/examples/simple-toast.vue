<template>
  <c-stack>
    <c-h-stack>
      <c-button @click="notify" color-scheme="blue"> Toast </c-button>
      <c-button variant="outline" @click="dismissAll" color-scheme="blue">
        Dismiss All
      </c-button>
    </c-h-stack>
    <!-- <c-h-stack>
      <c-button @click="notifyStandAlone" color-scheme="green">
        Global Toast
      </c-button>
    </c-h-stack> -->
  </c-stack>
</template>

<script setup lang="ts">
import { inject, getCurrentInstance, watchEffect } from "vue"
import {
  createStandAloneToast,
  useToast,
  ToastContextSymbol,
} from "@chakra-ui/vue-next"
import sentence from "random-sentence"

const toast = useToast()

const bread = createStandAloneToast()

/**
 * - Normalize transition.
 */

function notify() {
  const t = toast.value.create({
    title: sentence({ min: 2, max: 3 }),
    description: sentence({ words: 8 }),
    type: "info",
    duration: 60000,
    placement: "bottom",
    // removeDelay: 100,
  })

  console.log("toast instance::", t)
}

// function notifyStandAlone() {
//   bread.create({
//     title: sentence({ min: 2, max: 3 }),
//     description: sentence({ words: 8 }),
//     type: "success",
//     duration: 3000,
//     placement: "top",
//   })
// }

function dismissAll() {
  toast.value.toasts.map((_t) => toast.value.dismiss(_t.state.context.id))
}
</script>
