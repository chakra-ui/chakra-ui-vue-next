<template>
  <div></div>
</template>

<script>
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'
import SideBar from './Sidebar.vue'
import routes from '../.generated/routes.json'


export default defineComponent({
  components: { SideBar },
  mounted() {
    // Hard coded so we can push to the first component in the storybook
    // TODO: Find a way to locate the first child route
    this.$router.push('/c-alert/base-alert')
  }
})
</script>
