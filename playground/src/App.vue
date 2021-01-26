<template>
  <chakra.section d="flex" height="inherit" w="inherit">
    <sidebar :stories="routes" />
    <chakra.main w="full" border-left="1px solid" border-color="gray.400" padding="4">
      <router-view />
    </chakra.main>
  </chakra.section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from './components/Sidebar.vue'
import { routes } from './router'

export default defineComponent({
  components: { Sidebar },
  setup() {
    return {
      routes,
      
    }
  },
})
</script>

<style>
html, body {
  margin: 0;
  height: 100vh;
  width: 100vw;
}

html {
  line-height: 1.5;
  color: rgb(26, 32, 44);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#app {
  height: inherit;
  width: inherit;
}
</style>
