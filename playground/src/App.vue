<template>
  <section class="root">
    <sidebar class="sidebar" :stories="stories" />
    <router-view class="main" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from './components/Sidebar.vue'
import stories from './.generated/routes.json'

export default defineComponent({
  components: { Sidebar },
  setup() {
    return {
      stories,
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

.main {
  width: 100%;
  padding: 1rem;
}
</style>