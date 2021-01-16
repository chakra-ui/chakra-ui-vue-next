import { createApp } from 'vue'
import ChakraUIVuePlugin from '@chakra-ui/vue-next'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .use(ChakraUIVuePlugin, {})
  .mount('#app')
