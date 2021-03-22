<template>
  <chakra.header
    pos="relative"
    bg="white"
    :min-h="{ base: 'auto', sm: '90vh' }"
    :pt="{ base: '3rem', sm: '150px' }"
    :px="[4, 10, 12]"
    :pb="{ base: '3rem', sm: '0' }"
    borderBottom="1px solid"
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
        <chakra.span color="#35845E" px="5px">with speed </chakra.span>
      </chakra.h1>
    </chakra.div>
    <chakra.p
      maxW="560px"
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
    >
      <CButton
        as="a"
        text-decoration="none"
        href="https://github.com/chakra-ui/chakra-ui-vue-next"
        size="lg"
        target="_blank"
        rel="noopener noreferrer"
        color-scheme="green"
        bg="#35845E"
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
        color="#35845E"
      >
        Github
      </CButton>
    </CFlex>
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
