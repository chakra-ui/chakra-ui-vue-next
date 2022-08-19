import { avatarAnatomy as parts } from "@chakra-ui/vue-anatomy"
import { isDark, mode, randomColor } from "@chakra-ui/vue-theme-tools"
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
} from "@chakra-ui/vue-theme-tools"
import themeSizes from "../foundations/sizes"

const baseStyleBadge: SystemStyleFunction = (props) => {
  return {
    borderRadius: "full",
    border: "0.2em solid",
    borderColor: mode("white", "gray.800")(props),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  }
}

const baseStyleExcessLabel: SystemStyleFunction = (props) => {
  return {
    bg: mode("gray.200", "whiteAlpha.400")(props),
  }
}

const baseStyleContainer: SystemStyleFunction = (props) => {
  const { name, theme } = props
  const bg = name ? randomColor({ string: name }) : "gray.400"
  const isBgDark = isDark(bg)(theme)

  let color = "white"
  if (!isBgDark) color = "gray.800"
  const outlineColor = mode("white", "gray.800")(props)

  return {
    bg,
    color,
    outline: "2px solid",
    outlineColor,
    borderRadius: "full",
    verticalAlign: "top",
    position: "relative",
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  badge: baseStyleBadge(props),
  excessLabel: baseStyleExcessLabel(props),
  container: baseStyleContainer(props),
})

function getSize(
  size: keyof typeof themeSizes | "100%"
): PartsStyleObject<typeof parts> {
  const themeSize = size !== "100%" ? themeSizes[size] : undefined
  return {
    container: {
      width: size,
      height: size,
      fontSize: `calc(${themeSize ?? size} / 2.5)`,
    },
    excessLabel: {
      width: size,
      height: size,
    },
    label: {
      fontSize: `calc(${themeSize ?? size} / 2.5)`,
      lineHeight: size !== "100%" ? themeSize ?? size : undefined,
    },
    badge: {
      width: `calc(${themeSize ?? size} / 2.5)`,
      height: `calc(${themeSize ?? size} / 2.5)`,
    },
  }
}

const sizes = {
  "2xs": getSize(4),
  xs: getSize(6),
  sm: getSize(8),
  md: getSize(12),
  lg: getSize(16),
  xl: getSize(24),
  "2xl": getSize(32),
  full: getSize("100%"),
}

const defaultProps = {
  size: "md",
}

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
}
