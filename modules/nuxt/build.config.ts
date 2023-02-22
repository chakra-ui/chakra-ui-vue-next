import { defineBuildConfig } from "unbuild"
import { writeCJSStub, writeTypes } from "./scripts/build"
import { resolve } from "pathe"
import { pathToFileURL } from "url"
import { NuxtModule } from "@nuxt/schema"
import { promises as fsp } from "fs"

export default defineBuildConfig({
  // If entries is not provided, will be automatically inferred from package.json
  entries: [
    "src/module",
    { input: "src/runtime/", outDir: `dist/runtime`, ext: "mjs" },
  ],
  rollup: {
    emitCJS: false,
    cjsBridge: true,
  },
  externals: [
    "@nuxt/schema",
    "@nuxt/schema-edge",
    "@nuxt/kit",
    "@nuxt/kit-edge",
    "nuxt",
    "nuxt-edge",
    "nuxt3",
    "vue",
    "vue-demi",
    "css-box-model",
    "framesync",
    "lodash.mergewith",
    "tiny-invariant",
  ],
  // Change outDir, default is 'dist'
  outDir: "dist",
  // Generates .d.ts declaration file
  declaration: true,
  failOnWarn: false,
  hooks: {
    async "rollup:done"(ctx) {
      // Generate CommonJS stup
      await writeCJSStub(ctx.options.outDir)

      // Load module meta
      const moduleEntryPath = resolve(ctx.options.outDir, "module.mjs")
      const moduleFn: NuxtModule<any> = await import(
        pathToFileURL(moduleEntryPath).toString()
      )
        .then((r) => r.default || r)
        .catch((err) => {
          console.error(err)
          console.error(
            "Cannot load module. Please check dist:",
            moduleEntryPath
          )
          return null
        })
      if (!moduleFn) {
        return
      }
      const moduleMeta = await moduleFn.getMeta!()

      // Enhance meta using package.json
      if (ctx.pkg) {
        if (!moduleMeta.name) {
          moduleMeta.name = ctx.pkg.name
        }
        if (!moduleMeta.version) {
          moduleMeta.version = ctx.pkg.version
        }
      }

      // Write meta
      const metaFile = resolve(ctx.options.outDir, "module.json")
      await fsp.writeFile(metaFile, JSON.stringify(moduleMeta, null, 2), "utf8")

      // Generate types
      await writeTypes(ctx.options.outDir, moduleMeta)
    },
  },
})
