import { mode, getColor, transparentize, randomColor, isDark, generateStripe, orient, createBreakpoints } from '@chakra-ui/vue-theme-tools';
import { keyframes } from '@chakra-ui/vue-system';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var parts$n = ["container", "button", "panel"];
var baseStyleContainer$4 = {
  borderTopWidth: "1px",
  borderColor: "inherit",
  _last: {
    borderBottomWidth: "1px"
  }
};
var baseStyleButton = {
  fontSize: "1rem",
  _focus: {
    boxShadow: "outline"
  },
  _hover: {
    bg: "blackAlpha.50"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  px: 4,
  py: 2
};
var baseStylePanel = {
  pt: 2,
  px: 4,
  pb: 5
};
var baseStyle$C = {
  container: baseStyleContainer$4,
  button: baseStyleButton,
  panel: baseStylePanel
};
var Accordion = {
  parts: parts$n,
  baseStyle: baseStyle$C
};

var parts$m = ["container", "title", "icon"];
var baseStyle$B = {
  container: {
    px: 4,
    py: 3
  },
  title: {
    fontWeight: "bold",
    lineHeight: 6,
    mr: 2
  },
  description: {
    lineHeight: 6
  },
  icon: {
    mr: 3,
    w: 5,
    h: 6
  }
};

function getBg(props) {
  var theme = props.theme,
      c = props.colorScheme;
  var lightBg = getColor(theme, c + ".100", c);
  var darkBg = transparentize(c + ".200", 0.16)(theme);
  return mode(lightBg, darkBg)(props);
}

function variantSubtle$1(props) {
  var c = props.colorScheme;
  return {
    container: {
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
}

function variantLeftAccent(props) {
  var c = props.colorScheme;
  return {
    container: {
      pl: 3,
      borderLeft: "4px solid",
      borderColor: mode(c + ".500", c + ".200")(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
}

function variantTopAccent(props) {
  var c = props.colorScheme;
  return {
    container: {
      pt: 2,
      borderTop: "4px solid",
      borderColor: mode(c + ".500", c + ".200")(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
}

function variantSolid$3(props) {
  var c = props.colorScheme;
  return {
    container: {
      bg: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props)
    }
  };
}

var variants$c = {
  subtle: variantSubtle$1,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid$3
};
var defaultProps$o = {
  variant: "subtle"
};
var Alert = {
  parts: parts$m,
  baseStyle: baseStyle$B,
  variants: variants$c,
  defaultProps: defaultProps$o
};

var spacing = {
  px: "1px",
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem"
};

var largeSizes = {
  full: "100%",
  "3xs": "14rem",
  "2xs": "16rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  "8xl": "90rem"
};
var container = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
};

var sizes$l = _extends({}, spacing, largeSizes, {
  container: container
});

var parts$l = ["container", "excessLabel", "badge", "label"];

function baseStyleBadge(props) {
  return {
    transform: "translate(25%, 25%)",
    borderRadius: "full",
    border: "0.2em solid",
    borderColor: mode("white", "gray.800")(props)
  };
}

function baseStyleExcessLabel(props) {
  return {
    bg: mode("gray.200", "whiteAlpha.400")(props)
  };
}

function baseStyleContainer$3(props) {
  var name = props.name,
      theme = props.theme;
  var bg = name ? randomColor({
    string: name
  }) : "gray.400";
  var isBgDark = isDark(bg)(theme);
  var color = "white";
  if (!isBgDark) color = "gray.800";
  var borderColor = mode("white", "gray.800")(props);
  return {
    bg: bg,
    color: color,
    borderColor: borderColor,
    verticalAlign: "top"
  };
}

var baseStyle$A = function baseStyle(props) {
  return {
    badge: baseStyleBadge(props),
    excessLabel: baseStyleExcessLabel(props),
    container: baseStyleContainer$3(props)
  };
};

function getSize$3(size) {
  // @ts-ignore
  var themeSize = sizes$l[size];
  return {
    container: {
      width: size,
      height: size,
      fontSize: "calc(" + (themeSize != null ? themeSize : size) + " / 2.5)"
    },
    excessLabel: {
      width: size,
      height: size
    },
    label: {
      fontSize: "calc(" + (themeSize != null ? themeSize : size) + " / 2.5)",
      lineHeight: size !== "100%" ? themeSize != null ? themeSize : size : undefined
    }
  };
}

var sizes$k = {
  "2xs": getSize$3("4"),
  xs: getSize$3("6"),
  sm: getSize$3("8"),
  md: getSize$3("12"),
  lg: getSize$3("16"),
  xl: getSize$3("24"),
  "2xl": getSize$3("32"),
  full: getSize$3("100%")
};
var defaultProps$n = {
  size: "md"
};
var Avatar = {
  parts: parts$l,
  baseStyle: baseStyle$A,
  sizes: sizes$k,
  defaultProps: defaultProps$n
};

var baseStyle$z = {
  px: 1,
  textTransform: "uppercase",
  fontSize: "xs",
  borderRadius: "sm",
  fontWeight: "bold"
};

function variantSolid$2(props) {
  var c = props.colorScheme,
      theme = props.theme;
  var dark = transparentize(c + ".500", 0.6)(theme);
  return {
    bg: mode(c + ".500", dark)(props),
    color: mode("white", "whiteAlpha.800")(props)
  };
}

function variantSubtle(props) {
  var c = props.colorScheme,
      theme = props.theme;
  var darkBg = transparentize(c + ".200", 0.16)(theme);
  return {
    bg: mode(c + ".100", darkBg)(props),
    color: mode(c + ".800", c + ".200")(props)
  };
}

function variantOutline$2(props) {
  var c = props.colorScheme,
      theme = props.theme;
  var darkColor = transparentize(c + ".200", 0.8)(theme);
  var lightColor = getColor(theme, c + ".500");
  var color = mode(lightColor, darkColor)(props);
  return {
    color: color,
    boxShadow: "inset 0 0 0px 1px " + color
  };
}

var variants$b = {
  solid: variantSolid$2,
  subtle: variantSubtle,
  outline: variantOutline$2
};
var defaultProps$m = {
  variant: "subtle",
  colorScheme: "gray"
};
var Badge = {
  baseStyle: baseStyle$z,
  variants: variants$b,
  defaultProps: defaultProps$m
};

var parts$k = ["link", "separator"];
var baseStyleLink = {
  transition: "all 0.15s ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focus: {
    boxShadow: "outline"
  }
};
var baseStyle$y = {
  link: baseStyleLink
};
var Breadcrumb = {
  parts: parts$k,
  baseStyle: baseStyle$y
};

var baseStyle$x = {
  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "semibold",
  _focus: {
    boxShadow: "outline"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none"
  },
  _hover: {
    _disabled: {
      bg: "initial"
    }
  }
};

function variantGhost(props) {
  var c = props.colorScheme,
      theme = props.theme;

  if (c === "gray") {
    return {
      color: mode("inherit", "whiteAlpha.900")(props),
      _hover: {
        bg: mode("gray.100", "whiteAlpha.200")(props)
      },
      _active: {
        bg: mode("gray.200", "whiteAlpha.300")(props)
      }
    };
  }

  var darkHoverBg = transparentize(c + ".200", 0.12)(theme);
  var darkActiveBg = transparentize(c + ".200", 0.24)(theme);
  return {
    color: mode(c + ".600", c + ".200")(props),
    bg: "transparent",
    _hover: {
      bg: mode(c + ".50", darkHoverBg)(props)
    },
    _active: {
      bg: mode(c + ".100", darkActiveBg)(props)
    }
  };
}

function variantOutline$1(props) {
  var c = props.colorScheme;
  var borderColor = mode("gray.200", "whiteAlpha.300")(props);
  return _extends({
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor"
  }, variantGhost(props));
}

/** Accessible color overrides for less accessible colors. */
var accessibleColorMap = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600"
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600"
  }
};

function variantSolid$1(props) {
  var c = props.colorScheme;

  if (c === "gray") {
    var _bg = mode("gray.100", "whiteAlpha.200")(props);

    return {
      bg: _bg,
      _hover: {
        bg: mode("gray.200", "whiteAlpha.300")(props),
        _disabled: {
          bg: _bg
        }
      },
      _active: {
        bg: mode("gray.300", "whiteAlpha.400")(props)
      }
    };
  }

  var _ref = accessibleColorMap[c] || {},
      _ref$bg = _ref.bg,
      bg = _ref$bg === void 0 ? c + ".500" : _ref$bg,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? "white" : _ref$color,
      _ref$hoverBg = _ref.hoverBg,
      hoverBg = _ref$hoverBg === void 0 ? c + ".600" : _ref$hoverBg,
      _ref$activeBg = _ref.activeBg,
      activeBg = _ref$activeBg === void 0 ? c + ".700" : _ref$activeBg;

  var background = mode(bg, c + ".200")(props);
  return {
    bg: background,
    color: mode(color, "gray.800")(props),
    _hover: {
      bg: mode(hoverBg, c + ".300")(props),
      _disabled: {
        bg: background
      }
    },
    _active: {
      bg: mode(activeBg, c + ".400")(props)
    }
  };
}

function variantLink(props) {
  var c = props.colorScheme;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode(c + ".500", c + ".200")(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none"
      }
    },
    _active: {
      color: mode(c + ".700", c + ".500")(props)
    }
  };
}

var variantUnstyled$2 = {
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: 0,
  p: 0
};
var variants$a = {
  ghost: variantGhost,
  outline: variantOutline$1,
  solid: variantSolid$1,
  link: variantLink,
  unstyled: variantUnstyled$2
};
var sizes$j = {
  lg: {
    h: 12,
    minW: 12,
    fontSize: "lg",
    px: 6
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: "md",
    px: 4
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: "sm",
    px: 3
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: "xs",
    px: 2
  }
};
var defaultProps$l = {
  variant: "solid",
  size: "md",
  colorScheme: "gray"
};
var Button = {
  baseStyle: baseStyle$x,
  variants: variants$a,
  sizes: sizes$j,
  defaultProps: defaultProps$l
};

var parts$j = ["control", "label", "description", "icon"];

function baseStyleControl$1(props) {
  var c = props.colorScheme;
  return {
    w: "100%",
    transition: "box-shadow 250ms",
    border: "2px solid",
    borderRadius: "sm",
    borderColor: "inherit",
    color: "white",
    _checked: {
      bg: mode(c + ".500", c + ".200")(props),
      borderColor: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props),
      _hover: {
        bg: mode(c + ".600", c + ".300")(props),
        borderColor: mode(c + ".600", c + ".300")(props)
      },
      _disabled: {
        borderColor: mode("gray.200", "transparent")(props),
        bg: mode("gray.200", "whiteAlpha.300")(props),
        color: mode("gray.500", "whiteAlpha.500")(props)
      }
    },
    _indeterminate: {
      bg: mode(c + ".500", c + ".200")(props),
      borderColor: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props)
    },
    _disabled: {
      bg: mode("gray.100", "whiteAlpha.100")(props),
      borderColor: mode("gray.100", "transparent")(props)
    },
    _focus: {
      boxShadow: "outline"
    },
    _invalid: {
      borderColor: mode("red.500", "red.300")(props)
    }
  };
}

