<template>
  <section class="root">
    <sidebar class="sidebar" :stories="routes" />
    <main class="main">
      <router-view />
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import Sidebar from './components/Sidebar.vue'
import { routes } from './router'

export default defineComponent({
  components: { Sidebar },
  setup() {
    const chakraTheme = inject('$chakraTheme')
    return {
      routes,
      chakraTheme
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

<style scoped>
.root {
  display: flex;
  height: inherit;
  width: inherit;
}

.sidebar {
  height: 100%;
  widows: 200px;
  margin: 0;
  list-style-type: none;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

a {
  color: black !important;
}

.main {
  width: 100%;
  padding: 1rem;
}
</style>