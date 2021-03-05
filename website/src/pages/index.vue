<template>
  <chakra.div
    h="100vh"
    w="100vw"
    bg-image="url(/src/assets/chakra-ui-logo.svg)"
    bg-pos="left"
    bg-repeat="no-repeat"
    bg-attachment="fixed"
    bg-size="cover"
  >
    <Hero />
  </chakra.div>
  <chakra.div h="500px" w="full"> Awesome stuff </chakra.div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hero from '../components/home/Hero.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Hero,
  },
})
</script>
