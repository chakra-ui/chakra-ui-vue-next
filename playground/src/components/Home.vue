<template>
  <div>Chakra UI Vue v1</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  mounted() {
    this.$nextTick(() => {
      this.$router.push('/c-alert/examples/base-alert')
    })
  }
})
</script>
