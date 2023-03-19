import { existsSync, promises as fsp } from "fs"
import { resolve } from "pathe"
import type { ModuleMeta, NuxtModule } from "@nuxt/schema"
import { findExports } from "mlly"

export async function writeCJSStub(distDir: string) {
  const cjsStubFile = resolve(distDir, "module.cjs")
  if (existsSync(cjsStubFile)) {
    return
  }
  const cjsStub = `module.exports = function(...args) {
  return import('./module.mjs').then(m => m.default.call(this, ...args))
}
const _meta = module.exports.meta = require('./module.json')
module.exports.getMeta = () => Promise.resolve(_meta)
`
  await fsp.writeFile(cjsStubFile, cjsStub, "utf8")
}

export async function writeTypes(distDir: string, meta: ModuleMeta) {
  const dtsFile = resolve(distDir, "types.d.ts")
  if (existsSync(dtsFile)) {
    return
  }

  // Read generated module types
  const moduleTypesFile = resolve(distDir, "module.d.ts")
  const moduleTypes = await fsp
    .readFile(moduleTypesFile, "utf8")
    .catch(() => "")
  const typeExports = findExports(moduleTypes)
  const isStub = moduleTypes.includes("export *")

  const schemaShims: any[] = []
  const moduleImports: any[] = []

  const hasTypeExport = (name: string) =>
    isStub || typeExports.find((exp) => exp.names.includes(name))

  if (meta.configKey && hasTypeExport("ModuleOptions")) {
    moduleImports.push("ModuleOptions")
    schemaShims.push(
      `  interface NuxtConfig { ['${meta.configKey}']?: Partial<ModuleOptions> }`
    )
    schemaShims.push(
      `  interface NuxtOptions { ['${meta.configKey}']?: ModuleOptions }`
    )
  }
  if (hasTypeExport("ModuleHooks")) {
    moduleImports.push("ModuleHooks")
    schemaShims.push("  interface NuxtHooks extends ModuleHooks {}")
  }
  if (hasTypeExport("ModuleRuntimeConfig")) {
    moduleImports.push("ModuleRuntimeConfig")
    schemaShims.push("  interface RuntimeConfig extends ModuleRuntimeConfig {}")
  }
  if (hasTypeExport("ModulePublicRuntimeConfig")) {
    moduleImports.push("ModulePublicRuntimeConfig")
    schemaShims.push(
      "  interface PublicRuntimeConfig extends ModulePublicRuntimeConfig {}"
    )
  }

  const dtsContents = `
import { ${moduleImports.join(", ")} } from './module'
${
  schemaShims.length
    ? `declare module '@nuxt/schema' {\n${schemaShims.join("\n")}\n}\n`
    : ""
}
export { ${typeExports[0].names.join(", ")} } from './module'
`

  await fsp.writeFile(dtsFile, dtsContents, "utf8")
}
