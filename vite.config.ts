import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import Pages from "vite-plugin-pages"
import Layouts from "vite-plugin-vue-layouts"
import ChakraComponents from "./playground/build/components.json"
import path from "path"

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  optimizeDeps: {
    exclude: ["@popperjs/core", "@vueuse/core", "@vueuse/motion"],
  },
  build: {
    target: "modules",
  },
  server: {
    watch: {
      ignored: ["**/*snapshots*"],
    },
  },
  resolve: {
    alias: {
      "@chakra-ui/vue-test-utils": path.resolve(
        __dirname,
        "./packages/test-utils"
      ),
    },
  },
  plugins: [
    vue(),
    Pages({
      pagesDir: path.relative(__dirname, "../packages"),
      extensions: ["vue"],
      extendRoute(route, parent) {
        if (route.path === "/") {
          return route
        }
        const [groupRaw] = route.name!.split("-examples-")
        const [_, group] = groupRaw.split("c-")
        return {
          ...route,
          groupRaw,
          groupPath: `/${group}`,
          group: group || _,
        }
      },
    }),
    Layouts({
      layoutsDir: "/layouts",
    }),
    Components({
      resolvers: [
        (name: string) => {
          if (name in ChakraComponents) {
            return {
              importName: name,
              path: `@chakra-ui/vue-next`,
            }
          }
        },
      ],
    }),
  ],
})
