import { chakra } from "@chakra-ui/vue-system"
import { CSSObject } from "@emotion/css"

/**
 * Styles to visually hide an element
 * but make it accessible to screen-readers
 */
export const visuallyHiddenStyle: CSSObject = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute",
}

/**
 * Visually hidden component used to hide
 * elements on screen
 */
export const CVisuallyHidden = chakra("span", {
  baseStyle: visuallyHiddenStyle,
})

/**
 * Visually hidden input component for designing
 * custom input components using the html `input`
 * as a proxy
 */
export const CVisuallyHiddenInput = chakra("input", {
  baseStyle: visuallyHiddenStyle,
})

export default CVisuallyHidden
