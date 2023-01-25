import consola from "consola"
import glob from "glob-promise"
import { IPackageJson } from "./types/package.json"
import { readFileSync, writeFileSync } from "fs"
import kebabCase from "lodash.kebabcase"
import { defineConfig } from "tsup"
import { dirname } from "path"

async function getAllPackageJsons() {
  const packageJsonFiles = await glob("**/tooling/**/package.json", {
    nobrace: true,
  }).then((f) =>
    f.filter(
      (path) =>
        !path.includes("node_modules") && !path.includes("tsconfig.json")
    )
  )
  consola.info(
    `Found ${packageJsonFiles.length} package files... Applying transform`,
    packageJsonFiles
  )
  return packageJsonFiles
}

type TransformFunction = (file: IPackageJson) => IPackageJson

async function transformFile(path: string, transformer: TransformFunction) {
  const file = await readFileSync(path, "utf8")
  const transformedFileContent = transformer(JSON.parse(file))
  await writeFileSync(
    path,
    JSON.stringify(transformedFileContent, null, 2),
    "utf-8"
  )
}

const whitelistedPackages = {
  "@chakra-ui/styled-system": true,
  "@chakra-ui/utils": true,
  "@chakra-ui/theme": true,
  "@chakra-ui/theme-tools": true,
  "@chakra-ui/theme-utils": true,
}

async function writeTsupConfig(pkgPath: string) {
  return function processConfig(pkg: IPackageJson): IPackageJson {
    const content = `import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  target: "es2019",
  outExtension({ format }) {
    return {
      js: \`.\${format}.js\`,
    }
  },
  jsxFactory: "h",
  jsxFragmentFactory: "Fragment",
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

async function writeRollupConfig(pkgPath: string) {
  return function processConfig(pkg: IPackageJson): IPackageJson {
    const name = kebabCase(pkg.name)
    const content = `import multi from "@rollup/plugin-multi-entry"
import esbuild from "rollup-plugin-esbuild"
import kebabCase from "lodash.kebabcase"

const name = "${name}"

const bundle = (config) => ({
  ...config,
  input: ["src/**/*.tsx", "src/**/*.ts"],
  external: (id) => !/^[./]/.test(id),
})

/**
 * @type {import('rollup').RollupOptions[]}
 */
const RollupConfig = [
  bundle({
    plugins: [multi(), esbuild()],
    output: [
      {
        file: \`./dist/${name}.cjs.js\`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: \`./dist/${name}.esm.js\`,
        format: "es",
        sourcemap: true,
      },
    ],
  }),
]

export default RollupConfig
`
    const packageDirName = dirname(pkgPath)
    writeFileSync(`${packageDirName}/rollup.config.mjs`, content, "utf-8")
    return pkg
  }
}

async function execute() {
  const files = await getAllPackageJsons()
  files.forEach(async (filePath) => {
    await transformFile(filePath, await writeTsupConfig(filePath))
    await transformFile(filePath, await writeRollupConfig(filePath))
    await transformFile(filePath, configureBuildScripts)
    // await transformFile(filePath, configureBuildTargets)
  })
}

const configureBuildTargets: TransformFunction = (pkg: IPackageJson) => {
  pkg.main = `dist/${kebabCase(pkg.name)}.cjs.js`
  pkg.module = `dist/${kebabCase(pkg.name)}.esm.js`

  pkg.exports["."].require = `./dist/${kebabCase(pkg.name)}.cjs.js`
  pkg.exports["."].default = `./dist/${kebabCase(pkg.name)}.esm.js`

  consola.info(`pkg: ${pkg.name}`)

  return pkg
}

const configureBuildScripts: TransformFunction = (pkg: IPackageJson) => {
  pkg.scripts["build"] = "tsup && pnpm build:types"
  pkg.scripts["build:types"] = "tsup src --dts-only"
  pkg.scripts["build:rollup"] = "rollup -c && pnpm build:types"
  pkg.scripts["build:fast"] = "tsup"
  pkg.scripts["dev"] = "tsup --watch"
  pkg.scripts["clean"] = "rimraf dist .turbo"
  pkg.scripts["types:check"] = "tsc --noEmit"
  return pkg
}

const configureLocalWorkspaceDependencies: TransformFunction = (
  pkg: IPackageJson
) => {
  const dependencies = pkg.dependencies
  for (const dep in dependencies) {
    if (whitelistedPackages[dep]) continue
    if (dep.startsWith("@chakra-ui/")) {
      pkg.dependencies[dep] = "workspace:*"
    }
  }

  const devDependencies = pkg.dependencies
  for (const devDep in devDependencies) {
    if (whitelistedPackages[devDep]) continue
    if (devDep.startsWith("@chakra-ui/")) {
      pkg.dependencies[devDep] = "workspace:*"
    }
  }
  return pkg
}

execute()
  .then(() => consola.success("Successfully transformed files"))
  .catch(consola.error)
