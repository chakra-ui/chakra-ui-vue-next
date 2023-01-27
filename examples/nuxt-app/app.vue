<template>
  <c-h-stack
    display="flex"
    min-h="600px"
    justify-content="center"
    align-items="center"
  >
    <chakra.button
      @click="toggleColorMode"
      px="4"
      py="3"
      bg="red"
      color="white"
      font-weight="bold"
    >
      Click me to toggle | {{ colorMode }}
    </chakra.button>

    <chakra.button px="4" py="3" bg="$brand" font-weight="bold">
      Extended Component
    </chakra.button>
  </c-h-stack>
</template>

<script lang="ts" setup>
import { chakra, useColorMode } from "@chakra-ui/vue-next"

const { colorMode, toggleColorMode } = useColorMode()
</script>
