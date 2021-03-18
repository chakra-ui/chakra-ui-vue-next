<template>
  <c-reset />
  <chakra.section d="flex" height="inherit" w="inherit">
    <sidebar :stories="routes" />
    <chakra.main w="full" border-left="1px solid" border-color="gray.400" padding="4">
      <router-view v-slot="{ Component, route }">
        <!-- <transition name="fade" mode="out-in"> -->
          <component :is="Component" />
        <!-- </transition> -->
      </router-view>
    </chakra.main>
  </chakra.section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CReset } from '@chakra-ui/c-reset'
import Sidebar from './components/Sidebar.vue'
import { routes } from './router'

export default defineComponent({
  components: { Sidebar, CReset },
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

a {
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
