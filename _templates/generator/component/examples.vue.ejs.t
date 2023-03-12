---
to: packages/<%=h.changeCase.paramCase(name)%>/examples/simple-<%=h.changeCase.paramCase(name)%>.vue
---
<script setup lang="ts">
import { <%=h.changeCase.pascalCase(name)%> } from "../src"
</script>

<template>
  <<%=h.changeCase.paramCase(name)%>> HELLO <%=h.changeCase.pascalCase(name)%> </<%=h.changeCase.paramCase(name)%>>
</template>
