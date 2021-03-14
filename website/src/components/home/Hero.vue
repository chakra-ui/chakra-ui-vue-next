<template>
  <chakra.header pos="relative">
    <CFlex
      :px="[8, 8]"
      :py="10"
      :h="['auto', 'auto', '60vh']"
      align-items="center"
      justify-content="center"
    >
      <CFlex
        flex-dir="column"
        :align-items="['flex-start', 'center']"
        justify-content="center"
        :text-align="['left', 'center']"
        w="550px"
      >
        <CFlex
          :align-items="['flex-start', 'center']"
          :flex-dir="['column', 'row']"
        >
          <chakra.h1> Chakra V-UI Haki </chakra.h1>
          <CBadge
            color-scheme="green"
            variant="solid"
            font-size="0.9em"
            :ml="['0', '0', '2']"
            font-family="mono"
            rounded="md"
            text-transform="lowercase"
          >
            v1.0.0
          </CBadge>
        </CFlex>
        <h2>Build Accessible Vue (3) apps with Speed ⚡️</h2>
        <chakra.p mt="4" mb="6">
          Chakra UI Vue Next is a simple modular and accessible component
          library that gives you the building blocks to build Vue applications
          with speed.
        </chakra.p>
        <CFlex flex-dir="row">
          <CButton
            as="a"
            text-decoration="none"
            href="https://github.com/chakra-ui/chakra-ui-vue-next"
            left-icon="star"
            size="lg"
          >
            Get started
          </CButton>
          <CButton
            as="a"
            text-decoration="none"
            href="https://github.com/chakra-ui/chakra-ui-vue-next"
            left-icon="github"
            ml="4"
            variant="outline"
            color-scheme="blackAlpha"
            color="#2c3e50"
            size="lg"
          >
            Github
          </CButton>
        </CFlex>
      </CFlex>
    </CFlex>
  </chakra.header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CButton, CFlex, CBadge } from '@chakra-ui/vue-next'

export default defineComponent({
  name: 'Hero',
  components: {
    CButton,
    CFlex,
    CBadge,
  },
})
</script>
