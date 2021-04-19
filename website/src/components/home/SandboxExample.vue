<template>
  <chakra.div :mx="[0, 10, 12]" shadow="2xl" bg="white">
    <chakra.div pt="10" :px="{ base: '3', sm: '10' }">
      <chakra.h1
        maxW="16ch"
        :fontSize="{ base: '2.25rem', sm: '3rem', lg: '4rem' }"
        fontFamily="heading"
        letterSpacing="tighter"
        fontWeight="extrabold"
        mb="16px"
        lineHeight="1.2"
      >
        Less code.
        <chakra.span color="vue.600" px="5px">More speed.</chakra.span>
      </chakra.h1>
      <chakra.p
        :maxW="{ base: '560px', lg: '650px' }"
        opacity="0.7"
        :fontSize="{ base: 'lg', lg: 'xl' }"
        mt="6"
        mb="10"
      >
        Spend less time writing UI code and more time building a great
        experience for your customers.
      </chakra.p>
    </chakra.div>
    <chakra.iframe
      title="Chakra UI Vue Starter Template for Vue 2"
      src="https://codesandbox.io/embed/charka-ui-vue-chidori-airbnb-card-example-v3zi5?autoresize=1&codemirror=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      tabindex="0"
      width="100%"
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
