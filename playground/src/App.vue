<template>
  <sidebar :stories="stories" />
  <router-view />
</template>

<script lang="js">
import { defineComponent } from 'vue'
import Sidebar from './components/Sidebar.vue'
import routes from './.generated/routes.json'

export default defineComponent({
  components: { Sidebar },
  setup() {
    return {
      stories: routes,
    }
  },
})
</script>