import { defineConfig } from "cypress"

export default defineConfig({
  video: false,
  fixturesFolder: false,
  reporter: "spec",
  component: {
    setupNodeEvents(on, config) {},
    specPattern: "packages//**/*.cy.*",
    excludeSpecPattern: "**/*.snap",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
})
