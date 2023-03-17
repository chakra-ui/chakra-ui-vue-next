import { SystemStyleObject } from "@chakra-ui/vue-next"

export const home: Record<string, SystemStyleObject> = {
  heading: {
    fontSize: ["3xl", "6xl", "8xl"],
    letterSpacing: ["normal", "normal", "-3px"],
  },
  subheading: {
    fontSize: "3xl",
    letterSpacing: "-1px",
  },
  description: {
    fontSize: "lg",
    letterSpacing: "-3px",
  },
}

export const textStyles = { home }
