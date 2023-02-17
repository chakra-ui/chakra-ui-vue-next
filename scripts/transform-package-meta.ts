import consola from "consola"
import { IPackageJson } from "./types/package.json"
import { writeFileSync } from "fs"
import kebabCase from "lodash.kebabcase"
import { dirname } from "path"
import {
  getAllPackageJsons,
  TransformFunction,
  transformPackageJson,
} from "./utils"

const whitelistedPackages = {
  "@chakra-ui/styled-system": true,
  "@chakra-ui/utils": true,
  "@chakra-ui/theme": true,
  "@chakra-ui/theme-tools": true,
  "@chakra-ui/theme-utils": true,
  "@chakra-ui/nuxt-next": true,
}

async function writeTsupConfig(pkgPath: string) {
  return function processConfig(pkg: IPackageJson): IPackageJson {
    const content = `import { defineConfig } from "tsup"
import EsbuildPluginJSX from "unplugin-vue-jsx/esbuild"

export default defineConfig({
  clean: true,
  target: "es2019",
  outExtension({ format }) {
    return {
      js: \`.\${format}.js\`,
    }
  },
  esbuildPlugins: [
    // @ts-expect-error \`EsbuildPluginJSX\` does not extend \`tsup.Plugin\` type.
    EsbuildPluginJSX({
      include: [/\.[jt]sx?$/],
    }),
  ],
  format: ["esm", "cjs"],
  entry: {
    "${kebabCase(pkg.name)}": "src/index.tsx",
  },
  keepNames: true,
})
`
    const packageDirName = dirname(pkgPath)
    writeFileSync(`${packageDirName}/tsup.config.ts`, content, "utf-8")
    return pkg
  }
}

async function execute() {
  const files = await getAllPackageJsons()
  files.forEach(async (filePath) => {
    await transformPackageJson(filePath, await writeTsupConfig(filePath))
    await transformPackageJson(filePath, configureBuildScripts)
    await transformPackageJson(filePath, configureBuildTargets)
  })
}

const configureBuildTargets: TransformFunction = (pkg: IPackageJson) => {
  pkg.main = `dist/${kebabCase(pkg.name)}.cjs.js`
  pkg.module = `dist/${kebabCase(pkg.name)}.esm.mjs`

  pkg.exports["."].require = `./dist/${kebabCase(pkg.name)}.cjs.js`
  pkg.exports["."].default = `./dist/${kebabCase(pkg.name)}.esm.mjs`

  delete pkg.tsup
  consola.info(`pkg: ${pkg.name}`)
  return pkg
}

const configureBuildScripts: TransformFunction = (pkg: IPackageJson) => {
  pkg.scripts["build"] = "tsup && pnpm build:types"
  if (pkg.name === "@chakra-ui/vue-auto-import") {
    pkg.scripts["build:types"] = "echo: 'WIP exporting all types'"
  } else {
    pkg.scripts["build:types"] = "tsup src --dts-only"
  }
  pkg.scripts["build:fast"] = "tsup"
  pkg.scripts["dev"] = "tsup --watch"
  pkg.scripts["clean"] = "rimraf dist .turbo"
  pkg.scripts["types:check"] = "tsc --noEmit"
  return pkg
}

execute()
  .then(() => consola.success("Successfully transformed files"))
  .catch(consola.error)
