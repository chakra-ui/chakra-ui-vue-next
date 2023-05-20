import { createApp } from "vue"
import PerfectScrollbar from "vue3-perfect-scrollbar"
import { MotionPlugin } from "@vueuse/motion"
import App from "./App.vue"
import router from "./router"
import { chakra } from "./chakra"

console.log({ router })

const app = createApp(App)
  .use(router)
  .use(MotionPlugin)
  .use(chakra)
  .use(PerfectScrollbar)

app.mount("#app")
