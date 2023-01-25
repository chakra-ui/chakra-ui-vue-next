import consola from "consola"
import glob from "glob-promise"
import { IPackageJson } from "./types/package.json"
import { readFileSync, writeFileSync } from "fs"

async function getAllPackageJsons() {
  const packageJsonFiles = await glob("**/packages/**/*.json", {
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

type Transform = (file: IPackageJson) => IPackageJson

async function transformFile(path: string, transformer: Transform) {
  const file = await readFileSync(path, "utf8")
  const transformedFileContent = transformer(JSON.parse(file))
  await writeFileSync(
    path,
    JSON.stringify(transformedFileContent, null, 2),
    "utf-8"
  )
}

async function execute() {
  const files = await getAllPackageJsons()
  files.forEach((filePath) => {
    transformFile(filePath, (pkg) => {
      // pkg.scripts["build"] = "tsup src --dts"
      // pkg.scripts["build:fast"] = "tsup src"
      // pkg.scripts["clean"] = "rimraf dist .turbo"
      // pkg.scripts["types:check"] = "tsc --noEmit"
      return pkg
    })
  })
}

execute()
  .then(() => consola.success("Successfully transformed files"))
  .catch(consola.error)
