<template>
  <code-block :live="isLive" :code="code" :language="language"></code-block>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import '../../css/night-owl.css'

export default defineComponent({
  props: {
    code: String,
    live: { type: [Boolean, String], default: false },
    language: String,
  },
  inheritAttrs: false,
  setup(props) {
    const isLive = computed(() => {
      if (props.live === 'false') return false
      const isTrue = props.live === true || props.live === 'true'
      return isTrue
    })
    return {
      isLive,
    }
  },
})
</script>
