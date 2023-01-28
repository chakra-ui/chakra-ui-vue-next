import consola from "consola"
import { readFileSync } from "fs"
import { IPackageJson } from "../types/package.json"
import { getAllPackageJsons } from "../utils"

const logger = consola.withTag("print-packages")

async function printPackages() {
  const packageJsonFilePaths = await getAllPackageJsons()
  const allPackagesPromises = await packageJsonFilePaths.map(
    async (path) => JSON.parse(await readFileSync(path, "utf8")) as IPackageJson
  )
  const packages = await Promise.all(allPackagesPromises)
  logger.info(
    "packages",
    packages.map((pkg) => pkg.name)
  )
}

printPackages()
  .then(() => logger.success("OK"))
  .catch(logger.error)
