import { defineNuxtConfig } from "nuxt/config"
import chakraModule from "../src/module"
import type * as NuxtSchema from "@nuxt/schema"

export default defineNuxtConfig({
  modules: [chakraModule],
})
