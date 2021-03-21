<template>
  <chakra.header
    pos="relative"
    :min-h="['auto', '100vh']"
    :pt="['3rem', '150px']"
  >
    <chakra.div>
      <chakra.h1
        maxW="16ch"
        :fontSize="['2.25rem', '3rem', '4rem']"
        fontFamily="heading"
        letterSpacing="tighter"
        fontWeight="extrabold"
        mb="16px"
        lineHeight="1.2"
      >
        Build accessible Vue apps
        <chakra.span color="green.500"> with speed </chakra.span>
      </chakra.h1>
    </chakra.div>
    <chakra.p
      maxW="560px"
      opacity="0.7"
      :fontSize="['lg', 'xl']"
      mt="6"
      mb="10"
    >
      Chakra UI Vue Next is a simple modular and accessible component library
      that gives you the building blocks to build Vue applications with speed.
    </chakra.p>
    <CFlex flex-dir="row">
      <CButton
        as="a"
        text-decoration="none"
        href="https://github.com/chakra-ui/chakra-ui-vue-next"
        size="lg"
        target="_blank"
        color-scheme="green"
      >
        Get started
      </CButton>
      <CButton
        as="a"
        text-decoration="none"
        target="_blank"
        href="https://github.com/chakra-ui/chakra-ui-vue-next"
        left-icon="github"
        ml="4"
        variant="outline"
        color-scheme="green"
        size="lg"
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
