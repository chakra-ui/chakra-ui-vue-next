import consola from "consola"
import { readFileSync, writeFileSync } from "fs-extra"
import glob from "glob-promise"
import { IPackageJson } from "../types/package.json"

export async function getAllPackageJsons() {
  const packagesDirectories = ["packages", "tooling", "modules"]
  const packageJsonFiles = (
    await Promise.all(
      await packagesDirectories.map(async (directory) => {
        return await glob(`./${directory}/**/package.json`, {
          nobrace: true,
        }).then((f) =>
          f.filter(
            (path) =>
              !path.includes("node_modules") && !path.includes("tsconfig.json")
          )
        )
      })
    )
  ).flat()

  return packageJsonFiles
}

export type TransformFunction = (file: IPackageJson) => IPackageJson

export async function transformPackageJson(
  path: string,
  transformer: TransformFunction
) {
  const file = await readFileSync(path, "utf8")
  const transformedFileContent = transformer(JSON.parse(file))
  await writeFileSync(
    path,
    JSON.stringify(transformedFileContent, null, 2),
    "utf-8"
  )
}
