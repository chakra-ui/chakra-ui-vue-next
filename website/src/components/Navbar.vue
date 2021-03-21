<template>
  <chakra.nav
    h="60px"
    w="100vw"
    px="4"
    d="flex"
    position="fixed"
    align-items="center"
    shadow="sm"
    bg="white"
    z-index="10"
  >
    <CFlex align-items="center" flex="1" />
    <CFlex flex="1" justify-content="center">
      <CIcon name="search" mt="8px" />
    </CFlex>
    <CBox
      as="ul"
      d="flex"
      flex="1"
      align-items="center"
      list-style-type="none"
      pt="8px"
      justify-content="flex-end"
    >
      <CBox as="li" mr="2">
        <CIconButton
          as="a"
          variant="ghost"
          variant-color="gray"
          aria-label="View the documentation"
          target="_blank"
          href="https://github.com/chakra-ui/chakra-ui-vue"
          icon="book"
        />
      </CBox>
      <CBox as="li" mr="2">
        <CIconButton
          as="a"
          variant="ghost"
          variant-color="gray"
          aria-label="Join Discord channel"
          target="_blank"
          href="https://discord.gg/sq2Kp6x"
          icon="message-circle"
        />
      </CBox>
      <CBox as="li" mr="2">
        <CIconButton
          as="a"
          variant="ghost"
          variant-color="gray"
          aria-label="Open menu"
          target="_blank"
          href="https://discord.gg/sq2Kp6x"
          icon="menu"
        />
      </CBox>
    </CBox>
  </chakra.nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CBox, CFlex, CIconButton, CIcon } from '@chakra-ui/vue-next'

export default defineComponent({
  name: 'Navbar',
  components: {
    CBox,
    CFlex,
    CIconButton,
    CIcon,
  },
})
</script>
