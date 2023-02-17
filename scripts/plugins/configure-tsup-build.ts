import consola from "consola"
import { IPackageJson } from "../types/package.json"
import {
  TransformFunction,
  getAllPackageJsons,
  transformPackageJson,
} from "../utils"
import { dirname } from "node:path"
import { writeFileSync } from "fs-extra"

const logger = consola.withTag("configure-tsup-build")

async function writeTsupConfig(pkgPath: string) {
  return function processConfig(pkg: IPackageJson): IPackageJson {
    const content = `import { defineConfig } from "tsup"
import EsbuildPluginJSX from "unplugin-vue-jsx/esbuild"

export default defineConfig({
  clean: true,
  target: "es2019",
  esbuildPlugins: [
    EsbuildPluginJSX({
      include: [/.[jt]sx?$/],
    }) as any,
  ],
  format: ["esm", "cjs"],
  entry: ['src/**/*.(ts|tsx)'],
  keepNames: true,
})
`
    const packageDirName = dirname(pkgPath)
    writeFileSync(`${packageDirName}/tsup.config.ts`, content, "utf-8")
    return pkg
  }
}

const configureBuildTargets: TransformFunction = (pkg: IPackageJson) => {
  pkg.main = `dist/index.js`
  pkg.module = `dist/index.mjs`

  pkg.exports["."].require = `./dist/index.js`
  pkg.exports["."].default = `./dist/index.mjs`

  delete pkg.tsup
  consola.info(`pkg: ${pkg.name}`)
  return pkg
}

const whitelistedPackages = {
  "modules/nuxt": true,
}

async function configureTsupBuildConfig() {
  const packages = await getAllPackageJsons()
  packages
    .filter((p) => {
      const result = Object.keys(whitelistedPackages).filter(
        (name) => !p.includes(name)
      ).length
      return result
    })
    .forEach(async (filePath) => {
      await transformPackageJson(filePath, await writeTsupConfig(filePath))
      await transformPackageJson(filePath, configureBuildTargets)
    })
}

configureTsupBuildConfig()
  .then(() => logger.log("Done"))
  .catch(logger.error)