var baseStyleLabel$3 = {
  userSelect: "none",
  _disabled: {
    opacity: 0.4
  }
};

var baseStyle$w = function baseStyle(props) {
  return {
    control: baseStyleControl$1(props),
    label: baseStyleLabel$3
  };
};

var sizes$i = {
  sm: {
    control: {
      h: 3,
      w: 3
    },
    label: {
      fontSize: "sm"
    },
    icon: {
      fontSize: "0.45rem"
    }
  },
  md: {
    control: {
      w: 4,
      h: 4
    },
    label: {
      fontSize: "md"
    },
    icon: {
      fontSize: "0.625rem"
    }
  },
  lg: {
    control: {
      w: 5,
      h: 5
    },
    label: {
      fontSize: "lg"
    },
    icon: {
      fontSize: "0.625rem"
    }
  }
};
var defaultProps$k = {
  size: "md",
  colorScheme: "blue"
};
var Checkbox = {
  parts: parts$j,
  baseStyle: baseStyle$w,
  sizes: sizes$i,
  defaultProps: defaultProps$k
};

function baseStyle$v(props) {
  var hoverBg = mode("blackAlpha.100", "whiteAlpha.100")(props);
  var activeBg = mode("blackAlpha.200", "whiteAlpha.200")(props);
  return {
    borderRadius: "md",
    transition: "all 0.2s",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      boxShadow: "none"
    },
    _hover: {
      bg: hoverBg
    },
    _active: {
      bg: activeBg
    },
    _focus: {
      boxShadow: "outline"
    }
  };
}

var sizes$h = {
  lg: {
    w: "40px",
    h: "40px",
    fontSize: "16px"
  },
  md: {
    w: "32px",
    h: "32px",
    fontSize: "12px"
  },
  sm: {
    w: "24px",
    h: "24px",
    fontSize: "10px"
  }
};
var defaultProps$j = {
  size: "md"
};
var CloseButton = {
  baseStyle: baseStyle$v,
  sizes: sizes$h,
  defaultProps: defaultProps$j
};

var variants$9 = Badge.variants,
    defaultProps$i = Badge.defaultProps;
var baseStyle$u = {
  fontFamily: "mono",
  fontSize: "sm",
  px: "0.2em",
  borderRadius: "sm"
};
var Code = {
  baseStyle: baseStyle$u,
  variants: variants$9,
  defaultProps: defaultProps$i
};

var baseStyle$t = {
  w: "100%",
  mx: "auto",
  maxW: "60ch",
  px: "1rem"
};
var Container = {
  baseStyle: baseStyle$t
};

var baseStyle$s = {
  opacity: 0.6,
  borderColor: "inherit"
};
var variantSolid = {
  borderStyle: "solid"
};
var variantDashed = {
  borderStyle: "dashed"
};
var variants$8 = {
  solid: variantSolid,
  dashed: variantDashed
};
var defaultProps$h = {
  variant: "solid"
};
var Divider = {
  baseStyle: baseStyle$s,
  variants: variants$8,
  defaultProps: defaultProps$h
};

var parts$i = ["overlay", "dialogContainer", "dialog", "header", "closeButton", "body", "footer"];
var baseStyleOverlay$1 = {
  bg: "blackAlpha.600",
  zIndex: "modal"
};

function baseStyleDialogContainer$1(props) {
  var isCentered = props.isCentered,
      scrollBehavior = props.scrollBehavior;
  return {
    display: "flex",
    zIndex: "modal",
    justifyContent: "center",
    alignItems: isCentered ? "center" : "flex-start",
    overflow: scrollBehavior === "inside" ? "hidden" : "auto"
  };
}

function baseStyleDialog$1(props) {
  var scrollBehavior = props.scrollBehavior;
  return {
    borderRadius: "md",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    my: "3.75rem",
    zIndex: "modal",
    maxH: scrollBehavior === "inside" ? "calc(100% - 7.5rem)" : undefined,
    boxShadow: mode("lg", "dark-lg")(props)
  };
}

