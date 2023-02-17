import { createApp } from "vue"
import Chakra, {
  chakra,
  extendTheme,
  BodyScrollLockDirective,
  extendChakra,
  domElements,
} from "../../packages/vue/src"
import { feActivity, feUser } from "feather-icons-paths"
import PerfectScrollbar from "vue3-perfect-scrollbar"
import { MotionPlugin } from "@vueuse/motion"
import App from "./App.vue"
import router from "./router"
import { mode } from "@chakra-ui/theme-tools"
import { feGithub } from "feather-icons-paths"

console.log({ router })

const app = createApp(App)
  .use(router)
  .use(MotionPlugin)
  .use(
    // @ts-ignore
    Chakra,
    extendChakra({
      cssReset: true,
      icons: {
        library: {
          feActivity,
          feUser,
          feGithub,
        },
        extend: {
          discord: {
            path: '<path fill="currentColor" d="M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z" fa-key="3" fill="currentColor"></path>',
            viewBox: "0 0 496 512",
          },
        },
      },
      emotionCacheOptions: {
        key: "chakra",
      },
      extendTheme: extendTheme({
        config: {
          // initialColorMode: "system",
        },
        fonts: {
          heading: `SplineSans, sans-serif, Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
          body: `SplineSans, sans-serif, Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
        },
        shadows: {
          outline: `0 0 0 4px rgba(47, 133, 90, 0.62)`,
          inset: `inset 0 2px 0 0 rgb(255 255 255 / 10%)`,
          search:
            "0 0 0 1px rgba(16,22,26,.1), 0 4px 8px rgba(16,22,26,.2), 0 18px 46px 6px rgba(16,22,26,.2)",
        },
        styles: {
          global: (props: any) => {
            return {
              body: {
                bg: mode("white", "gray.800")(props),
                color: mode("blackAlpha.800", "whiteAlpha.800")(props),
                "a.router-link-active": {
                  color: mode("teal.500", "teal.200")(props),
                  fontSize: mode("0.9rem", "0.9rem")(props),
                  fontWeight: mode("bold", "bold")(props),
                  textDecoration: mode("underline", "underline")(props),
                },
              },
            }
          },
        },
        components: {
          Button: {
            baseStyle: {
              shadow: "inset",
            },
          },
        },
      }),
    })
  )
  .use(PerfectScrollbar)

domElements.forEach((tag) => {
  app.component(`chakra.${tag}`, chakra(tag))
})

app.directive("scroll-lock", BodyScrollLockDirective)

app.mount("#app")
