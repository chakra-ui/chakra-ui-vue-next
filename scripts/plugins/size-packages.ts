import consola from "consola"
import { ensureFile, readFileSync } from "fs-extra"
import { IPackageJson } from "../types/package.json"
import { getAllPackageJsons } from "../utils"
import { gzipSync } from "node:zlib"
import { compress } from "brotli"
import chalk from "chalk"
import path from "node:path"

const logger = consola.withTag("size-packages")

const ignored = [
  "@chakra-ui/vue-test-utils",
  "@chakra-ui/nuxt-next-playground",
  "@chakra-ui/vue-next-test-fixture",
]

function checkFileSize(pkg: IPackageJson, filePath: string) {
  if (!ensureFile(filePath)) {
    return
  }
  const file = readFileSync(filePath)
  const gzipped = gzipSync(file)
  const compressed = compress(file)
  const gzip = (gzipped.length / 1024).toFixed(2) + "kb"
  const gzipNum = Number((gzipped.length / 1024).toFixed(2))
  const minified = (file.length / 1024).toFixed(2) + "kb"
  const rawNum = Number((file.length / 1024).toFixed(2))
  const brotli = (compressed?.length! / 1024).toFixed(2) + "kb"
  const brotliNum = Number((compressed?.length! / 1024).toFixed(2))
  console.log(
    `CommonJS (Unoptimized) :: ${chalk.yellow(
      chalk.bold(pkg.name)
    )} ==> min:${minified} / gzip:${gzip} / brotli:${brotli}`
  )

  return {
    package: pkg,
    minified,
    rawNum,
    gzip,
    gzipNum,
    brotli,
    brotliNum,
  }
}

async function sizePackages() {
  const packageJsonFilePaths = await getAllPackageJsons()
  const allPackagesPromises = packageJsonFilePaths.map((path) => {
    const pkg = JSON.parse(readFileSync(path, "utf8")) as IPackageJson
    const [directory] = path.split("/package.json")
    return {
      name: pkg.name,
      meta: pkg,
      path: path,
      directory,
    }
  })
  const packages = allPackagesPromises
  const resultsTable: {
    package: string
    entry: string
    minified: string
    rawNum: number
    gzip: string
    gzipNum: number
    brotli: string
    brotliNum: number
  }[] = []
  for (const instance of packages.filter(
    (pkg) => !ignored.includes(pkg.name)
  )) {
    const _package = instance.meta
    const entry = `${instance.directory}/${_package.main || _package.module}`
    const result = checkFileSize(_package, entry)

    if (result) {
      resultsTable.push({
        package: _package.name,
        entry,
        minified: result.minified,
        rawNum: result.rawNum,
        gzip: result.gzip,
        gzipNum: result.gzipNum,
        brotli: result.brotli,
        brotliNum: result.brotliNum,
      })
    }
  }

  const rawSizeTotal = Math.round(
    resultsTable.reduce((acc, curr) => acc + curr.rawNum, 0)
  ).toPrecision(4)
  const gzipSizeTotal = resultsTable
    .reduce((acc, curr) => acc + curr.gzipNum, 0)
    .toPrecision(2)
  const brotliSizeTotal = resultsTable
    .reduce((acc, curr) => acc + curr.brotliNum, 0)
    .toPrecision(2)
  console.table(
    resultsTable.map(({ rawNum, brotliNum, gzipNum, ...rest }) => rest)
  )
  consola.success(
    "@chakra-ui/vue-next:: brotli",
    chalk.cyanBright(chalk.bold(brotliSizeTotal, "kb"))
  )
  consola.success(
    "@chakra-ui/vue-next:: gzip",
    chalk.cyanBright(chalk.bold(gzipSizeTotal, "kb"))
  )
  consola.success(
    "@chakra-ui/vue-next:: minified",
    chalk.cyanBright(chalk.bold(rawSizeTotal, "kb"))
  )
}

sizePackages()
  .then(() => logger.log("Done"))
  .catch(logger.error)
