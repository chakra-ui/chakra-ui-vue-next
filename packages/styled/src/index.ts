import { createStyled } from "./styled"
import { tags } from "./tags"

export * from "./cache"

// bind it to avoid mutating the original function
const styled = createStyled.bind()

tags.forEach((tagName) => {
  styled[tagName] = styled(tagName)
})

export default styled
