---
to: packages/<%=h.changeCase.paramCase(name)%>/examples/base-<%=h.changeCase.paramCase(name)%>.vue
---

<template>
  <<%=h.changeCase.paramCase(name)%>> HELLO <%=h.changeCase.pascalCase(name)%> </<%=h.changeCase.paramCase(name)%>>
</template>

<script lang="ts">
import { <%=h.changeCase.pascalCase(name)%> } from '@chakra-ui/<%=h.changeCase.paramCase(name)%>/src'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Base<%= h.changeCase.pascalCase(name) %>Example',
  components: { <%= h.changeCase.pascalCase(name) %> },
})
</script>
