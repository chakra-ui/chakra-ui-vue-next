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
  metafile: true,
  external: ["lodash.mergewith", "@chakra-ui/utils"],
  format: ["esm", "cjs"],
  entry: {
    "chakra-ui-vue-next-test-fixture": "src/index.tsx",
  },
  keepNames: true,
})
