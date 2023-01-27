import { defineNuxtConfig } from "nuxt/config"
import chakraModule from "../src/module"
import type * as NuxtSchema from "@nuxt/schema"

export default defineNuxtConfig({
  ssr: true,
  modules: [chakraModule],
  // chakra: {
  //   extendTheme: {
  //     colors: {
  //       $brand: "#f5f",
  //     },
  //   },
  // },
})
