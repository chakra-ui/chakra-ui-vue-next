import { hydrate } from '@emotion/css'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_) => {
  if (window.$emotionSSRIds) {
    const ids = window.$emotionSSRIds
    hydrate(ids)
  }
})