var baseStyleHeader$2 = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold"
};
var baseStyleCloseButton$1 = {
  position: "absolute",
  top: 2,
  insetEnd: 3
};

function baseStyleBody$2(props) {
  var scrollBehavior = props.scrollBehavior;
  return {
    px: 6,
    py: 2,
    flex: 1,
    overflow: scrollBehavior === "inside" ? "auto" : undefined
  };
}

var baseStyleFooter$2 = {
  px: 6,
  py: 4
};

var baseStyle$r = function baseStyle(props) {
  return {
    overlay: baseStyleOverlay$1,
    dialogContainer: baseStyleDialogContainer$1(props),
    dialog: baseStyleDialog$1(props),
    header: baseStyleHeader$2,
    closeButton: baseStyleCloseButton$1,
    body: baseStyleBody$2(props),
    footer: baseStyleFooter$2
  };
};
/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */


function getSize$2(value) {
  if (value === "full") {
    return {
      dialog: {
        maxW: "100vw",
        minH: "100vh"
      }
    };
  }

  return {
    dialog: {
      maxW: value
    }
  };
}

var sizes$g = {
  xs: getSize$2("xs"),
  sm: getSize$2("sm"),
  md: getSize$2("md"),
  lg: getSize$2("lg"),
  xl: getSize$2("xl"),
  "2xl": getSize$2("2xl"),
  "3xl": getSize$2("3xl"),
  "4xl": getSize$2("4xl"),
  "5xl": getSize$2("5xl"),
  "6xl": getSize$2("6xl"),
  full: getSize$2("full")
};
var defaultProps$g = {
  size: "md"
};
var Modal = {
  parts: parts$i,
  baseStyle: baseStyle$r,
  sizes: sizes$g,
  defaultProps: defaultProps$g
};

var parts$h = Modal.parts;
/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */

function getSize$1(value) {
  if (value === "full") {
    return {
      dialog: {
        maxW: "100vw",
        h: "100vh"
      }
    };
  }

  return {
    dialog: {
      maxW: value
    }
  };
}

var baseStyleOverlay = {
  bg: "blackAlpha.600",
  zIndex: "overlay"
};
var baseStyleDialogContainer = {
  display: "flex",
  zIndex: "modal",
  justifyContent: "center"
};

function baseStyleDialog(props) {
  var isFullHeight = props.isFullHeight;
  return _extends({}, isFullHeight && {
    height: "100vh"
  }, {
    zIndex: "modal",
    maxH: "100vh",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    boxShadow: mode("lg", "dark-lg")(props)
  });
}

var baseStyleHeader$1 = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold"
};
var baseStyleBody$1 = {
  px: 6,
  py: 2,
  flex: 1,
  overflow: "auto"
};
var baseStyleFooter$1 = {
  px: 6,
  py: 4
};

var baseStyle$q = function baseStyle(props) {
  return {
    overlay: baseStyleOverlay,
    dialogContainer: baseStyleDialogContainer,
    dialog: baseStyleDialog(props),
    header: baseStyleHeader$1,
    body: baseStyleBody$1,
    footer: baseStyleFooter$1
  };
};

var sizes$f = {
  xs: getSize$1("xs"),
  sm: getSize$1("md"),
  md: getSize$1("lg"),
  lg: getSize$1("2xl"),
  xl: getSize$1("4xl"),
  full: getSize$1("full")
};
var defaultProps$f = {
  size: "xs"
};
var Drawer = {
  parts: parts$h,
  baseStyle: baseStyle$q,
  sizes: sizes$f,
  defaultProps: defaultProps$f
};

var parts$g = ["preview", "input"];
var baseStylePreview = {
  borderRadius: "md",
  py: "3px",
  transition: "all 0.2s"
};
var baseStyleInput$1 = {
  borderRadius: "md",
  py: "3px",
  transition: "all 0.2s",
  width: "full",
  _focus: {
    boxShadow: "outline"
  },
  _placeholder: {
    opacity: 0.6
  }
};
var baseStyle$p = {
  preview: baseStylePreview,
  input: baseStyleInput$1
};
var Editable = {
  parts: parts$g,
  baseStyle: baseStyle$p
};

var parts$f = ["errorText", "errorIcon", "requiredIndicator", "helperText"];

function baseStyleErrorText(props) {
  return {
    color: mode("red.500", "red.300")(props),
    mt: 2,
    fontSize: "sm"
  };
}

function baseStyleRequiredIndicator(props) {
  return {
    ml: 1,
    color: mode("red.500", "red.300")(props)
  };
}

function baseStyleHelperText(props) {
  return {
    mt: 2,
    color: mode("gray.500", "whiteAlpha.600")(props),
    lineHeight: "normal",
    fontSize: "sm"
  };
}

function baseStyleErrorIcon(props) {
  return {
    mr: "0.5em",
    color: mode("red.500", "red.300")(props)
  };
}

var baseStyle$o = function baseStyle(props) {
  return {
    errorText: baseStyleErrorText(props),
    requiredIndicator: baseStyleRequiredIndicator(props),
    helperText: baseStyleHelperText(props),
    errorIcon: baseStyleErrorIcon(props)
  };
};

var Form = {
  parts: parts$f,
  baseStyle: baseStyle$o
};

var baseStyle$n = {
  fontSize: "md",
  mr: 3,
  mb: 2,
  fontWeight: "medium",
  transition: "all 0.2s",
  opacity: 1,
  _disabled: {
    opacity: 0.4
  }
};
var FormLabel = {
  baseStyle: baseStyle$n
};

var baseStyle$m = {
  fontFamily: "heading",
  fontWeight: "bold"
};
var sizes$e = {
  "4xl": {
    fontSize: ["6xl", null, "7xl"],
    lineHeight: 1
  },
  "3xl": {
    fontSize: ["5xl", null, "6xl"],
    lineHeight: 1
  },
  "2xl": {
    fontSize: ["4xl", null, "5xl"],
    lineHeight: ["2.5rem", null, "1"]
  },
  xl: {
    fontSize: ["3xl", null, "4xl"],
    lineHeight: ["2.25rem", null, "2.5rem"]
  },
  lg: {
    fontSize: ["2xl", null, "3xl"],
    lineHeight: ["2rem", null, "2.25rem"]
  },
  md: {
    fontSize: "xl",
    lineHeight: "1.75rem"
  },
  sm: {
    fontSize: "md",
    lineHeight: "1.5rem"
  },
  xs: {
    fontSize: "sm",
    lineHeight: "1.25rem"
  }
};
var defaultProps$e = {
  size: "xl"
};
var Heading = {
  baseStyle: baseStyle$m,
  sizes: sizes$e,
  defaultProps: defaultProps$e
};

var parts$e = ["field", "addon"];
var baseStyle$l = {
  field: {
    width: "100%",
    outline: 0,
    position: "relative",
    appearance: "none",
    transition: "all 0.2s"
  }
};
var size = {
  lg: {
    fontSize: "lg",
    pl: 4,
    pr: 4,
    h: 12,
    borderRadius: "md"
  },
  md: {
    fontSize: "md",
    pl: 4,
    pr: 4,
    h: 10,
    borderRadius: "md"
  },
  sm: {
    fontSize: "sm",
    pl: 3,
    pr: 3,
    h: 8,
    borderRadius: "sm"
  }
};
var sizes$d = {
  lg: {
    field: size.lg,
    addon: size.lg
  },
  md: {
    field: size.md,
    addon: size.md
  },
  sm: {
    field: size.sm,
    addon: size.sm
  }
};

function getDefaults(props) {
  var fc = props.focusBorderColor,
      ec = props.errorBorderColor;
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props)
  };
}

