import consola from "consola"
import glob from "glob-promise"
import { IPackageJson } from "./types/package.json"
import { readFileSync, writeFileSync } from "fs"

async function getAllPackageJsons() {
  const packageJsonFiles = await glob("**/{packages|tooling}/**/*.json", {
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

async function execute() {
  const files = await getAllPackageJsons()
  files.forEach((filePath) => {
    transformFile(filePath, configureBuildScripts)
  })
}

const configureBuildTargets: TransformFunction = (pkg: IPackageJson) => {
  pkg.main = "dist/index.cjs"
  pkg.module = "dist/index.mjs"

  pkg.exports["."].require = "dist/index.cjs"
  pkg.exports["."].default = "dist/index.mjs"

  pkg.tsup = {
    clean: true,
    target: "es2019",
    format: ["cjs", "esm"],
  }

  return pkg
}

const configureBuildScripts: TransformFunction = (pkg: IPackageJson) => {
  pkg.scripts["build"] = "tsup src --dts"
  pkg.scripts["build:fast"] = "tsup src"
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
