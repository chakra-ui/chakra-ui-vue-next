import * as ts from "typescript"
import { resolve } from "path"

function findExports(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options)

  const checker = program.getTypeChecker()

  const namedExports = new Map<string, ts.Symbol["escapedName"][]>()

  fileNames.forEach((file) => {
    const sourceFile = program.getSourceFile(file)
    if (!sourceFile) return console.info("No sourceFile found at ", file)

    const sourceFileSymbol = checker.getSymbolAtLocation(sourceFile)!
    const exports = checker
      .getExportsOfModule(sourceFileSymbol)
      .filter((symbol) => symbol.escapedName !== "default")
      .map((symbol) => {
        console.log("symbol", symbol)

        return symbol.escapedName
      })

    namedExports.set(file, exports)
  })

  namedExports.forEach((exports, file) => {
    console.log(`Named exports from ${file}:`)
    exports.forEach((exportName) => {
      console.log(`- ${exportName}`)
    })
  })
}

findExports([resolve(__dirname, "./lib-example/index.ts")], {
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
})
