---
to: packages/<%=h.changeCase.paramCase(name)%>/tsup.config.ts
---

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
  external: ["lodash.mergewith"],
  format: ["esm", "cjs"],
  entry: ["src/**/*.(ts|tsx)"],
  keepNames: true,
})
