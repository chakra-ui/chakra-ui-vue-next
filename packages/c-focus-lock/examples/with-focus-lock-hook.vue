<template>
  <chakra.div>
    <chakra.div
      :ref="lock"
      p="4"
      border="4px dashed"
      rounded="lg"
      border-color="gray.400"
      d="inline-block"
    >
      <chakra.p mb="2">Inside focus trap</chakra.p>
      <c-button @click="options.enabled = true" color-scheme="teal">
        Enable focus lock
      </c-button>
      <c-button :ref="initialFocus" color-scheme="yellow" mx="2"
        >Button 2</c-button
      >
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
      <c-button @click="options.enabled = false"> Deactivate </c-button>
      <c-button @click="options.enabled = true" ml="3" color-scheme="blue">
        Enable
      </c-button>
    </chakra.div>
    <chakra.pre> enabled: {{ options.enabled }} </chakra.pre>
  </chakra.div>
  <div :ref="lock" data-testid="focus-lock-container">
    <input data-testid="input" />
    <input />
    <input />
  </div>
</template>

<script lang="ts">
import { useFocusLock } from '@chakra-ui/c-focus-lock'
import { defineComponent, ref, reactive } from 'vue'
import { FocusLockOptions } from '../src'

export default defineComponent({
  setup() {
    const options: FocusLockOptions = reactive({
      enabled: true,
      escapeDeactivates: false,
      onActivate: () => {
        console.log('focus lock ENABLED')
      },
      onDeactivate: () => {
        console.log('focus lock DEACTIVATED')
      },
    })

    const { lock, initialFocus } = useFocusLock(options)

    return {
      lock,
      options,
      initialFocus,
    }
  },
})
</script>
