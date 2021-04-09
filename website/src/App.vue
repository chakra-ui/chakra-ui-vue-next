<template>
  <c-reset />
  <chakra.section :__css="rootStyles">
    <router-view />
  </chakra.section>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { CReset, useColorMode } from '@chakra-ui/vue-next'
import { useHead } from '@vueuse/head'

export default defineComponent({
  name: 'App',
  components: {
    CReset,
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

    const { colorMode } = useColorMode()
    const rootStyles = computed(() => {
      const styles = {
        light: {
          bg: 'light.bg',
          color: 'light.color',
        },
        dark: {
          bg: 'dark.bg',
          color: 'dark.color',
        },
      }

      return {
        ...styles[colorMode.value],
      }
    })

    return {
      colorMode,
      rootStyles,
    }
  },
})
</script>
