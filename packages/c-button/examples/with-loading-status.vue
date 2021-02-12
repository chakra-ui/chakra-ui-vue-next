<template>
  <div>
    <c-button
      mr="3"
      :is-loading="isLoading"
      @click="doTask"
      color-scheme="teal"
    >
      Simple loading
    </c-button>

    <chakra.p mt="3">With loading text</chakra.p>

    <c-button
      mr="3"
      :is-loading="isLoading"
      @click="doTask"
      loading-text="Working..."
      color-scheme="teal"
    >
      Loading text button
    </c-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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
      }, 2000)
    }

    return {
      isLoading,
      doTask,
    }
  },
})
</script>
