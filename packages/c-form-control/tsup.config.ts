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
  jsxFragmentFactory: "Fragment",
  format: ["esm", "cjs"],
  entry: {
    "chakra-ui-c-form-control": "src/index.tsx",
  },
  keepNames: true,
})