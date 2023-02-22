import { defineConfig } from "tsup"
import EsbuildPluginJSX from "unplugin-vue-jsx/esbuild"

export default defineConfig({
  clean: true,
  target: "es2019",
  esbuildPlugins: [
    EsbuildPluginJSX({
      include: [/.[jt]sx?$/],
    }) as any,
  ],
  metafile: true,
  external: ["lodash.mergewith", "@chakra-ui/utils"],
  format: ["esm", "cjs"],
  entry: ["src/**/*.(ts|tsx)"],
  keepNames: true,
})
