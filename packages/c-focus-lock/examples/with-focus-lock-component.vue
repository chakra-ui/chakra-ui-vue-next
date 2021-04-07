<template>
  <chakra.div>
    <c-focus-lock
      p="4"
      border="4px dashed"
      rounded="lg"
      border-color="gray.400"
      d="inline-block"
      :is-disabled="isDisabled"
      @activate="handleActivate"
      @deactivate="handleDeactivate"
    >
      <chakra.div>
        <chakra.p mb="2">Inside focus trap</chakra.p>
        <c-button @click="isDisabled = false" color-scheme="teal">
          Enable focus lock
        </c-button>
        <c-button ref="initialFocus" color-scheme="yellow" mx="2"
          >Button 2</c-button
        >
        <c-button color-scheme="blue">Button 3</c-button>
      </chakra.div>
    </c-focus-lock>
    <chakra.div
      p="4"
      border="4px dashed"
      rounded="lg"
      border-color="gray.400"
      mt="4"
      d="inline-block"
    >
      <chakra.p mb="2">Outside focus trap</chakra.p>
      <c-button @click="isDisabled = true"> Deactivate </c-button>
      <c-button @click="isDisabled = false" ml="3" color-scheme="blue">
        Enable
      </c-button>
    </chakra.div>
    <chakra.pre> enabled: {{ !isDisabled }} </chakra.pre>
  </chakra.div>
</template>

<script lang="ts">
import { CFocusLock } from '@chakra-ui/c-focus-lock'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    CFocusLock,
  },
  setup() {
    const isDisabled = ref(false)

    const handleActivate = () => {
      console.log('focuslock activated')
    }

    const handleDeactivate = () => {
      console.log('focuslock deactivated')
    }

    return {
      isDisabled,
      handleActivate,
      handleDeactivate,
    }
  },
})
</script>
