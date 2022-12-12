import { extractCritical } from "@emotion/server"
import { hydrate } from "@emotion/css"

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html) => {
    const { ids, css } = extractCritical(html.body)

    html.head.push(`<style data-emotion="${ids.join(" ")}">${css}</style>`)
    hydrate(ids)
  })
})
