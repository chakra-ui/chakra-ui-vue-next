<template>
  <CFlex
    as="footer"
    flex-dir="column"
    font-family="body"
    justify-content="center"
    align-items="center"
    :py="[4, 10, 10]"
    bg="white"
  >
    <chakra.p px="4">
      Designed and developed by the Chakra UI Vue core team.
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
