import { computed, Ref, ref, watchEffect } from "vue"

export type UseMediaQueryOptions = {
  fallback?: boolean | boolean[]
  ssr?: boolean
}

// Setup based on foundation from DEV article: https://dev.to/unorthodev/build-a-custom-media-query-composable-for-vue-apps-1o2c
// Building up backwards from above to the setup similar in the React package

/**
 * Tracks state of a CSS media query
 *
 * @param query - the query to match
 * @param options - the media query options { fallback, ssr }
 *
 * @returns Ordered array of booleans matching each given query
 */
export function useMediaQuery(
  query: string | string[],
  options: UseMediaQueryOptions = {}
): Ref<boolean[]> {
  const { ssr = true, fallback } = options

  // TODO: Replace with a useEnvironment composable or similar
  // To account for SSR mock window
  const env = { window }

  const queries = Array.isArray(query) ? query : [query]

  const fallbackValues = computed(() => {
    const valArray = Array.isArray(fallback) ? fallback : [fallback]

    return valArray.filter((v) => v != null)
  })

  const matches = ref(
    queries.map((query, index) =>
      ssr ? !!fallbackValues.value[index] : env.window.matchMedia(query).matches
    )
  )

  watchEffect((onInvalidate) => {
    const mql = queries.map((media) => env.window.matchMedia(media))

    matches.value = mql.map((media) => media.matches)

    const onChange = () => {
      matches.value = mql.map((media) => media.matches)
    }

    mql.forEach((media) => media.addEventListener("change", onChange))

    onInvalidate(() => {
      mql.forEach((media) => media.removeEventListener("change", onChange))
    })
  })

  return matches
}
