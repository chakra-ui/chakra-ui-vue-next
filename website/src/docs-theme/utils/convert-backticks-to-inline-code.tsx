import { isObject } from "@chakra-ui/utils"
import MdxInlineCode from "@/docs-theme/components/MDXComponents/MdxInlineCode.vue"

/**
 * Replace the code blocks wrapped in backticks
 * with inline code blocks.
 */

function toInlineCode(input: string) {
  return input
    .split(/(`\w+`)/)
    .map((chunk) =>
      chunk.startsWith("`") && chunk.endsWith("`") ? (
        <MdxInlineCode key={chunk}>{chunk.slice(1, -1)}</MdxInlineCode>
      ) : (
        chunk
      )
    )
}

export function convertBackticksToInlineCode(input?: string) {
  if (!input) return ""
  return isObject(input) ? input : toInlineCode(input)
}
