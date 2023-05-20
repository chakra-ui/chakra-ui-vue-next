---
to: packages/<%=h.changeCase.paramCase(name)%>/package.json
---

{
  "name": "<%= '@chakra-ui/' + h.changeCase.paramCase(name)%>",
  "description": "<%= 'Chakra UI Vue | ' + h.changeCase.sentence(description) + ' component'%>",
  "version": "0.0.0-beta.0",
  "author": "Jonathan Bakebwa <codebender828@gmail.com>",
  "homepage": "https://github.com/chakra-ui/chakra-ui-vue-next#readme",
  "license": "MIT",
  "main": "src/index.ts",
  "clean-package": "../../clean-package.config.json",
  "files": [
    "dist"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/chakra-ui/chakra-ui-vue-next.git"
  },
  "bugs": {
    "url": "https://github.com/chakra-ui/chakra-ui-vue-next/issues"
  },
  "sideEffects": false,
  "scripts": {
    "clean": "rimraf dist .turbo",
    "build": "tsup && pnpm build:types",
    "build:fast": "tsup",
    "types:check": "tsc --noEmit",
    "replace-config": "clean-package",
    "backup-config": "clean-package restore",
    "build:types": "tsup src --dts-only"
  },
  "dependencies": {
    "@chakra-ui/vue-system": "workspace:*"
  },
  "devDependencies": {
    "vue": "^3.2.37"
  },
  "peerDependencies": {
    "vue": "^3.1.4"
  },
  "publishConfig": {
    "access": "public"
  }
}
