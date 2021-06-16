<template>
  <chakra.div h="inherit" overflow-y="scroll" overflow-x="hidden">
    <chakra.h1 text-align="center">Body scroll locking! Yeah!</chakra.h1>
    <c-flex justify="center" my="4">
      <c-button mr="3" color-scheme="red" @click="blockScroll = true"
        >Disable body scroll</c-button
      >
      <c-button color-scheme="green" @click="blockScroll = false"
        >Enable body scroll</c-button
      >
    </c-flex>

    <chakra.div>
      <chakra.h3 font-weight="bold" font-size="lg">Scroll target</chakra.h3>
      <c-scroll-lock
        border="3px solid"
        border-color="orange.500"
        height="200px"
        overflow-y="scroll"
        :enabled="blockScroll"
      >
        <chakra.p>
          {{ container }}
        </chakra.p>
      </c-scroll-lock>
    </chakra.div>

    <chakra.div mt="10">
      <chakra.h3 font-weight="bold" font-size="lg"
        >Main Body Content —
        <chakra.span font-size="md" font-weight="bold" color="red.400">
          {{ blockScroll ? 'Scroll Locked' : 'Scroll Unlocked' }}
        </chakra.span>
      </chakra.h3>
      <chakra.p>
        {{ main }}
      </chakra.p>
    </chakra.div>
  </chakra.div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { main, container } from './texts'

const blockScroll = ref(false)
</script>
