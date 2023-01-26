import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  target: "es2019",
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    }
  },
  format: ["esm", "cjs"],
  entry: {
    "chakra-ui-c-code": "src/index.tsx",
  },
  keepNames: true,
})
