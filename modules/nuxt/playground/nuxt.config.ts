import ChakraUI from "../src/module"
import extendTheme from "./theme"

export default defineNuxtConfig({
  modules: [ChakraUI],
  chakra: {
    extendTheme,
  },
})
