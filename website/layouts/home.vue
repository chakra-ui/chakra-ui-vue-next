<script setup lang="ts">
import { chakra } from "@chakra-ui/vue-next"
import { useColorModeValue } from "@chakra-ui/c-color-mode"
import TheNavbar from "../components/TheNavbar.vue"

const bg = useColorModeValue("white", "gray.800")
const color = useColorModeValue("gray.700", "whiteAlpha.900")
</script>

<template>
  <chakra.div
    :bg="bg"
    :color="color"
    :min-h="['auto', 'auto', '100vh']"
    w="100%"
  >
    <TheNavbar />
    <slot />
  </chakra.div>
</template>
