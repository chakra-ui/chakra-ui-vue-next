export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ["/docs/*", "/getting-started/*"],
    },
  },
  modules: ["@nuxt/content"],
  build: {
    // @ts-ignore
    extend(config: { resolve: { alias: { vue$: string } } }, _ctx: any) {
      config.resolve.alias.vue$ = "vue/dist/vue.esm-browser.js"
    },
  },
  plugins: ["~/plugins/chakra.client.ts"],
  css: ["~/styles/prism.scss"],
  content: {
    documentDriven: true,
    markdown: {
      toc: { depth: 5, searchDepth: 3 },
      // anchorLinks: true,
      remarkPlugins: ["remark-prism"],
      rehypePlugins: [
        "rehype-prism-plus",
        [
          "rehype-autolink-headings",
          {
            behavior: "append",
            test: ["h2", "h3", "h4"],
            properties: { className: ["anchor"] },
          },
        ],
      ],
    },
  },
})
