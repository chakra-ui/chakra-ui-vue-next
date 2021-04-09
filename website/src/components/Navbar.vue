<template>
  <chakra.nav
    h="60px"
    w="100%"
    :px="[4, 10, 12]"
    d="flex"
    position="fixed"
    align-items="center"
    shadow="sm"
    :bg="`${colorMode}.bg`"
    z-index="10"
    border-top="6px solid"
    border-color="vue.500"
  >
    <CFlex align-items="center" justify-content="flex-start" flex="1">
      <chakra.a
        aria-current="page"
        aria-label="Chakra UI Vue, Back to homepage"
        href="/"
        h="auto"
        d="flex"
        flex-direction="row"
        align-items="center"
      >
        <CBox w="45px" mr="2"><ChakraUILogoIcon /></CBox>
        <chakra.h1
          font-size="2xl"
          font-family="heading"
          letter-spacing="tighter"
          mt="8px"
          :d="{ base: 'none', md: 'block' }"
        >
          Chakra Chidori
        </chakra.h1>
      </chakra.a>
    </CFlex>
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
      <CBox as="li" mr="2" :d="{ base: 'none', sm: 'block' }">
        <CIconButton
          as="a"
          variant="ghost"
          variant-color="gray"
          aria-label="View GitHub"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/chakra-ui/chakra-ui-vue"
          icon="github"
        />
      </CBox>
      <CBox as="li" mr="2" :d="{ base: 'none', sm: 'block' }">
        <CIconButton
          as="a"
          variant="ghost"
          variant-color="gray"
          aria-label="View the documentation"
          href="/getting-started"
          icon="book"
        />
      </CBox>
      <CBox as="li" mr="2" :d="{ base: 'none', sm: 'block' }">
        <CIconButton
          as="a"
          variant="ghost"
          variant-color="gray"
          aria-label="Join Discord channel"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/chakra-ui/chakra-ui-vue"
          icon="message-circle"
        />
      </CBox>
      <CBox as="li" mr="2" :d="{ base: 'none', sm: 'block' }">
        <c-icon-button
          variant="ghost"
          variant-color="gray"
          @click="toggleColorMode"
          :aria-label="`Switch to ${
            colorMode === 'light' ? 'dark' : 'light'
          } mode`"
          :icon="colorMode === 'light' ? 'moon' : 'sun'"
        />
      </CBox>
      <CBox as="li">
        <CIconButton
          as="a"
          variant="ghost"
          variant-color="gray"
          aria-label="Open menu"
          target="_blank"
          rel="noopener noreferrer"
          href="https://discord.gg/sq2Kp6x"
          icon="menu"
        />
      </CBox>
    </CBox>
  </chakra.nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  CBox,
  CFlex,
  CIconButton,
  CIcon,
  useColorMode,
} from '@chakra-ui/vue-next'
import ChakraUILogoIcon from './ChakraLogoIcon.vue'

export default defineComponent({
  name: 'Navbar',
  components: {
    CBox,
    CFlex,
    CIconButton,
    CIcon,
    ChakraUILogoIcon,
  },
  setup() {
    const { colorMode, toggleColorMode } = useColorMode()

    return {
      colorMode,
      toggleColorMode,
    }
  },
})
</script>
