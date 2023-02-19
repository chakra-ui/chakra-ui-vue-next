import * as ts from "typescript"
import { resolve, dirname, basename, relative } from "path"
import { ESLint } from "eslint"
import { writeFileSync } from "fs"

interface ComponentExport {
  name: string
  path: string
  type: "type" | "variable"
  directory: string
}

type ComponentExportsMap = Map<string, ComponentExport[]>

function findExportsInFile(fileNames: string[], options: ts.CompilerOptions) {
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
  return generateExportsCode(namedExports)
}

findExportsInFile(
  [resolve(__dirname, "../../../packages/c-button/src/index.tsx")],
  {
    noEmitOnError: true,
    noImplicitAny: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.Preserve,
  }
)

function generateExportsCode(_exports: ComponentExportsMap) {
  let code = ``
  _exports.forEach((exports, file) => {
    exports
      .sort((a, b) => {
        const expA = a.name.toUpperCase()
        const expB = b.name.toUpperCase()
        return expA < expB ? -1 : expA > expB ? 1 : 0
      })
      .forEach((exp) => {
        console.log("file, exp.path", exp.path, exp.directory)
        const relativePath = exp.path.replace(exp.directory, ".")
        if (exp.type === "type") {
          code += `export type { ${exp.name} } from '${relativePath}';\n`
        } else {
          code += `export { ${exp.name} } from '${relativePath}';\n`
        }
      })
    writeFileSync(file, code, "utf8")
  })
  console.log(code)
  return code
}

function findExportsInDirectory(
  directoryRoot: string,
  tsOptions: ts.CompilerOptions
) {
  // const directory =
}
