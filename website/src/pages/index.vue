<template>
  <Navbar />
  <chakra.main
    :min-h="['auto', 'auto', '100vh']"
    w="100%"
    pt="60px"
    bg="green.50"
  >
    <Hero />
    <PilersHero />
  </chakra.main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hero from '../components/home/Hero.vue'
import PilersHero from '../components/home/PilersHero.vue'
import Navbar from '../components/Navbar.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Hero,
    PilersHero,
    Navbar,
  },
})
</script>
