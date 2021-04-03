<template>
  <chakra.div
    :ref="content"
    p="4"
    border="4px dashed"
    rounded="lg"
    border-color="gray.400"
    d="inline-block"
  >
    <chakra.p mb="2">Inside focus trap</chakra.p>
    <c-button @click="enable" color-scheme="teal"> Button 1 </c-button>
    <c-button color-scheme="yellow" mx="2">Button 2</c-button>
    <c-button color-scheme="blue">Button 3</c-button>
  </chakra.div>
  <chakra.div
    p="4"
    border="4px dashed"
    rounded="lg"
    border-color="gray.400"
    mt="4"
    d="inline-block"
  >
    <chakra.p mb="2">Outside focus trap</chakra.p>
    <c-button @click="disable"> Deactivate </c-button>
  </chakra.div>
</template>

<script lang="ts">
import { useFocusLock } from './use-focus-trap'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const { content, enabled } = useFocusLock()

    const disable = () => {
      enabled.value = false
    }

    const enable = () => {
      enabled.value = true
    }

    return {
      content,
      enabled,
      enable,
      disable,
    }
  },
})
</script>
