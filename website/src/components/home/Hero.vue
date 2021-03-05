<template>
  <chakra.header pos="relative">
    <chakra.div
      d="flex"
      :px="[8, 8]"
      :py="10"
      :h="['auto', 'auto', '60vh']"
      align-items="center"
      justify-content="center"
    >
      <chakra.div
        d="flex"
        flex-dir="column"
        :align-items="['flex-start', 'center']"
        justify-content="center"
        :text-align="['left', 'center']"
        w="550px"
      >
        <h1>Chakra UI Vue Next</h1>
        <h2>Build Accessible Vue (3) apps with Speed ⚡️</h2>
        <chakra.p mt="4" mb="6">
          Chakra UI Vue Next is a simple modular and accessible component
          library that gives you the building blocks to build Vue applications
          with speed.
        </chakra.p>
        <chakra.div d="flex" flex-dir="row">
          <c-button
            as="a"
            text-decoration="none"
            href="https://github.com/chakra-ui/chakra-ui-vue-next"
            left-icon="star"
            size="lg"
          >
            Get started
          </c-button>
          <c-button
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
          </c-button>
        </chakra.div>
      </chakra.div>
    </chakra.div>
  </chakra.header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CButton } from '@chakra-ui/vue-next'

export default defineComponent({
  name: 'Hero',
  components: {
    CButton,
  },
})
</script>
