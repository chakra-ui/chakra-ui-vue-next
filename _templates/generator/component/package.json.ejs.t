---
to: packages/<%=h.changeCase.paramCase(name)%>/package.json
---

{
  "name": "<%= '@chakra-ui/' + h.changeCase.paramCase(name)%>",
  "version": "1.0.0",
  "main": "index.js",
  "description": "<%= 'Chakra UI Vue | ' + h.changeCase.pascalCase(name) + ' component'%>",
  "repository": "https://github.com/chakra-ui/chakra-ui-vue-next.git",
  "author": "codebender828 excellence@jbakebwa.dev",
  "license": "MIT",
  "scripts": {
    "build": "concurrently yarn:build:*",
    "build:esm": "cross-env swc src --out-dir dist/esm/",
    "build:cjs": "cross-env swc -C module.type=commonjs src --out-dir dist/cjs/"
  }
}