function variantOutline(props) {
  var theme = props.theme;

  var _getDefaults = getDefaults(props),
      fc = _getDefaults.focusBorderColor,
      ec = _getDefaults.errorBorderColor;

  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: "0 0 0 1px " + getColor(theme, fc)
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: "0 0 0 1px " + getColor(theme, ec)
      }
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props)
    }
  };
}

function variantFilled(props) {
  var theme = props.theme;

  var _getDefaults2 = getDefaults(props),
      fc = _getDefaults2.focusBorderColor,
      ec = _getDefaults2.errorBorderColor;

  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      },
      _focus: {
        bg: "transparent",
        borderColor: getColor(theme, fc)
      },
      _invalid: {
        borderColor: getColor(theme, ec)
      }
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props)
    }
  };
}

function variantFlushed(props) {
  var theme = props.theme;

  var _getDefaults3 = getDefaults(props),
      fc = _getDefaults3.focusBorderColor,
      ec = _getDefaults3.errorBorderColor;

  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: 0,
      pl: 0,
      pr: 0,
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _focus: {
        borderColor: getColor(theme, fc),
        boxShadow: "0px 1px 0px 0px " + getColor(theme, fc)
      },
      _invalid: {
        borderColor: getColor(theme, ec)
      }
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: 0,
      paddingX: 0,
      bg: "transparent"
    }
  };
}

var variantUnstyled$1 = {
  field: {
    bg: "transparent",
    pl: 0,
    pr: 0,
    height: "auto"
  },
  addon: {
    bg: "transparent",
    pl: 0,
    pr: 0,
    height: "auto"
  }
};
var variants$7 = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled$1
};
var defaultProps$d = {
  size: "md",
  variant: "outline"
};
var Input = {
  parts: parts$e,
  baseStyle: baseStyle$l,
  sizes: sizes$d,
  variants: variants$7,
  defaultProps: defaultProps$d
};

function baseStyle$k(props) {
  return {
    bg: mode("gray.100", "whiteAlpha")(props),
    borderRadius: "md",
    borderWidth: "1px",
    borderBottomWidth: "3px",
    fontSize: "0.8em",
    fontWeight: "bold",
    lineHeight: "normal",
    px: "0.4em",
    whiteSpace: "nowrap"
  };
}

var Kbd = {
  baseStyle: baseStyle$k
};

var baseStyle$j = {
  transition: "all 0.15s ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focus: {
    boxShadow: "outline"
  }
};
var Link = {
  baseStyle: baseStyle$j
};

var parts$d = ["container", "item", "icon"];
var baseStyleContainer$2 = {};
var baseStyleItem$1 = {};
var baseStyleIcon$2 = {
  marginEnd: "0.5rem",
  display: "inline",
  verticalAlign: "text-bottom"
};
var baseStyle$i = {
  container: baseStyleContainer$2,
  item: baseStyleItem$1,
  icon: baseStyleIcon$2
};
var List = {
  parts: parts$d,
  baseStyle: baseStyle$i
};

var parts$c = ["item", "command", "list", "button", "groupTitle", "divider"];

function baseStyleList(props) {
  return {
    bg: mode("#fff", "gray.700")(props),
    boxShadow: mode("sm", "dark-lg")(props),
    color: "inherit",
    minW: "3xs",
    py: "2",
    zIndex: 1,
    borderRadius: "md",
    borderWidth: "1px"
  };
}

