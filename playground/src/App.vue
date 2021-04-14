<template>
  <c-reset />
  <chakra.section d="flex" transition="all 0.2s" height="inherit" w="inherit" :__css="rootStyles">
    <perfect-scrollbar>
      <chakra.div pb="12">
        <sidebar :stories="routes" />
      </chakra.div>
    </perfect-scrollbar>
    <chakra.main w="full" pos="relative" border-left="1px solid" border-color="gray.200" padding="4">
      <router-view v-slot="{ Component, route }">
        <!-- <transition name="fade" mode="out-in"> -->
          <component :is="Component" />
        <!-- </transition> -->
      </router-view>
      <c-icon-button color="inherit" pos="absolute" @click="toggleColorMode" top="10" right="10" :aria-label="`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`" :icon="colorMode === 'light' ? 'moon' : 'sun'" />
    </chakra.main>
  </chakra.section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { CReset, CIconButton, useColorMode } from '@chakra-ui/vue-next'
import Sidebar from './components/Sidebar.vue'
import { routes } from './router'

export default defineComponent({
  components: { Sidebar, CReset, CIconButton },
  setup() {
    const { colorMode, toggleColorMode } = useColorMode()

    const rootStyles = computed(() => {

      const styles = {
        light: {
          bg: 'white',
          color: 'blackAlpha.800',
          'a.router-link-active': {
            color: 'teal.500',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            textDecoration: 'underline'
          }
        },
        dark: {
          bg: 'gray.800',
          color: 'whiteAlpha.800',
          'a.router-link-active': {
            color: 'teal.200',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            textDecoration: 'underline'
          }
        },
      }
      
      return {
        transition: 'all 0.2s ease-in',
        ...styles[colorMode.value]
      }
    })

    return {
      routes,
      colorMode,
      toggleColorMode,
      rootStyles
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

.ps {
  height: 100vh;
  width: 275px;
}
</style>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>