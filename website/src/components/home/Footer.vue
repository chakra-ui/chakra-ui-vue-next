<template>
  <CFlex
    as="footer"
    justify-content="center"
    align-items="center"
    :py="[4, 10, 10]"
    bg="white"
  >
    <chakra.a
      aria-label="View GitHub"
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/chakra-ui/chakra-ui-vue-next"
      :_hover="{ color: 'vue.500' }"
      mx="4"
    >
      <CIcon name="github" mt="8px" />
    </chakra.a>
    <chakra.a
      aria-label="View Twitter"
      target="_blank"
      rel="noopener noreferrer"
      href="https://twitter.com/chakraui_vue"
      :_hover="{ color: 'vue.500' }"
      mx="4"
    >
      <CIcon name="twitter" mt="8px" />
    </chakra.a>
    <chakra.a
      aria-label="Join Discord channel"
      target="_blank"
      rel="noopener noreferrer"
      href="https://discord.gg/sq2Kp6x"
      :_hover="{ color: 'vue.500' }"
      mx="4"
    >
      <CIcon name="discord" mt="8px" />
    </chakra.a>
  </CFlex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CFlex, CIcon } from '@chakra-ui/vue-next'

export default defineComponent({
  name: 'Footer',
  components: {
    CFlex,
    CIcon,
  },
})
</script>
