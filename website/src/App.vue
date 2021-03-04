<template>
  <c-reset />
  <chakra.img
    m="auto"
    h="150px"
    alt="Chakra UI Vue logo"
    src="/src/assets/chakra-logo.jpg"
  />
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
        <chakra.h1 font-size="2em" font-weight="bold">
          Chakra UI Vue Next
        </chakra.h1>
        <chakra.h2 font-size="1.5em" font-weight="bold">
          Build Accessible Vue (3) apps with Speed ⚡️
        </chakra.h2>
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
import { defineComponent, reactive, computed } from 'vue'
import { CReset, CButton } from '@chakra-ui/vue-next'
import { useHead } from '@vueuse/head'

export default defineComponent({
  name: 'App',
  components: {
    CReset,
    CButton,
  },
  setup() {
    const siteData = reactive({
      title: 'Chakra UI Vue Next + Vite',
      description: 'Chakra UI Vue Next + Vite test',
    })

    useHead({
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: computed(() => siteData.description),
        },
      ],
    })
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
