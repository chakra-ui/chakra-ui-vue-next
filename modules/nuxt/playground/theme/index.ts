import { extendTheme } from "@chakra-ui/vue-next";
import * as components from "./components";
import { globalStyles } from "./global-styles";
import { textStyles } from "./text-styles";
import { layerStyles } from "./layer-styles";
import { semanticTokens } from "./semantic-tokens";

export default extendTheme({
  fonts: {
    heading: "DM Sans, sans-serif",
    body: "DM Sans, sans-serif",
    mono: "IBM Plex Mono",
  },
  colors: {
    velvet: {
      50: "#ffe2ec",
      100: "#ffb3c5",
      200: "#fc839f",
      300: "#f95278",
      400: "#f62252",
      500: "#dd0939",
      600: "#ad032c",
      700: "#7c001e",
      800: "#4d0012",
      900: "#200005",
    },
  },
  components,
  styles: {
    global: globalStyles,
  },
  config: {
    initialColorMode: "dark",
  },
  semanticTokens,
  textStyles,
  layerStyles,
});
