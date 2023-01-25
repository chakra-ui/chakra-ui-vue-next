import { defineConfig } from "tsup"
// import pkg from "./package.json"
import kebabCase from "lodash.kebabcase"

export default defineConfig({
  outExtension({ format, options, pkgType }) {
    console.log("tsup::", { format, options, pkgType })
    return {
      js: `.${format}.js`,
    }
  },
  clean: true,
  target: "es2019",
  format: ["cjs", "esm"],
})
