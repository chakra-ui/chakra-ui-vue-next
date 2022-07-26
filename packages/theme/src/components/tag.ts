import { tagAnatomy as parts } from "@chakra-ui/vue-anatomy"
import type {
  PartsStyleInterpolation,
  PartsStyleObject,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import Badge from "./badge"

const baseStyleContainer: SystemStyleObject = {
  fontWeight: "medium",
  lineHeight: 1.2,
  outline: 0,
  borderRadius: "md",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  maxW: "100%",
  _focusVisible: {
    boxShadow: "outline",
  },
}

const baseStyleLabel: SystemStyleObject = {
  lineHeight: 1.2,
  overflow: "visible",
}

const baseStyleCloseButton: SystemStyleObject = {
  fontSize: "inherit",
  w: "1.25rem",
  h: "1.25rem",
  transitionProperty: "common",
  transitionDuration: "normal",
  borderRadius: "full",
  marginStart: "0.375rem",
  marginEnd: "-1",
  opacity: 0.5,
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    _hover: {
      opacity: 0.4,
    },
    _active: { opacity: 0.4 },
  },
  _focusVisible: {
    boxShadow: "outline",
    bg: "rgba(0, 0, 0, 0.14)",
  },
  _hover: { opacity: 0.8 },
  _active: { opacity: 1 },
}

const baseStyle: PartsStyleObject<typeof parts> = {
  container: baseStyleContainer,
  label: baseStyleLabel,
  closeButton: baseStyleCloseButton,
}

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    container: {
      h: "1.25rem",
      minW: "1.25rem",
      fontSize: "xs",
      px: 2,
    },
    closeButton: {
      marginEnd: "-2px",
      marginStart: "0.35rem",
    },
  },
  md: {
    container: {
      h: "1.5rem",
      minW: "1.5rem",
      fontSize: "sm",
      px: 2,
    },
  },
  lg: {
    container: {
      h: 8,
      minW: 8,
      fontSize: "md",
      px: 3,
    },
  },
}

const variants: Record<string, PartsStyleInterpolation<typeof parts>> = {
  subtle: (props) => ({
    container: Badge.variants.subtle(props),
  }),
  solid: (props) => ({
    container: Badge.variants.solid(props),
  }),
  outline: (props) => ({
    container: Badge.variants.outline(props),
  }),
}

const defaultProps = {
  size: "md",
  variant: "subtle",
  colorScheme: "gray",
}

export default {
  parts: parts.keys,
  variants,
  baseStyle,
  sizes,
  defaultProps,
}
