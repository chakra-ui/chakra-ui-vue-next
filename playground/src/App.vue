<template>
  <sidebar :stories="stories" />
    <router-view />
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