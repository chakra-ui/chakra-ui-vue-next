import { injectGlobal, css } from "@chakra-ui/vue-system"
import { cssResetStyles } from "@chakra-ui/c-reset"
import { ThemeOverride } from "../extend-theme"
import { get, runIfFn } from "@chakra-ui/utils"
import { ColorModeRef } from "@chakra-ui/c-color-mode"
import { serializeStyles } from "@emotion/serialize"
import { StyleSheet } from "@emotion/sheet"
import { computed, ref, watch, watchEffect } from "vue"
import createCache, { EmotionCache } from "@emotion/cache"
import { insertStyles, SerializedStyles } from "@emotion/utils"

/** Injects CSS reset styles */
export function injectResetStyles() {
  injectGlobal(cssResetStyles)
}

/** Injects styles from `theme.styles.global` property */
export function injectThemeGlobalStyles(
  theme: ThemeOverride,
  _cache: EmotionCache,
  colorMode: ColorModeRef
) {
  const styleObjectOrFn = get(theme, "styles.global")
  const globalStyles = computed(() =>
    runIfFn(styleObjectOrFn, {
      theme,
      colorMode: colorMode.value,
    })
  )
  if (!globalStyles.value) return undefined

  const cache = createCache({
    key: "chakra-global",
    nonce: "__chakra__",
  })

  const _globalStyles = computed(() => css(globalStyles.value)(theme))

  const serializedStyles = computed<SerializedStyles>(() =>
    serializeStyles([_globalStyles.value], cache.registered, theme)
  )

  const sheetRef = ref<[sheet: StyleSheet, hydrating: boolean]>()

  watch(
    () => cache,
    () => {
      const key = `${cache.key}`

      let sheet = new StyleSheet({
        key: `${key} ${serializedStyles.value.name}`,
        nonce: cache.sheet.nonce,
        container: cache.sheet.container,
        // @ts-expect-error `isSpeedy` is not typed
        speedy: cache.sheet.isSpeedy,
      })

      let rehydrating = false
      let node: HTMLStyleElement | null =
        typeof document !== "undefined"
          ? document.querySelector(
              `style[data-emotion="${key} ${serializedStyles.value.name}"]`
            )
          : null

      if (cache.sheet.tags.length) {
        sheet.before = cache.sheet.tags[0]
      }

      if (node !== null) {
        rehydrating = true
        // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s
        node.setAttribute(
          "data-emotion",
          `${key} ${serializedStyles.value.name}`
        )
        sheet.hydrate([node])
      }

      sheetRef.value = [sheet, rehydrating]
    },
    {
      immediate: true,
    }
  )

  watchEffect((_) => {
    const [sheet, rehydrating] = sheetRef.value!

    if (rehydrating) {
      sheetRef.value![1] = false
    }

    if (serializedStyles.value.next !== undefined) {
      // insert keyframes
      insertStyles(cache, serializedStyles.value.next, true)
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be
      // null so the style element will be appended
      let element = sheet.tags[sheet.tags.length - 1].nextElementSibling
      console.log({ element })
      sheet.before = element
      sheet.flush()
    }

    /* @ts-expect-error Sheet type not correctly assigned*/
    cache.insert(``, serializedStyles.value, sheet, false)
  })
}
