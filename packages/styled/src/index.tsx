import { createStyled } from "./styled"
import { tags } from "./tags"

// bind it to avoid mutating the original function
const styled = createStyled.bind()

tags.forEach((tagName) => {
  // @ts-ignore
  styled[tagName] = styled(tagName)
})

export default styled

export {
  createCache,
  defaultCache,
  EmotionCacheInjectionSymbol,
  EmotionCacheProvider,
  withEmotionCache,
  __unusafe_useEmotionCache,
} from "./cache"
export {
  createThemeCache,
  EmotionThemeContextSymbol,
  EmotionThemeProvider,
  useEmotionTheme,
  weakMemoize,
} from "./theming"
