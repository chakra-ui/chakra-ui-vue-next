import { describe, expect, it } from "vitest"
import { fileURLToPath } from "url"
import { setup, $fetch } from "@nuxt/test-utils"

describe("nuxt chakra ssr", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("../playground", import.meta.url)),
  })
  it.todo("installs module and binds chakra config")
  it.todo("installs plugin")
  it.todo("detects and renders color mode based on cookie storage")

  it.skip("renders the index page", async () => {
    const html = await $fetch("/")
    expect(html).toContain("<style data-emotion")
    expect(html).toContain("<script data-emotion")
    expect(html).toContain("window.$emotionSSRIds")
    // Removed because the nuxt build entries product difference SSR output
    // for each test run so it doesn't make sense to run snapshot tests.
    expect(html).toMatchSnapshot()
  })
})
