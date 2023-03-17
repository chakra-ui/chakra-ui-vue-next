---
to: tooling/<%=h.changeCase.paramCase(name)%>/package.json
---

{
  "name": "<%= '@chakra-ui/' + h.changeCase.paramCase(name)%>",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "typings": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "default": "./dist/index.mjs"
    }
  },
  "description": "<%= 'Chakra UI Vue | ' + h.changeCase.pascalCase(name) + ' module'%>",
  "repository": "https://github.com/chakra-ui/chakra-ui-vue-next.git",
  "author": "Jonathan Bakebwa codebender828@gmail.com",
  "license": "MIT",
  "scripts": {
    "clean": "rimraf dist .turbo",
    "build": "tsup && pnpm build:types",
    "build:fast": "tsup",
    "build:types": "tsup src --dts-only",
    "types:check": "tsc --noEmit",
    "dev": "tsup --watch"
  }
}
