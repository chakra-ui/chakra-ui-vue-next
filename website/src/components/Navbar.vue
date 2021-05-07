<template>
  <chakra.nav
    h="60px"
    w="100%"
    :px="[4, 10, 12]"
    d="flex"
    position="fixed"
    align-items="center"
    shadow="sm"
    bg="white"
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
        <CBox w="30px" mr="2"><ChakraUILogoIcon /></CBox>
        <chakra.h1
          font-size="xl"
          font-family="heading"
          line-height="1.2"
          letter-spacing="tighter"
          :d="{ base: 'none', md: 'block' }"
        >
          chakra-ui/vue-next
          <c-badge
            font-family="mono"
            font-size="0.5em"
            text-transform="lowercase"
            >{{ pkg.version }}</c-badge
          >
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
          href="https://github.com/chakra-ui/chakra-ui-vue-next"
          icon="github"
        />
      </CBox>
      <CBox as="li" mr="2" :d="{ base: 'none', sm: 'block' }">
        <CIconButton
          as="router-link"
          variant="ghost"
          variant-color="gray"
          aria-label="View the documentation"
          to="#"
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
          href="https://discord.gg/sq2Kp6x"
          icon="discord"
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
import ChakraUILogoIcon from './ChakraLogoIcon.vue'
import pkg from '../../../packages/core/package.json'

export default defineComponent({
  name: 'Navbar',
  components: {
    ChakraUILogoIcon,
  },
  setup() {
    return {
      pkg,
    }
  },
})
</script>
