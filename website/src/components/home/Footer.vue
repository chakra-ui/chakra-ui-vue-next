<template>
  <CFlex
    as="footer"
    flex-dir="column"
    font-family="body"
    justify-content="center"
    align-items="center"
    :py="[4, 10, 10]"
    bg="white"
    shadow="lg"
  >
    <chakra.p px="4">
      Designed and developed by the Chakra UI Vue core team.
    </chakra.p>
    <chakra.p px="4">
      Special thanks goes to these
      <chakra.a
        href="https://vue.chakra-ui.com/contributors"
        target="_blank"
        rel="noopener noreferrer"
        color="vue.600"
      >
        contributors
      </chakra.a>
      💚
    </chakra.p>
  </CFlex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CFlex } from '@chakra-ui/vue-next'

export default defineComponent({
  name: 'Footer',
  components: {
    CFlex,
  },
})
</script>
