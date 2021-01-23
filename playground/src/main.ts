import { createApp } from 'vue'
import ChakraUIVuePlugin from '@chakra-ui/vue-next'
import { domElements, chakra } from '@chakra-ui/system-vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
  .use(router)
  .use(ChakraUIVuePlugin, {})

domElements.forEach((tag) => {
  app.component(`chakra.${tag}`, chakra(tag))
})

app.mount('#app')