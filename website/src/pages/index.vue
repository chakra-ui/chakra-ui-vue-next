<template>
  <Navbar />
  <chakra.main
    :min-h="['auto', 'auto', '100vh']"
    w="100%"
    pt="60px"
    bg="vue.50"
  >
    <Hero />
    <PilersHero />
    <Footer />
  </chakra.main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hero from '../components/home/Hero.vue'
import PilersHero from '../components/home/PilersHero.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/home/Footer.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Hero,
    PilersHero,
    Navbar,
    Footer,
  },
})
</script>