function baseStyleItem(props) {
  return {
    py: "0.4rem",
    px: "0.8rem",
    transition: "background 50ms ease-in 0s",
    _focus: {
      bg: mode("gray.100", "whiteAlpha.100")(props)
    },
    _active: {
      bg: mode("gray.200", "whiteAlpha.200")(props)
    },
    _expanded: {
      bg: mode("gray.100", "whiteAlpha.100")(props)
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  };
}

var baseStyleGroupTitle = {
  mx: 4,
  my: 2,
  fontWeight: "semibold",
  fontSize: "sm"
};
var baseStyleCommand = {
  opacity: 0.6
};
var baseStyleDivider = {
  border: 0,
  borderBottom: "1px solid",
  borderColor: "inherit",
  my: "0.5rem",
  opacity: 0.6
};

var baseStyle$h = function baseStyle(props) {
  return {
    list: baseStyleList(props),
    item: baseStyleItem(props),
    groupTitle: baseStyleGroupTitle,
    command: baseStyleCommand,
    divider: baseStyleDivider
  };
};

var Menu = {
  parts: parts$c,
  baseStyle: baseStyle$h
};

var _Input$baseStyle;
var parts$b = ["field", "stepper", "stepperGroup"];
var variants$6 = Input.variants,
    defaultProps$c = Input.defaultProps;
var baseStyleField$1 = (_Input$baseStyle = Input.baseStyle) == null ? void 0 : _Input$baseStyle.field;
var baseStyleStepperGroup = {
  width: "24px"
};

function baseStyleStepper(props) {
  return {
    borderLeft: "1px solid",
    borderColor: mode("inherit", "whiteAlpha.300")(props),
    color: mode("inherit", "whiteAlpha.800")(props),
    _active: {
      bg: mode("gray.200", "whiteAlpha.300")(props)
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  };
}

var baseStyle$g = function baseStyle(props) {
  return {
    field: baseStyleField$1,
    stepperGroup: baseStyleStepperGroup,
    stepper: baseStyleStepper(props)
  };
};

function getSize(size) {
  var _Input$sizes;

  var sizeStyle = (_Input$sizes = Input.sizes) == null ? void 0 : _Input$sizes[size];
  var radius = {
    lg: "md",
    md: "md",
    sm: "sm"
  };
  return {
    field: sizeStyle == null ? void 0 : sizeStyle.field,
    stepper: {
      fontSize: size === "lg" ? "14px" : "10px",
      _first: {
        borderTopRightRadius: radius[size]
      },
      _last: {
        borderBottomRightRadius: radius[size],
        mt: "-1px",
        borderTopWidth: 1
      }
    }
  };
}

var sizes$c = {
  sm: getSize("sm"),
  md: getSize("md"),
  lg: getSize("lg")
};
var NumberInput = {
  parts: parts$b,
  baseStyle: baseStyle$g,
  sizes: sizes$c,
  variants: variants$6,
  defaultProps: defaultProps$c
};

var baseStyle$f = _extends({}, Input.baseStyle.field, {
  textAlign: "center"
});

var sizes$b = {
  lg: {
    fontSize: "lg",
    w: 12,
    h: 12,
    borderRadius: "md"
  },
  md: {
    fontSize: "md",
    w: 10,
    h: 10,
    borderRadius: "md"
  },
  sm: {
    fontSize: "sm",
    w: 8,
    h: 8,
    borderRadius: "sm"
  }
};
var variants$5 = {
  outline: function outline(props) {
    return Input.variants.outline(props).field;
  },
  flushed: function flushed(props) {
    return Input.variants.flushed(props).field;
  },
  filled: function filled(props) {
    return Input.variants.filled(props).field;
  },
  unstyled: Input.variants.unstyled.field
};
var defaultProps$b = Input.defaultProps;
var PinInput = {
  baseStyle: baseStyle$f,
  sizes: sizes$b,
  variants: variants$5,
  defaultProps: defaultProps$b
};

var parts$a = ["popper", "content", "header", "body", "footer", "arrow"];
var baseStylePopper = {
  w: "100%",
  maxW: "xs",
  zIndex: 10
};

function baseStyleContent(props) {
  return {
    bg: mode("white", "gray.700")(props),
    border: "1px solid",
    borderColor: "inherit",
    borderRadius: "md",
    boxShadow: "sm",
    zIndex: "inherit",
    _focus: {
      outline: 0,
      boxShadow: "outline"
    }
  };
}

function baseStyleArrow(props) {
  return {
    bg: mode("white", "gray.700")(props)
  };
}

var baseStyleHeader = {
  px: 3,
  py: 2,
  borderBottomWidth: "1px"
};
var baseStyleBody = {
  px: 3,
  py: 2
};
var baseStyleFooter = {
  px: 3,
  py: 2,
  borderTopWidth: "1px"
};

var baseStyle$e = function baseStyle(props) {
  return {
    popper: baseStylePopper,
    content: baseStyleContent(props),
    header: baseStyleHeader,
    body: baseStyleBody,
    footer: baseStyleFooter,
    arrow: baseStyleArrow(props)
  };
};

var Popover = {
  parts: parts$a,
  baseStyle: baseStyle$e
};

var parts$9 = ["track", "filledTrack", "panel"];

function filledStyle(props) {
  var c = props.colorScheme,
      t = props.theme,
      isIndeterminate = props.isIndeterminate,
      hasStripe = props.hasStripe;
  var stripeStyle = mode(generateStripe(), generateStripe("1rem", "rgba(0,0,0,0.1)"))(props);
  var bgColor = mode(c + ".500", c + ".200")(props);
  var gradient = "linear-gradient(\n    to right,\n    transparent 0%,\n    " + getColor(t, bgColor) + " 50%,\n    transparent 100%\n  )";
  var addStripe = !isIndeterminate && hasStripe;
  return _extends({}, addStripe && stripeStyle, isIndeterminate ? {
    bgImage: gradient
  } : {
    bgColor: bgColor
  });
}

var baseStyleLabel$2 = {
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white"
};

function baseStyleTrack$2(props) {
  return {
    bg: mode("gray.100", "whiteAlpha.300")(props)
  };
}

function baseStyleFilledTrack$1(props) {
  return _extends({
    transition: "all 0.3s"
  }, filledStyle(props));
}

var baseStyle$d = function baseStyle(props) {
  return {
    label: baseStyleLabel$2,
    filledTrack: baseStyleFilledTrack$1(props),
    track: baseStyleTrack$2(props)
  };
};

var sizes$a = {
  xs: {
    track: {
      h: "0.25rem"
    }
  },
  sm: {
    track: {
      h: "0.5rem"
    }
  },
  md: {
    track: {
      h: "0.75rem"
    }
  },
  lg: {
    track: {
      h: "1rem"
    }
  }
};
var defaultProps$a = {
  size: "md",
  colorScheme: "blue"
};
var Progress = {
  parts: parts$9,
  sizes: sizes$a,
  baseStyle: baseStyle$d,
  defaultProps: defaultProps$a
};

var parts$8 = ["control", "label"];

function baseStyleControl(props) {
  var _Checkbox$baseStyle = Checkbox.baseStyle(props),
      control = _Checkbox$baseStyle.control;

  return _extends({}, control, {
    borderRadius: "full",
    _checked: _extends({}, control["_checked"], {
      _before: {
        content: "\"\"",
        display: "inline-block",
        pos: "relative",
        w: "50%",
        h: "50%",
        borderRadius: "50%",
        bg: "currentColor"
      }
    })
  });
}

var baseStyle$c = function baseStyle(props) {
  return {
    label: Checkbox.baseStyle(props).label,
    control: baseStyleControl(props)
  };
};

var sizes$9 = {
  md: {
    control: {
      w: 4,
      h: 4
    },
    label: {
      fontSize: "md"
    }
  },
  lg: {
    control: {
      w: 5,
      h: 5
    },
    label: {
      fontSize: "lg"
    }
  },
  sm: {
    control: {
      width: 3,
      height: 3
    },
    label: {
      fontSize: "sm"
    }
  }
};
var defaultProps$9 = {
  size: "md",
  colorScheme: "blue"
};
var Radio = {
  parts: parts$8,
  baseStyle: baseStyle$c,
  sizes: sizes$9,
  defaultProps: defaultProps$9
};

var sizes$8 = Input.sizes,
    defaultProps$8 = Input.defaultProps,
    variants$4 = Input.variants;
var parts$7 = ["field", "icon"];

function baseStyleField(props) {
  return _extends({}, Input.baseStyle.field, {
    appearance: "none",
    paddingBottom: "1px",
    lineHeight: "normal",
    "> option": {
      bg: mode("white", "gray.700")(props)
    }
  });
}

var baseStyleInput = {
  color: "currentColor",
  fontSize: "1.25rem",
  _disabled: {
    opacity: 0.5
  }
};

var baseStyle$b = function baseStyle(props) {
  return {
    field: baseStyleField(props),
    icon: baseStyleInput
  };
};

var Select = {
  parts: parts$7,
  baseStyle: baseStyle$b,
  sizes: sizes$8,
  variants: variants$4,
  defaultProps: defaultProps$8
};

var fade = function fade(startColor, endColor) {
  return keyframes({
    from: {
      borderColor: startColor,
      background: startColor
    },
    to: {
      borderColor: endColor,
      background: endColor
    }
  });
};

var baseStyle$a = function baseStyle(props) {
  var defaultStartColor = mode("gray.100", "gray.800")(props);
  var defaultEndColor = mode("gray.400", "gray.600")(props);
  var _props$startColor = props.startColor,
      startColor = _props$startColor === void 0 ? defaultStartColor : _props$startColor,
      _props$endColor = props.endColor,
      endColor = _props$endColor === void 0 ? defaultEndColor : _props$endColor,
      speed = props.speed,
      theme = props.theme;
  var start = getColor(theme, startColor);
  var end = getColor(theme, endColor);
  return {
    opacity: 0.7,
    borderRadius: "2px",
    borderColor: start,
    background: end,
    animation: speed + "s linear infinite alternate " + fade(start, end)
  };
};

var Skeleton = {
  baseStyle: baseStyle$a
};

var baseStyle$9 = function baseStyle(props) {
  return {
    borderRadius: "md",
    fontWeight: "semibold",
    _focus: {
      boxShadow: "outline",
      padding: "1rem",
      position: "fixed",
      top: "1.5rem",
      left: "1.5rem",
      bg: mode("white", "gray.700")(props)
    }
  };
};

var SkipLink = {
  baseStyle: baseStyle$9
};

var parts$6 = ["container", "thumb", "track", "filledTrack"];

function thumbOrientation(props) {
  return orient({
    orientation: props.orientation,
    vertical: {
      left: "50%",
      transform: "translateX(-50%)",
      _active: {
        transform: "translateX(-50%) scale(1.15)"
      }
    },
    horizontal: {
      top: "50%",
      transform: "translateY(-50%)",
      _active: {
        transform: "translateY(-50%) scale(1.15)"
      }
    }
  });
}

var baseStyleContainer$1 = function baseStyleContainer(props) {
  var orientation = props.orientation;
  return _extends({
    _disabled: {
      opacity: 0.6,
      cursor: "default",
      pointerEvents: "none"
    }
  }, orient({
    orientation: orientation,
    vertical: {
      h: "100%"
    },
    horizontal: {
      w: "100%"
    }
  }));
};

function baseStyleTrack$1(props) {
  return {
    borderRadius: "sm",
    bg: mode("gray.200", "whiteAlpha.200")(props),
    _disabled: {
      bg: mode("gray.300", "whiteAlpha.300")(props)
    }
  };
}

function baseStyleThumb$1(props) {
  return _extends({
    zIndex: 1,
    borderRadius: "full",
    bg: "white",
    boxShadow: "base",
    border: "1px solid",
    borderColor: "transparent",
    transition: "transform 0.2s",
    _focus: {
      boxShadow: "outline"
    },
    _disabled: {
      bg: "gray.300"
    }
  }, thumbOrientation(props));
}

function baseStyleFilledTrack(props) {
  var c = props.colorScheme;
  return {
    bg: mode(c + ".500", c + ".200")(props)
  };
}

var baseStyle$8 = function baseStyle(props) {
  return {
    container: baseStyleContainer$1(props),
    track: baseStyleTrack$1(props),
    thumb: baseStyleThumb$1(props),
    filledTrack: baseStyleFilledTrack(props)
  };
};

function sizeLg(props) {
  return {
    thumb: {
      w: "16px",
      h: "16px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "4px"
      },
      vertical: {
        w: "4px"
      }
    })
  };
}

