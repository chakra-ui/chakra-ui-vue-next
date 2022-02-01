<template>
  <Navbar />
  <chakra.main :min-h="['auto', 'auto', '100vh']" w="100%" pt="60px" bg="white">
    <Hero />
    <PilersHero />
    <!-- <Features /> -->
    <SandboxExample />
    <DiscordHero />
    <Footer />
  </chakra.main>
</template>

<script lang="ts" setup>
import { chakra } from "@chakra-ui/vue-next"
import Hero from "../components/home/Hero.vue"
import PilersHero from "../components/home/PilersHero.vue"
import Navbar from "../components/Navbar.vue"
import Footer from "../components/home/Footer.vue"
import SandboxExample from "../components/home/SandboxExample.vue"
import DiscordHero from "../components/home/DiscordHero.vue"
</script>

<route lang="yaml">
meta:
  layout: home
</route>
