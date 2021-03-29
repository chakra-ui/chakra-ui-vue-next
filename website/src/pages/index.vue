<template>
  <Navbar />
  <chakra.main
    :min-h="['auto', 'auto', '100vh']"
    w="100%"
    pt="60px"
    bg="vue.50"
  >
    <Hero />
    <!-- width from 40vw to 300px & code to flex 1 -->
    <chakra.div
      w="100%"
      min-h="500px"
      mt="10"
      pos="relative"
      display="flex"
      :flex-direction="{ base: 'column', md: 'row' }"
    >
      <chakra.div w="calc(100% - 348px)" pl="12" pr="4">
        <chakra.div h="100%" w="100%" bg="black" shadow="md" />
      </chakra.div>
      <div class="example" :class="{ small: scrolled }">
        <chakra.div
          :w="{ base: '100%', md: '100%' }"
          top="-70%"
          right="5%"
          mr="12"
        >
          <AirbnbCardExample />
        </chakra.div>
      </div>
    </chakra.div>
    <PilersHero />
    <Footer />
  </chakra.main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Hero from '../components/home/Hero.vue'
import PilersHero from '../components/home/PilersHero.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/home/Footer.vue'
import AirbnbCardExample from '../components/home/AirbnbCardExample.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Hero,
    PilersHero,
    Navbar,
    Footer,
    AirbnbCardExample,
  },
  created() {
    if (!!window) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  setup() {
    const scrolled = ref(false)

    function handleScroll() {
      if (window.scrollY > 100) {
        scrolled.value = true
      } else {
        scrolled.value = false
      }
    }
    return {
      handleScroll,
      scrolled,
    }
  },
})
</script>

<style scoped>
.example {
  width: 40vw;
  top: -85%;
  right: 5%;
  position: absolute;
  transition: all 0.5s ease-in-out;
}

.example.small {
  width: 300px;
  margin-right: 48px;
  /* position: initial; */
  top: 0;
  right: 0;
  /* transition: width 1s ease-in-out; */
  transition: all 1s ease-in-out;
  /* transition: right 0.5s ease-in-out; */
}
</style>
