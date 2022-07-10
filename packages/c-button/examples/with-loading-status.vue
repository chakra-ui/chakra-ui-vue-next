<template>
  <div>
    <c-button
      mr="3"
      :is-loading="isLoading"
      @click="doTask"
      color-scheme="teal"
      size="sm"
    >
      Simple loading
    </c-button>

    <chakra.p mt="3">With loading text</chakra.p>

    <c-button
      mr="3"
      :is-loading="isLoading"
      @click="doTask"
      loading-text="Working..."
      color-scheme="purple"
      size="lg"
    >
      Loading text button
    </c-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  setup() {
    const isLoading = ref(false)

    let loadingTimeout: any
    const doTask = () => {
      isLoading.value = true
      loadingTimeout = setTimeout(() => {
        isLoading.value = false
        console.log({ isLoading: isLoading.value })
        clearTimeout(loadingTimeout)
      }, 60000)
    }

    return {
      isLoading,
      doTask,
    }
  },
})
</script>
