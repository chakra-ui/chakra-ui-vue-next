import { SystemStyleObject } from "@chakra-ui/styled-system"

const sidebarLink: SystemStyleObject = {
  display: "inline-block",
  paddingY: "1",
  transition: "color 0.2s ease-in-out",
  _activeLink: {
    textDecoration: "underline",
    textUnderlineOffset: "2px",
    fontWeight: "bold",
  },
  _hover: {
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  },
}

const display: Record<string, SystemStyleObject> = {
  "2xl": {
    fontSize: { base: "4xl", sm: "5xl", md: "7xl" },
    fontWeight: "bold",
    lineHeight: "shorter",
    letterSpacing: "tight",
  },

  xl: {
    fontSize: { base: "4xl", md: "6xl" },
    fontWeight: "bold",
    lineHeight: "shorter",
    letterSpacing: "tight",
  },
  lg: {
    fontSize: { base: "3xl", md: "4xl" },
    fontWeight: "bold",
    letterSpacing: "tight",
    lineHeight: "1.2",
  },
  md: {
    fontSize: { base: "xl", md: "2xl" },
    fontWeight: "bold",
    lineHeight: "1.4",
    letterSpacing: "tight",
  },
  sm: {
    fontSize: "xl",
    fontWeight: "semibold",
    lineHeight: "1.5",
  },
  xs: {
    fontWeight: "semibold",
    lineHeight: "1.5",
  },
}

const text: Record<string, SystemStyleObject> = {
  "2xl": {
    fontSize: { base: "xl", md: "2xl" },
    lineHeight: "tall",
  },
  xl: {
    fontSize: { base: "lg", md: "xl" },
    lineHeight: "tall",
  },
  lg: {
    fontSize: "lg",
    lineHeight: "tall",
  },
  md: {
    fontSize: "16px",
    lineHeight: "24px",
  },
  sm: {
    fontSize: "14px",
    lineHeight: "20px",
  },
  xs: {
    fontSize: "12px",
    lineHeight: "18px",
  },
}

const link: SystemStyleObject = {
  color: "textLink",
  cursor: "pointer",
  fontWeight: "medium",
  textDecoration: "underline",
  textDecorationColor: "cyan.default",
  textDecorationThickness: "1px",
  textUnderlineOffset: "2px",
  _hover: {
    textDecorationThickness: "2px",
  },
}

export const textStyles: Record<string, SystemStyleObject> = {
  heading: {
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: "-0.015em",
    lineHeight: "1.24",
    fontSize: { base: "2rem", md: "3.5rem" },
  },
  "heading-2": {
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: "-0.015em",
    lineHeight: "1.24",
    fontSize: { base: "1.75rem", md: "2.75rem" },
  },
  caps: {
    textTransform: "uppercase",
    fontSize: "sm",
    letterSpacing: "widest",
    fontWeight: "bold",
  },
  sidebarLink,
  link,
  display,
}
