import { defineConfig } from "tsup"
import EsbuildPluginJSX from "unplugin-vue-jsx/esbuild"

export default defineConfig({
  clean: true,
  target: "es2019",
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    }
  },
  esbuildPlugins: [
    // @ts-expect-error `EsbuildPluginJSX` does not extend `tsup.Plugin` type.
    EsbuildPluginJSX({
      include: [/.[jt]sx?$/],
    }),
  ],
  format: ["esm", "cjs"],
  entry: {
    "chakra-ui-c-scroll-lock": "src/index.tsx",
  },
  keepNames: true,
})