function sizeMd(props) {
  return {
    thumb: {
      w: "14px",
      h: "14px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "4px"
      },
      vertical: {
        w: "4px"
      }
    })
  };
}

function sizeSm(props) {
  return {
    thumb: {
      w: "10px",
      h: "10px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "2px"
      },
      vertical: {
        w: "2px"
      }
    })
  };
}

var sizes$7 = {
  lg: sizeLg,
  md: sizeMd,
  sm: sizeSm
};
var defaultProps$7 = {
  size: "md",
  colorScheme: "blue"
};
var Slider = {
  parts: parts$6,
  sizes: sizes$7,
  baseStyle: baseStyle$8,
  defaultProps: defaultProps$7
};

var sizes$6 = {
  xs: {
    w: "0.75rem",
    h: "0.75rem"
  },
  sm: {
    w: "1rem",
    h: "1rem"
  },
  md: {
    w: "1.5rem",
    h: "1.5rem"
  },
  lg: {
    w: "2rem",
    h: "2rem"
  },
  xl: {
    w: "3rem",
    h: "3rem"
  }
};
var defaultProps$6 = {
  size: "md"
};
var Spinner = {
  sizes: sizes$6,
  defaultProps: defaultProps$6
};

var parts$5 = ["label", "number", "icon", "helpText"];
var baseStyleLabel$1 = {
  fontWeight: "medium"
};
var baseStyleHelpText = {
  opacity: 0.8,
  marginBottom: 2
};
var baseStyleNumber = {
  verticalAlign: "baseline",
  fontWeight: "semibold"
};
var baseStyleIcon$1 = {
  mr: 1,
  w: "14px",
  h: "14px",
  verticalAlign: "middle"
};
var baseStyle$7 = {
  label: baseStyleLabel$1,
  helpText: baseStyleHelpText,
  number: baseStyleNumber,
  icon: baseStyleIcon$1
};
var sizes$5 = {
  md: {
    label: {
      fontSize: "sm"
    },
    helpText: {
      fontSize: "sm"
    },
    number: {
      fontSize: "2xl"
    }
  }
};
var defaultProps$5 = {
  size: "md"
};
var Stat = {
  parts: parts$5,
  baseStyle: baseStyle$7,
  sizes: sizes$5,
  defaultProps: defaultProps$5
};

var parts$4 = ["track", "thumb"];

function baseStyleTrack(props) {
  var c = props.colorScheme;
  return {
    borderRadius: "full",
    p: "2px",
    transition: "all 120ms",
    bg: mode("gray.300", "whiteAlpha.400")(props),
    _focus: {
      boxShadow: "outline"
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    },
    _checked: {
      bg: mode(c + ".500", c + ".200")(props)
    }
  };
}

var baseStyleThumb = {
  bg: "white",
  transition: "transform 250ms",
  borderRadius: "full",
  transform: "translateX(0)"
};

var baseStyle$6 = function baseStyle(props) {
  return {
    track: baseStyleTrack(props),
    thumb: baseStyleThumb
  };
};

var sizes$4 = {
  sm: {
    track: {
      w: "1.375rem",
      h: "0.75rem"
    },
    thumb: {
      w: "0.75rem",
      h: "0.75rem",
      _checked: {
        transform: "translateX(0.625rem)"
      }
    }
  },
  md: {
    track: {
      w: "1.875rem",
      h: "1rem"
    },
    thumb: {
      w: "1rem",
      h: "1rem",
      _checked: {
        transform: "translateX(0.875rem)"
      }
    }
  },
  lg: {
    track: {
      w: "2.875rem",
      h: "1.5rem"
    },
    thumb: {
      w: "1.5rem",
      h: "1.5rem",
      _checked: {
        transform: "translateX(1.375rem)"
      }
    }
  }
};
var defaultProps$4 = {
  size: "md",
  colorScheme: "blue"
};
var Switch = {
  parts: parts$4,
  baseStyle: baseStyle$6,
  sizes: sizes$4,
  defaultProps: defaultProps$4
};

var parts$3 = ["table", "thead", "tbody", "tr", "th", "td", "caption"];
var baseStyle$5 = {
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full"
  },
  th: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    textAlign: "left"
  },
  td: {
    textAlign: "left"
  },
  caption: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium"
  }
};
var numericStyles = {
  "&[data-is-numeric=true]": {
    textAlign: "right"
  }
};

var simpleVariant = function simpleVariant(props) {
  var c = props.colorScheme;
  return {
    th: _extends({
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    td: _extends({
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    caption: {
      color: mode("gray.600", "gray.100")(props)
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: {
            borderBottomWidth: 0
          }
        }
      }
    }
  };
};

var stripedVariant = function stripedVariant(props) {
  var c = props.colorScheme;
  return {
    th: _extends({
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    td: _extends({
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    caption: {
      color: mode("gray.600", "gray.100")(props)
    },
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: mode(c + ".100", c + ".700")(props)
          },
          td: {
            background: mode(c + ".100", c + ".700")(props)
          }
        }
      }
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: {
            borderBottomWidth: 0
          }
        }
      }
    }
  };
};

var variants$3 = {
  simple: simpleVariant,
  striped: stripedVariant,
  unstyled: {}
};
var sizes$3 = {
  sm: {
    th: {
      px: "4",
      py: "1",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "4",
      py: "2",
      fontSize: "sm",
      lineHeight: "4"
    },
    caption: {
      px: "4",
      py: "2",
      fontSize: "xs"
    }
  },
  md: {
    th: {
      px: "6",
      py: "3",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "6",
      py: "4",
      lineHeight: "5"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "sm"
    }
  },
  lg: {
    th: {
      px: "8",
      py: "4",
      lineHeight: "5",
      fontSize: "sm"
    },
    td: {
      px: "8",
      py: "5",
      lineHeight: "6"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "md"
    }
  }
};
var defaultProps$3 = {
  variant: "simple",
  size: "md",
  colorScheme: "gray"
};
var Table = {
  parts: parts$3,
  baseStyle: baseStyle$5,
  variants: variants$3,
  sizes: sizes$3,
  defaultProps: defaultProps$3
};

var parts$2 = ["tablist", "tab", "tabpanel", "indicator"];

function baseStyleTab(props) {
  var isFitted = props.isFitted;
  return {
    flex: isFitted ? 1 : undefined,
    transition: "all 0.2s",
    _focus: {
      zIndex: 1,
      boxShadow: "outline"
    }
  };
}

function baseStyleTablist(props) {
  var _props$align = props.align,
      align = _props$align === void 0 ? "start" : _props$align,
      orientation = props.orientation;
  var alignments = {
    end: "flex-end",
    center: "center",
    start: "flex-start"
  };
  return {
    // @ts-ignore
    justifyContent: alignments[align],
    flexDirection: orientation === "vertical" ? "column" : "row"
  };
}

var baseStyleTabpanel = {
  p: 4
};

