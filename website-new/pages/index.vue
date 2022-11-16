<template>
  <TheNavbar />
  <chakra.main :min-h="['auto', 'auto', '100vh']" w="100%" pt="60px" bg="white">
    <!-- <Hero /> -->
    <!-- <PilersHero /> -->
    <!-- <SandboxExample /> -->
    <!-- <DiscordHero /> -->
    <!-- <Footer /> -->
  </chakra.main>
</template>

<script lang="ts" setup>
import { chakra } from "@chakra-ui/vue-next"
import TheNavbar from "../components/TheNavbar.vue"

definePageMeta({
  layout: "home",
})
</script>
