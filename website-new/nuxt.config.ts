export default {
  modules: [
    "@nuxt/content",
    function (
      _options: any,
      nuxt: {
        hook: (arg0: string, arg1: (config: any) => void) => void
        options: { dev: any }
      }
    ) {
      nuxt.hook(
        "nitro:config",
        (config: { externals: { external: string[] } }) => {
          if (nuxt.options.dev) {
            // Prevent inlining emotion (+ the crucial css cache!) in dev mode
            config.externals.external ||= []
            config.externals.external.push("@emotion/server")
          }
        }
      )
    },
  ],
  build: {
    extend(config: { resolve: { alias: { vue$: string } } }, _ctx: any) {
      config.resolve.alias.vue$ = "vue/dist/vue.esm-browser.js"
    },
  },
  content: {
    highlight: {
      // Theme used in all color schemes.
      theme: "github-light",
    },
  },
}
