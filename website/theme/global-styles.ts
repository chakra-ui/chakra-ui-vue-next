import { mode } from "@chakra-ui/vue-theme-tools"

export const globalStyles = {
  "html, body": {
    color: "bodyText",
    bg: "bodyBg",
  },
  table: {
    width: "100%",
    marginY: "8",
    th: {
      bg: "gray.100",
    },
    "th, td": {
      borderWidth: "1px",
      py: "3",
      px: "5",
      textAlign: "start",
    },
  },

  mark: {
    bg: "transparent",
  },

  ".chakra-prose": {
    output: {
      fontFeatureSettings: "tnum",
      fontVariantNumeric: "tabular-nums",
    },
    "li:not([role])": {
      marginY: "1",
    },
    "ol:not([role]), ul:not([role])": {
      marginY: "5",
      paddingLeft: "4",
    },
    "h2,h3,h4": {
      scrollMarginTop: "24",
      "&:hover": {
        "a.anchor": { opacity: 1 },
      },
      "a:focus": { opacity: 1 },
    },
    "p, li:not([role])": {
      lineHeight: "tall",
    },
    "p + p": {
      marginTop: "6",
    },
    "a.anchor": {
      opacity: 0,
      color: "green.400",
      transition: "opacity 0.2s ease-in-out",
      marginX: "3",
      "&:before": {
        content: `"#"`,
      },
      "&:hover": {
        opacity: "1",
      },
    },
  },
}
