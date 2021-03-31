<template>
  <chakra.header
    pos="relative"
    bg="white"
    :bgGradient="{ base: '', md: 'linear(to-br, white, white, vue.100)' }"
    :min-h="{ base: 'auto', sm: '90vh' }"
    :pt="{ base: '3rem', sm: '150px' }"
    :px="[4, 10, 12]"
    :pb="{ base: '3rem', sm: '0' }"
    shadow="lg"
  >
    <chakra.div>
      <chakra.h1
        maxW="16ch"
        :fontSize="{ base: '2.25rem', sm: '3rem', lg: '4rem' }"
        fontFamily="heading"
        letterSpacing="tighter"
        fontWeight="extrabold"
        mb="16px"
        lineHeight="1.2"
      >
        Build accessible Vue apps
        <chakra.span color="vue.600" px="5px">with speed</chakra.span>
      </chakra.h1>
    </chakra.div>
    <chakra.p
      :maxW="{ base: '560px', lg: '650px' }"
      opacity="0.7"
      :fontSize="{ base: 'lg', lg: 'xl' }"
      mt="6"
      mb="10"
    >
      Chakra UI Vue Next is a simple modular and accessible component library
      that gives you the building blocks to build Vue applications with speed.
    </chakra.p>
    <CFlex
      flex-dir="row"
      :justify-content="{ base: 'center', sm: 'flex-start' }"
      mb="4"
    >
      <CButton
        as="a"
        text-decoration="none"
        href="https://github.com/chakra-ui/chakra-ui-vue-next"
        size="lg"
        target="_blank"
        rel="noopener noreferrer"
        color-scheme="green"
        bg="vue.600"
        :flex="{ base: '1', sm: 'none' }"
      >
        Get started
      </CButton>
      <CButton
        as="a"
        text-decoration="none"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/chakra-ui/chakra-ui-vue-next"
        left-icon="github"
        ml="4"
        variant="outline"
        color-scheme="green"
        size="lg"
        color="vue.600"
        :flex="{ base: '1', sm: 'none' }"
      >
        Github
      </CButton>
    </CFlex>
    <chakra.a
      href="https://chakra-ui.com/"
      target="_blank"
      rel="noopener noreferrer"
      text-decoration="none"
      font-size="sm"
      opacity="0.7"
      :_hover="{ color: 'vue.600', opacity: '1' }"
      mt="4"
    >
      Looking for the React.js version?
    </chakra.a>
  </chakra.header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CButton, CFlex } from '@chakra-ui/vue-next'

export default defineComponent({
  name: 'Hero',
  components: {
    CButton,
    CFlex,
  },
})
</script>
