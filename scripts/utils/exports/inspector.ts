import * as ts from "typescript"
import { resolve } from "path"

function findExports(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options)

  const checker = program.getTypeChecker()

  interface ComponentExport {
    name: string
    path: string
    type: "type" | "variable"
  }

  const namedExports = new Map<string, ComponentExport[]>()

  fileNames.forEach((file) => {
    const sourceFile = program.getSourceFile(file)
    if (!sourceFile) return console.info("No sourceFile found at ", file)

    const sourceFileSymbol = checker.getSymbolAtLocation(sourceFile)!
    const exports = checker
      .getExportsOfModule(sourceFileSymbol)
      .filter((symbol) => symbol.escapedName !== "default")
      .map((symbol) => {
        return {
          name: symbol.escapedName.toString(),
          path: file,
          type: symbol.members ? "type" : "variable",
        } as ComponentExport
      })

    namedExports.set(file, exports)
  })

  namedExports.forEach((exports, file) => {
    console.log(`Named exports from ${file}:`)
    exports.forEach(console.log)
  })
}

findExports([resolve(__dirname, "../../../packages/c-icon/src/index.tsx")], {
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
  jsx: ts.JsxEmit.Preserve,
})

function findExportsInDirectory(directoryRoot: string) {
  // const directory =
}
