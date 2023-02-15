import type { NitroApp } from "nitropack"
import { H3Event, parseCookies } from "h3"

/**
 * Why are we declaring types for  `defineNitroPlugin`?
 *
 * It appears that there is no way to import `defineNitroPlugin` from #imports
 * without TypeScript screaming. It might be that the `#imports` types are not
 * exported at project generation phase with `nuxi` CLI
 *
 * If this issue can be resolved, then this code can of course be deleted
 * and changed to the following:
 *
 * ```ts
 * import { defineNitroPlugin } from '#imports'
 * ```
 */

export type NitroAppPlugin = (nitro: NitroApp) => void

export function defineNitroPlugin(def: NitroAppPlugin): NitroAppPlugin {
  return def
}

const CHAKRA_UI_COLOR_MODE_COOKIE_KEY = "chakra-ui-color-mode"

export default defineNitroPlugin((app) => {
  if (process.env.NODE_ENV === "development") {
    console.debug("chakra-ui-nuxt:server_runtime")
  }
  app.hooks.hook("render:html", (html, { event: rawEvent }) => {
    const event = new H3Event(rawEvent.node.req, rawEvent.node.res)
    const parsedCookies = parseCookies(event)
    const colorMode = parsedCookies[CHAKRA_UI_COLOR_MODE_COOKIE_KEY]

    console.log("colorMode", colorMode)

    if (colorMode) {
      html.htmlAttrs.push(`data-theme="${colorMode}"`)
      html.htmlAttrs.push(`style="color-scheme: ${colorMode};"`)
      html.htmlAttrs.push(`data-chakra-ui-ssr="true"`)
      html.head.push(
        `<script data-chakra-ui-ssr-context>window.$chakraSSRContext=${JSON.stringify(
          {
            theme: {
              ssrColorMode: colorMode,
            },
          }
        )}</script>`
      )
    }
  })
})
