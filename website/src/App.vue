<template>
  <c-reset />
  <router-view />
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { CReset } from '@chakra-ui/vue-next'
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
  },
})
</script>
