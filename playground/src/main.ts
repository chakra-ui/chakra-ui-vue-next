import { createApp } from 'vue'
import ChakraUIVuePlugin, { chakra, extendTheme } from '@chakra-ui/vue-next'
import { domElements } from '@chakra-ui/vue-system'
import { feActivity } from 'feather-icons-paths'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'

const app = createApp(App)
  .use(router)
  .use(MotionPlugin)
  .use(ChakraUIVuePlugin, {
    icons: {
      library: {
        feActivity
      }
    },
    extendTheme: extendTheme({
      config: {
        initialColorMode: 'light'
      }
    })
  })

domElements.forEach((tag) => {
  app.component(`chakra.${tag}`, chakra(tag))
})

app.mount('#app')