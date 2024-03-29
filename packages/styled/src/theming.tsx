import weakMemoizeImport from "@emotion/weak-memoize"
import { createContext } from "@chakra-ui/vue-utils"
import { getTheme } from "./utils"

export function weakMemoize(...args: Parameters<typeof weakMemoizeImport>) {
  return typeof weakMemoizeImport === "function"
    ? weakMemoizeImport(...args)
    : // @ts-ignore
    weakMemoizeImport.default(...args) // @ts-ignore
    ? weakMemoizeImport.default(...args)
    : // @ts-ignore
      weakMemoizeImport(...args)
}

const [_EmotionThemeProvider, useEmotionTheme, EmotionThemeContextSymbol] =
  createContext<object>({
    strict: false,
    name: "EmotionThemeContext",
  })

let createCacheWithTheme = /* #__PURE__ */ weakMemoize((outerTheme) => {
  return weakMemoize((theme) => {
    return getTheme(outerTheme, theme)
  })
})

function EmotionThemeProvider(theme: object | ((Obj: object) => Object)) {
  let _theme = useEmotionTheme()
  if (theme !== _theme) {
    // @ts-ignore weak map typing not fulfilled properly
    _theme = createCacheWithTheme(_theme)(theme)
  }
  _EmotionThemeProvider(_theme)
}

export {
  createCacheWithTheme as createThemeCache,
  EmotionThemeProvider,
  useEmotionTheme,
  EmotionThemeContextSymbol,
}
