import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'
describe('nust emotion ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url))
  })
  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<style data-emotion')
    expect(html).toContain('<script data-emotion')
    expect(html).toContain('window.$emotionSSRIds')

    // Removed because the nuxt build entries product difference SSR output
    // for each test run so it doesn't make sense to run snapshot tests.
    // expect(html).toMatchSnapshot()
  })
})
