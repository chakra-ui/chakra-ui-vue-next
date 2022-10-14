---
to: packages/<%=h.changeCase.paramCase(name)%>/package.json
---

{
  "name": "<%= '@chakra-ui/' + h.changeCase.paramCase(name)%>",
  "description": "<%= 'Chakra UI Vue | ' + h.changeCase.sentence(description) + ' component'%>",
  "version": "0.0.0-alpha.0",
  "main": "<%= 'dist/chakra-ui-' + h.changeCase.paramCase(name) + '.cjs.js' %>",
  "module": "<%= 'dist/chakra-ui-' + h.changeCase.paramCase(name) + '.esm.js' %>",
  "author": "Jonathan Bakebwa <codebender828@gmail.com>",
  "homepage": "https://github.com/chakra-ui/chakra-ui-vue-next#readme",
  "license": "MIT",
  "files": [
    "dist"
  ],
  "exports": {
    ".": {
      "require": "<%= './dist/chakra-ui-' + h.changeCase.paramCase(name) + '.cjs.js' %>",
      "default": "<%= './dist/chakra-ui-' + h.changeCase.paramCase(name) + '.esm.js' %>"
    }
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/chakra-ui/chakra-ui-vue-next.git"
  },
  "bugs": {
    "url": "https://github.com/chakra-ui/chakra-ui-vue-next/issues"
  },
  "sideEffects": false,
  "scripts": {
    "clean": "rimraf dist"
  },
  "dependencies": {
    "@chakra-ui/vue-system": "0.1.0-alpha.10"
  },
  "devDependencies": {
    "vue": "^3.2.27"
  },
  "peerDependencies": {
    "vue": "^3.1.4"
  },
  "publishConfig": {
    "access": "public"
  }
}
