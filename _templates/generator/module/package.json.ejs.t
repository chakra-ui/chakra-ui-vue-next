---
to: packages/<%=h.changeCase.paramCase(name)%>/package.json
---

{
  "name": "<%= '@chakra-ui/' + h.changeCase.paramCase(name)%>",
  "version": "1.0.0",
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/types/index.d.ts",
  "typings": "dist/types/index.d.ts",
  "files": [
    "dist"
  ],
  "exports": {
    ".": {
      "require": "./dist/cjs/index.js",
      "default": "./dist/esm/index.js"
    }
  },
  "description": "<%= 'Chakra UI Vue | ' + h.changeCase.pascalCase(name) + ' module'%>",
  "repository": "https://github.com/chakra-ui/chakra-ui-vue-next.git",
  "author": "Jonathan Bakebwa codebender828@gmail.com",
  "license": "MIT",
  "scripts": {
    "build": "rimraf ./dist && concurrently yarn:build:*",
    "build:esm": "cross-env BABEL_ENV=esm babel src --root-mode upward --extensions .ts,.tsx -d dist/esm --source-maps",
    "build:cjs": "cross-env BABEL_ENV=cjs babel src --root-mode upward --extensions .ts,.tsx -d dist/cjs --source-maps",
    "watch": "concurrently yarn:watch:*",
    "watch:esm": "cross-env BABEL_ENV=esm babel src --root-mode upward --extensions .ts,.tsx -d dist/esm --source-maps --watch",
    "watch:cjs": "cross-env BABEL_ENV=cjs babel src --root-mode upward --extensions .ts,.tsx -d dist/cjs --source-maps --watch",
    "watch:types": "cross-env tsc --emitDeclarationOnly --declaration --declarationDir dist/types --watch --incremental"
  }
}
