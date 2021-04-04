<template>
  <chakra.div :mx="[0, 10, 12]" :mt="[4, 10, 10]" shadow="lg">
    <chakra.iframe
      title="Chakra UI Vue Starter Template for Vue 2"
      src="https://codesandbox.io/embed/chakra-ui-vue-starter-template-for-vue-2-2sy0g?autoresize=1&codemirror=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      tabindex="0"
      width="100%"
      bg="white"
      height="600px"
    />
  </chakra.div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SandboxExample',
})
</script>
