import { extendTheme } from "@chakra-ui/vue-next"

export default defineNuxtConfig({
  modules: ["@chakra-ui/nuxt-next"],
  chakra: {
    extendTheme: extendTheme({
      colors: {
        $brand: "#f5f",
      },
    }),
  },
})
