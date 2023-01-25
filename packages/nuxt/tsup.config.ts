import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  target: "es2019",
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    }
  },
  jsxFactory: "h",
  format: ["esm", "cjs"],
  entry: {
    "chakra-ui-nuxt-next": "src/index.tsx",
  },
  keepNames: true,
})