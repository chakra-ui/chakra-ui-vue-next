import consola from "consola"

import { existsSync, readFileSync } from "fs-extra"
import { IPackageJson } from "../types/package.json"
import { getAllPackageJsons } from "../utils"
import { gzipSync } from "node:zlib"
import { compress } from "brotli"
import chalk from "chalk"
import path from "node:path"

const logger = consola.withTag("size-packages")

import * as ts from "typescript"
import { resolve, dirname } from "path"
import { ESLint } from "eslint"
import { writeFileSync } from "fs"

const eslint = new ESLint({ fix: true })

interface ComponentExport {
  name: string
  path: string
  type: "type" | "variable"
  directory: string
}

type ComponentExportsMap = Map<string, ComponentExport[]>

function findAndGenerateComponentExportsInFile(
  fileNames: string[],
  options: ts.CompilerOptions
) {
  let program = ts.createProgram(fileNames, options)
  const checker = program.getTypeChecker()
  const namedExports: ComponentExportsMap = new Map()
  fileNames.forEach((file) => {
    const sourceFile = program.getSourceFile(file)
    if (!sourceFile) return console.info("No sourceFile found at ", file)

    const sourceFileSymbol = checker.getSymbolAtLocation(sourceFile)!
    const exports: ComponentExport[] = checker
      .getExportsOfModule(sourceFileSymbol)
      .filter((symbol) => symbol.escapedName !== "default")
      .map((symbol) => {
        return {
          name: symbol.escapedName.toString(),
          // @ts-ignore
          // @ts-ignore
          path: symbol.parent.valueDeclaration.originalFileName,
          type: symbol.members ? "type" : "variable",
          // @ts-ignore
          directory: dirname(file),
        }
      })

    namedExports.set(file, exports)
  })
  return namedExports
}

function generateExportsCode(_exports: ComponentExportsMap) {
  let code = ``
  _exports.forEach(async (exports, file) => {
    exports
      .sort((a, b) => {
        const expA = a.name.toUpperCase()
        const expB = b.name.toUpperCase()
        return expA < expB ? -1 : expA > expB ? 1 : 0
      })
      .forEach((exp) => {
        const relativePath = exp.path
          .replace(/\.[^/.]+$/, "") // Remove extensions
          .replace(exp.directory, ".") // Remove absolute directory path
        if (exp.type === "type") {
          code += `export type { ${exp.name} } from '${relativePath}';\n`
        } else {
          code += `export { ${exp.name} } from '${relativePath}';\n`
        }
      })
    writeFileSync(file, code, "utf8")
    const results = await eslint.lintFiles([file])
    await ESLint.outputFixes(results)
  })
  console.log(code)
  return code
}

const allowedWorkspaces = ["packages", "tooling"]

try {
  const packageJsonFilePaths = await getAllPackageJsons()
  const allComponentExports = packageJsonFilePaths
    .filter((path) => {
      return allowedWorkspaces.filter((workspace) => path.includes(workspace))
        .length
    })
    .map((path) => {
      const pkg = JSON.parse(readFileSync(path, "utf8")) as IPackageJson
      const [directory] = path.split("/package.json")
      const exportPath = existsSync(`${directory}/src/index.tsx`)
        ? `${directory}/src/index.tsx`
        : `${directory}/src/index.ts`
      return exportPath
    })

  const exportMap = findAndGenerateComponentExportsInFile(allComponentExports, {
    noEmitOnError: true,
    noImplicitAny: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.Preserve,
  })
  generateExportsCode(exportMap)
  logger.log("Done")
} catch (error) {
  logger.error(error)
}