var baseStyle$4 = function baseStyle(props) {
  return {
    tab: baseStyleTab(props),
    tablist: baseStyleTablist(props),
    tabpanel: baseStyleTabpanel
  };
};

var sizes$2 = {
  sm: {
    tab: {
      py: "0.25rem",
      px: "1rem",
      fontSize: "0.85rem"
    }
  },
  md: {
    tab: {
      fontSize: "1rem",
      py: "0.5rem",
      px: "1rem"
    }
  },
  lg: {
    tab: {
      fontSize: "1.15rem",
      py: "0.75rem",
      px: "1rem"
    }
  }
};

function variantLine(props) {
  var _tablist, _tab;

  var c = props.colorScheme,
      orientation = props.orientation;
  var borderProp = orientation === "vertical" ? "borderLeft" : "borderBottom";
  return {
    tablist: (_tablist = {}, _tablist[borderProp] = "2px solid", _tablist.borderColor = "inherit", _tablist),
    tab: (_tab = {}, _tab[borderProp] = "2px solid", _tab.borderColor = "transparent", _tab.mb = "-2px", _tab._selected = {
      color: mode(c + ".600", c + ".300")(props),
      borderColor: "currentColor"
    }, _tab._active = {
      bg: mode("gray.200", "whiteAlpha.300")(props)
    }, _tab._disabled = {
      opacity: 0.4,
      cursor: "not-allowed"
    }, _tab)
  };
}

function variantEnclosed(props) {
  var c = props.colorScheme;
  return {
    tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      _selected: {
        color: mode(c + ".600", c + ".300")(props),
        borderColor: "inherit",
        borderBottomColor: mode("white", "gray.800")(props)
      }
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
}

function variantEnclosedColored(props) {
  var c = props.colorScheme;
  return {
    tab: {
      border: "1px solid",
      borderColor: "inherit",
      bg: mode("gray.50", "whiteAlpha.50")(props),
      mb: "-1px",
      _notLast: {
        mr: "-1px"
      },
      _selected: {
        bg: mode("#fff", "gray.800")(props),
        color: mode(c + ".600", c + ".300")(props),
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent"
      }
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
}

function variantSoftRounded(props) {
  var c = props.colorScheme,
      theme = props.theme;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: getColor(theme, c + ".700"),
        bg: getColor(theme, c + ".100")
      }
    }
  };
}

function variantSolidRounded(props) {
  var c = props.colorScheme;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: mode("gray.600", "inherit")(props),
      _selected: {
        color: mode("#fff", "gray.800")(props),
        bg: mode(c + ".600", c + ".300")(props)
      }
    }
  };
}

var variantUnstyled = {};
var variants$2 = {
  line: variantLine,
  enclosed: variantEnclosed,
  "enclosed-colored": variantEnclosedColored,
  "soft-rounded": variantSoftRounded,
  "solid-rounded": variantSolidRounded,
  unstyled: variantUnstyled
};
var defaultProps$2 = {
  size: "md",
  variant: "line",
  colorScheme: "blue"
};
var Tabs = {
  parts: parts$2,
  baseStyle: baseStyle$4,
  sizes: sizes$2,
  variants: variants$2,
  defaultProps: defaultProps$2
};

var parts$1 = ["container", "label", "closeButton"];
var baseStyleContainer = {
  fontWeight: "medium",
  lineHeight: 1.2,
  outline: 0,
  _focus: {
    boxShadow: "outline"
  }
};
var baseStyleLabel = {
  lineHeight: 1.2
};
var baseStyleCloseButton = {
  fontSize: "18px",
  w: "1.25rem",
  h: "1.25rem",
  borderRadius: "sm",
  ml: "0.375rem",
  mr: "-1",
  opacity: 0.5,
  _disabled: {
    opacity: 0.4
  },
  _focus: {
    boxShadow: "outline",
    bg: "rgba(0, 0, 0, 0.14)"
  },
  _hover: {
    opacity: 0.8
  },
  _active: {
    opacity: 1
  }
};
var baseStyle$3 = {
  container: baseStyleContainer,
  label: baseStyleLabel,
  closeButton: baseStyleCloseButton
};
var sizes$1 = {
  sm: {
    container: {
      minH: "1.25rem",
      minW: "1.25rem",
      fontSize: "xs",
      px: 1,
      borderRadius: "sm"
    }
  },
  md: {
    container: {
      minH: "1.5rem",
      minW: "1.5rem",
      fontSize: "sm",
      borderRadius: "md",
      px: 2
    }
  },
  lg: {
    container: {
      minH: 8,
      minW: 8,
      fontSize: "md",
      borderRadius: "md",
      px: 3
    }
  }
};
var variants$1 = {
  subtle: function subtle(props) {
    return {
      container: Badge.variants.subtle(props)
    };
  },
  solid: function solid(props) {
    return {
      container: Badge.variants.solid(props)
    };
  },
  outline: function outline(props) {
    return {
      container: Badge.variants.outline(props)
    };
  }
};
var defaultProps$1 = {
  size: "md",
  variant: "subtle",
  colorScheme: "gray"
};
var Tag = {
  parts: parts$1,
  variants: variants$1,
  baseStyle: baseStyle$3,
  sizes: sizes$1,
  defaultProps: defaultProps$1
};

var baseStyle$2 = _extends({}, Input.baseStyle.field, {
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short"
});

var variants = {
  outline: function outline(props) {
    return Input.variants.outline(props).field;
  },
  flushed: function flushed(props) {
    return Input.variants.flushed(props).field;
  },
  filled: function filled(props) {
    return Input.variants.filled(props).field;
  },
  unstyled: Input.variants.unstyled.field
};
var sizes = {
  sm: Input.sizes.sm.field,
  md: Input.sizes.md.field,
  lg: Input.sizes.lg.field
};
var defaultProps = {
  size: "md",
  variant: "outline"
};
var Textarea = {
  baseStyle: baseStyle$2,
  sizes: sizes,
  variants: variants,
  defaultProps: defaultProps
};

function baseStyle$1(props) {
  return {
    px: "8px",
    py: "2px",
    bg: mode("gray.700", "gray.300")(props),
    color: mode("whiteAlpha.900", "gray.900")(props),
    borderRadius: "sm",
    fontWeight: "medium",
    pointerEvents: "none",
    fontSize: "sm",
    boxShadow: "md",
    maxW: "320px",
    zIndex: "tooltip"
  };
}

var Tooltip = {
  baseStyle: baseStyle$1
};

var parts = ["text", "icon"];

function baseStyleText(props) {
  return {
    color: mode("red.500", "red.300")(props),
    mt: 2,
    fontSize: "sm"
  };
}

function baseStyleIcon(props) {
  return {
    marginEnd: "0.5em",
    color: mode("red.500", "red.300")(props)
  };
}

var baseStyle = function baseStyle(props) {
  return {
    text: baseStyleText(props),
    icon: baseStyleIcon(props)
  };
};

var FormError = {
  parts: parts,
  baseStyle: baseStyle
};

var components = {
  Accordion: Accordion,
  Alert: Alert,
  Avatar: Avatar,
  Badge: Badge,
  Breadcrumb: Breadcrumb,
  Button: Button,
  Checkbox: Checkbox,
  CloseButton: CloseButton,
  Code: Code,
  Container: Container,
  Divider: Divider,
  Drawer: Drawer,
  Editable: Editable,
  Form: Form,
  FormLabel: FormLabel,
  Heading: Heading,
  Input: Input,
  Kbd: Kbd,
  Link: Link,
  List: List,
  Menu: Menu,
  Modal: Modal,
  NumberInput: NumberInput,
  PinInput: PinInput,
  Popover: Popover,
  Progress: Progress,
  Radio: Radio,
  Select: Select,
  Skeleton: Skeleton,
  SkipLink: SkipLink,
  Slider: Slider,
  Spinner: Spinner,
  Stat: Stat,
  Switch: Switch,
  Table: Table,
  Tabs: Tabs,
  Tag: Tag,
  Textarea: Textarea,
  Tooltip: Tooltip,
  FormError: FormError
};

