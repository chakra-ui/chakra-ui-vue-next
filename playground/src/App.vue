<template>
  <c-reset />
  <chakra.section
    display="flex"
    transition="all 0.2s"
    height="inherit"
    w="inherit"
  >
    <perfect-scrollbar>
      <chakra.div pb="12">
        <sidebar :stories="routes" />
      </chakra.div>
    </perfect-scrollbar>
    <c-center
      w="full"
      pos="relative"
      border-left="1px solid"
      border-color="gray.200"
      padding="4"
    >
      <c-box
        min-w="800px"
        min-h="600px"
        rounded="12px"
        :border-color="
          useColorModeValue('blackAlpha.300', 'whiteAlpha.300').value
        "
        border-width="1px"
        border-style="solid"
        p="8"
      >
        <router-view v-slot="{ Component, route }">
          <!-- <transition name="fade" mode="out-in"> -->
          <component :is="Component" />
          <!-- </transition> -->
        </router-view>
      </c-box>
      <c-h-stack top="10" right="10" pos="absolute">
        <c-link
          is-external
          href="https://github.com/chakra-ui/chakra-ui-vue-next"
        >
          <c-icon-button
            color="inherit"
            @click="toggleColorMode"
            aria-label="Go to github"
            icon="github"
          />
        </c-link>
        <c-icon-button
          color="inherit"
          @click="toggleColorMode"
          :aria-label="`Switch to ${
            colorMode === 'light' ? 'dark' : 'light'
          } mode`"
          :icon="colorMode === 'light' ? 'moon' : 'sun'"
        />
      </c-h-stack>
    </c-center>
  </chakra.section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import {
  chakra,
  CDarkMode,
  CReset,
  CIconButton,
  useColorMode,
  useColorModeValue,
} from "../../packages/vue/src"
import Sidebar from "./components/Sidebar.vue"
import { routes } from "./router"

export default defineComponent({
  components: { Sidebar, CIconButton, DarkMode: CDarkMode },
  setup() {
    const { colorMode, toggleColorMode } = useColorMode()

    const rootStyles = computed(() => {
      const styles = {
        light: {
          bg: "white",
          color: "blackAlpha.800",
          "a.router-link-active": {
            color: "teal.500",
            fontSize: "0.9rem",
            fontWeight: "bold",
            textDecoration: "underline",
          },
        },
        dark: {
          bg: "gray.800",
          color: "whiteAlpha.800",
          "a.router-link-active": {
            color: "teal.200",
            fontSize: "0.9rem",
            fontWeight: "bold",
            textDecoration: "underline",
          },
        },
      }

      return {
        transition: "all 0.2s ease-in",
        ...styles[colorMode.value],
      }
    })

    return {
      routes,
      colorMode,
      toggleColorMode,
      rootStyles,
      useColorModeValue,
      chakra,
    }
  },
})
</script>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"></style>

<style>
html,
body {
  margin: 0;
  height: 100vh;
  width: 100vw;
}

html {
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
