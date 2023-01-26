import consola from "consola"
import { ensureFile, readFileSync, ensureDirSync } from "fs-extra"
import { IPackageJson } from "../types/package.json"
import { getAllPackageJsons } from "../utils"
import { gzipSync } from "node:zlib"
import { compress } from "brotli"
import chalk from "chalk"
import path from "node:path"
import kebabCase from "lodash.kebabcase"

const logger = consola.withTag("size-packages")

function checkFileSize(pkg: IPackageJson, filePath: string) {
  if (!ensureFile(filePath)) {
    return
  }
  const file = readFileSync(filePath)
  const minSize = (file.length / 1024).toFixed(2) + "kb"
  const gzipped = gzipSync(file)
  const gzippedSize = (gzipped.length / 1024).toFixed(2) + "kb"
  const compressed = compress(file)
  const compressedSize = (compressed?.length! / 1024).toFixed(2) + "kb"
  console.log(
    `${chalk.yellow(
      chalk.bold(path.basename(filePath))
    )} min:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`
  )

  return {
    package: pkg,
    compressedSize,
  }
}

async function sizePackages() {
  const packageJsonFilePaths = await getAllPackageJsons()
  const allPackagesPromises = await packageJsonFilePaths.map(async (path) => {
    const pkg = JSON.parse(await readFileSync(path, "utf8")) as IPackageJson
    const [directory] = path.split("/package.json")
    return {
      name: pkg.name,
      meta: pkg,
      path: path,
      directory,
    }
  })
  const packages = await Promise.all(allPackagesPromises)
  const resultsTable: {
    package: string
    entry: string
    compressedSize: string
  }[] = []
  for (const instance of packages) {
    const _package = instance.meta
    const entry = `${instance.directory}/dist/${kebabCase(
      instance.name
    )}.esm.js`
    const result = checkFileSize(_package, entry)

    if (result) {
      resultsTable.push({
        package: _package.name,
        entry,
        compressedSize: result.compressedSize,
      })
    }
  }
  console.table(resultsTable)
}

sizePackages()
  .then(() => logger.success("OK"))
  .catch(logger.error)
