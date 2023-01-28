import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
  declaration: true,
  entries: [
    "src/module",
    { input: "src/runtime/", outDir: `dist/runtime`, ext: "mjs" },
  ],
  failOnWarn: false,
})
