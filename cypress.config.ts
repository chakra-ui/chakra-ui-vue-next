import { defineConfig } from "cypress"

export default defineConfig({
  projectId: "rb8e7m",
  video: false,
  fixturesFolder: false,
  reporter: "spec",
  component: {
    experimentalSingleTabRunMode: true,
    setupNodeEvents(on, config) {},
    specPattern: "packages/**/*.cy.*",
    excludeSpecPattern: "**/*.snap",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
})
