import { createChakra } from "@chakra-ui/vue-next"
import { createApp } from "vue"
import App from "./App.vue"

const chakra = createChakra({})

createApp(App).use(chakra).mount("#app")
