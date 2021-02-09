<template>
  <div>Chakra UI Vue v1</div>
</template>

<script>
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'
import { routes } from '../router'


export default defineComponent({
  mounted() {
    this.$nextTick(() => {
      this.$router.push('/c-alert/examples/base-alert')
    })
  }
})
</script>
