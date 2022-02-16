import { createStyled } from "./styled"
import { tags } from "./tags"

export * from "./cache"

// bind it to avoid mutating the original function
const styled = createStyled.bind()

tags.forEach((tagName) => {
  // @ts-ignore
  styled[tagName] = styled(tagName)
})

export default styled
