<template>
  <c-grid
    as="header"
    :template-columns="{ base: '1fr', md: '1fr 1fr' }"
    pos="relative"
    bg="white"
    :bgGradient="{ base: '', md: 'linear(to-br, white, white, vue.100)' }"
    :min-h="{
      base: 'calc(100vh - 60px)',
      sm: 'auto',
      md: 'calc(100vh - 60px)',
    }"
    :px="[4, 10, 12]"
    :py="{ base: 10, sm: 20 }"
    gap="5"
  >
    <c-flex align="center" h="full">
      <c-stack spacing="6">
        <chakra.div>
          <chakra.h1
            maxW="16ch"
            :fontSize="{ base: '2.25rem', sm: '3rem', lg: '4rem' }"
            fontFamily="heading"
            letterSpacing="tighter"
            fontWeight="extrabold"
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
        >
          Chakra UI Vue Next is a simple modular and accessible component
          library that gives you the building blocks to build Vue applications
          with speed.
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
        <c-text font-weight="bold" vertical-align="center">
          👋 &nbsp; V1 (Chidori) is currently in experimental alpha.
          <c-link
            ml="1"
            color="gray.700"
            text-decoration="underline"
            to="https://www.notion.so/v1-Roadmap-e8c1387bcb4b4175a0a1720c797c3ddb"
            is-external
          >
            See roadmap <c-icon name="external-link"></c-icon>
          </c-link>
        </c-text>
      </c-stack>
    </c-flex>
    <c-flex justify="center" align="center" :mt="{ sm: '6', md: 0 }">
      <c-code
        px="5"
        py="4"
        border-radius="lg"
        color="whiteAlpha.900"
        bg="blackAlpha.800"
        font-weight="bold"
        shadow="search"
        :font-size="{ base: 'lg', md: '2xl' }"
      >
        {{ installCode }}
      </c-code>
    </c-flex>
    <!-- Will hide for now -->
    <!-- <chakra.a
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
    </chakra.a> -->
  </c-grid>
</template>

<script lang="ts">
// import { PrismEditor } from 'vue-prism-editor'
import { defineComponent } from 'vue'
import { CButton, CFlex } from '@chakra-ui/vue-next'

export default defineComponent({
  name: 'Hero',
  components: {
    CButton,
    CFlex,
    // PrismEditor,
  },
  setup() {
    const installCode = `yarn add @chakra-ui/vue-next`

    return {
      installCode,
    }
  },
})
</script>
