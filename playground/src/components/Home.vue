<template>
  <SideBar :stories="stories" />
</template>

<script>
import { defineComponent, h } from 'vue'
import SideBar from './Sidebar.vue'
import { RouterLink } from 'vue-router'
import routes from '../.generated/routes.json'


export default defineComponent({
  components: { SideBar },
  setup() {
    return {
      stories: routes,
    }
  },
})
</script>
