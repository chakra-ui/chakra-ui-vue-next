<script setup>
import { CButton, CText, useColorMode } from "@chakra-ui/vue-next"

const { colorMode, toggleColorMode } = useColorMode()
</script>

<template>
  <main>
    <CButton @click="toggleColorMode">Hallo</CButton>
    <CText color="green">{{ colorMode }}</CText>
    <ContentDoc />
  </main>
</template>