var borders = {
  none: 0,
  "1px": "1px solid",
  "2px": "2px solid",
  "4px": "4px solid",
  "8px": "8px solid"
};

/**
 * Breakpoints for responsive design
 */

var breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em"
});

var colors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#FFFFFF",
  whiteAlpha: {
    50: "rgba(255, 255, 255, 0.04)",
    100: "rgba(255, 255, 255, 0.06)",
    200: "rgba(255, 255, 255, 0.08)",
    300: "rgba(255, 255, 255, 0.16)",
    400: "rgba(255, 255, 255, 0.24)",
    500: "rgba(255, 255, 255, 0.36)",
    600: "rgba(255, 255, 255, 0.48)",
    700: "rgba(255, 255, 255, 0.64)",
    800: "rgba(255, 255, 255, 0.80)",
    900: "rgba(255, 255, 255, 0.92)"
  },
  blackAlpha: {
    50: "rgba(0, 0, 0, 0.04)",
    100: "rgba(0, 0, 0, 0.06)",
    200: "rgba(0, 0, 0, 0.08)",
    300: "rgba(0, 0, 0, 0.16)",
    400: "rgba(0, 0, 0, 0.24)",
    500: "rgba(0, 0, 0, 0.36)",
    600: "rgba(0, 0, 0, 0.48)",
    700: "rgba(0, 0, 0, 0.64)",
    800: "rgba(0, 0, 0, 0.80)",
    900: "rgba(0, 0, 0, 0.92)"
  },
  gray: {
    50: "#F7FAFC",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923"
  },
  red: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E",
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B"
  },
  orange: {
    50: "#FFFAF0",
    100: "#FEEBC8",
    200: "#FBD38D",
    300: "#F6AD55",
    400: "#ED8936",
    500: "#DD6B20",
    600: "#C05621",
    700: "#9C4221",
    800: "#7B341E",
    900: "#652B19"
  },
  yellow: {
    50: "#FFFFF0",
    100: "#FEFCBF",
    200: "#FAF089",
    300: "#F6E05E",
    400: "#ECC94B",
    500: "#D69E2E",
    600: "#B7791F",
    700: "#975A16",
    800: "#744210",
    900: "#5F370E"
  },
  green: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169",
    600: "#2F855A",
    700: "#276749",
    800: "#22543D",
    900: "#1C4532"
  },
  teal: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044"
  },
  blue: {
    50: "#ebf8ff",
    100: "#bee3f8",
    200: "#90cdf4",
    300: "#63b3ed",
    400: "#4299e1",
    500: "#3182ce",
    600: "#2b6cb0",
    700: "#2c5282",
    800: "#2a4365",
    900: "#1A365D"
  },
  cyan: {
    50: "#EDFDFD",
    100: "#C4F1F9",
    200: "#9DECF9",
    300: "#76E4F7",
    400: "#0BC5EA",
    500: "#00B5D8",
    600: "#00A3C4",
    700: "#0987A0",
    800: "#086F83",
    900: "#065666"
  },
  purple: {
    50: "#FAF5FF",
    100: "#E9D8FD",
    200: "#D6BCFA",
    300: "#B794F4",
    400: "#9F7AEA",
    500: "#805AD5",
    600: "#6B46C1",
    700: "#553C9A",
    800: "#44337A",
    900: "#322659"
  },
  pink: {
    50: "#FFF5F7",
    100: "#FED7E2",
    200: "#FBB6CE",
    300: "#F687B3",
    400: "#ED64A6",
    500: "#D53F8C",
    600: "#B83280",
    700: "#97266D",
    800: "#702459",
    900: "#521B41"
  },
  linkedin: {
    50: "#E8F4F9",
    100: "#CFEDFB",
    200: "#9BDAF3",
    300: "#68C7EC",
    400: "#34B3E4",
    500: "#00A0DC",
    600: "#008CC9",
    700: "#0077B5",
    800: "#005E93",
    900: "#004471"
  },
  facebook: {
    50: "#E8F4F9",
    100: "#D9DEE9",
    200: "#B7C2DA",
    300: "#6482C0",
    400: "#4267B2",
    500: "#385898",
    600: "#314E89",
    700: "#29487D",
    800: "#223B67",
    900: "#1E355B"
  },
  messenger: {
    50: "#D0E6FF",
    100: "#B9DAFF",
    200: "#A2CDFF",
    300: "#7AB8FF",
    400: "#2E90FF",
    500: "#0078FF",
    600: "#0063D1",
    700: "#0052AC",
    800: "#003C7E",
    900: "#002C5C"
  },
  whatsapp: {
    50: "#E2F7F4",
    100: "#C3F0E9",
    200: "#A0E7DC",
    300: "#76DCCD",
    400: "#43CFBA",
    500: "#00BFA5",
    600: "#00AC92",
    700: "#009780",
    800: "#007D6A",
    900: "#005A4C"
  },
  twitter: {
    50: "#E5F4FD",
    100: "#C8E9FB",
    200: "#A8DCFA",
    300: "#83CDF7",
    400: "#57BBF5",
    500: "#1DA1F2",
    600: "#1A94DA",
    700: "#1681BF",
    800: "#136B9E",
    900: "#0D4D71"
  },
  telegram: {
    50: "#E3F2F9",
    100: "#C5E4F3",
    200: "#A2D4EC",
    300: "#7AC1E4",
    400: "#47A9DA",
    500: "#0088CC",
    600: "#007AB8",
    700: "#006BA1",
    800: "#005885",
    900: "#003F5E"
  }
};

var radii = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px"
};

var shadows = {
  xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
  none: "none",
  "dark-lg": "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"
};

var transitionProperty = {
  common: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
  colors: "background-color, border-color, color, fill, stroke",
  dimensions: "width, height",
  position: "left, right, top, bottom",
  background: "background-color, background-image, background-position"
};
var transitionTimingFunction = {
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
var transitionDuration = {
  "ultra-fast": "50ms",
  faster: "100ms",
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  slower: "400ms",
  "ultra-slow": "500ms"
};
var transition = {
  property: transitionProperty,
  easing: transitionTimingFunction,
  duration: transitionDuration
};

var typography = {
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    "short": 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem"
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },
  fonts: {
    heading: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    body: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    mono: "SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace"
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem"
  }
};

var zIndices = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
};

var theme$1 = _extends({
  breakpoints: breakpoints,
  zIndices: zIndices,
  radii: radii,
  colors: colors
}, typography, {
  sizes: sizes$l,
  shadows: shadows,
  space: spacing,
  borders: borders,
  transition: transition
});

var styles = {
  global: function global(props) {
    return {
      body: {
        fontFamily: "body",
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("white", "gray.800")(props),
        transition: "background-color 0.2s",
        lineHeight: "base"
      },
      "*::placeholder": {
        color: mode("gray.400", "whiteAlpha.400")(props)
      },
      "*, *::before, &::after": {
        borderColor: mode("gray.200", "whiteAlpha.300")(props),
        wordWrap: "break-word"
      }
    };
  }
};

/**
 * Color mode config
 */
var config = {
  useSystemColorMode: false,
  initialColorMode: "light"
};
var theme = _extends({}, theme$1, {
  components: components,
  styles: styles,
  config: config
});

export { theme as default, theme };
