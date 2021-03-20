"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports[Symbol.toStringTag] = "Module";
var vue = require("vue");
var Color = require("tinycolor2");
var mergeWith = require("lodash.mergewith");
var objectAssign = require("object-assign");
require("css-box-model");
var styledSystem = require("@chakra-ui/styled-system");
var css = require("@emotion/css");
var kebabCase = require("lodash.kebabcase");
var camelCase = require("lodash.camelcase");
var head = require("@vueuse/head");
var serverRenderer = require("@vue/server-renderer");
var viteSsg = require("vite-ssg");
var featherIconsPaths = require("feather-icons-paths");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : {default: e};
}
var Color__default = /* @__PURE__ */ _interopDefaultLegacy(Color);
var mergeWith__default = /* @__PURE__ */ _interopDefaultLegacy(mergeWith);
var objectAssign__default = /* @__PURE__ */ _interopDefaultLegacy(objectAssign);
var kebabCase__default = /* @__PURE__ */ _interopDefaultLegacy(kebabCase);
var camelCase__default = /* @__PURE__ */ _interopDefaultLegacy(camelCase);
var parts$k = ["container", "button", "panel"];
var baseStyleContainer$3 = {
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
var baseStyle$w = {
  container: baseStyleContainer$3,
  button: baseStyleButton,
  panel: baseStylePanel
};
var Accordion = {
  parts: parts$k,
  baseStyle: baseStyle$w
};
function isArray(value) {
  return Array.isArray(value);
}
function isFunction(value) {
  return typeof value === "function";
}
var isObject = (value) => {
  var type = typeof value;
  return value != null && (type === "object" || type === "function") && !isArray(value);
};
var isEmptyObject = (value) => isObject(value) && Object.keys(value).length === 0;
function runIfFn(valueOrFn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}
var win;
try {
  win = window;
} catch (e) {
}
var getWindow = (node) => {
  var _node$ownerDocument$d, _node$ownerDocument;
  return (_node$ownerDocument$d = node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) != null ? _node$ownerDocument$d : win;
};
function checkIsBrowser() {
  var win2 = getWindow();
  return Boolean(typeof win2 !== "undefined" && win2.document && win2.document.createElement);
}
checkIsBrowser();
var dataAttr = (condition) => condition ? "" : void 0;
var cx = function cx2() {
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }
  return classNames.filter(Boolean).join(" ");
};
function get(obj, path, fallback, index) {
  var key = typeof path === "string" ? path.split(".") : [path];
  for (index = 0; index < key.length; index += 1) {
    if (!obj) {
      break;
    }
    obj = obj[key[index]];
  }
  return obj === void 0 ? fallback : obj;
}
var memoize = (fn) => {
  var cache = new WeakMap();
  var memoizedFn = (obj, path, fallback, index) => {
    if (!cache.has(obj)) {
      cache.set(obj, new Map());
    }
    var map = cache.get(obj);
    var key = typeof path === "string" ? path.split(".") : [path];
    if (map.has(key)) {
      return map.get(key);
    }
    var value = fn(obj, path, fallback, index);
    map.set(key, value);
    return value;
  };
  return memoizedFn;
};
var memoizedGet = memoize(get);
function objectFilter(object, fn) {
  var result = {};
  Object.keys(object).forEach((key) => {
    var value = object[key];
    var shouldPass = fn(value, key, object);
    if (shouldPass) {
      result[key] = value;
    }
  });
  return result;
}
var filterUndefined = (object) => objectFilter(object, (val) => val !== null && val !== void 0);
var fromEntries = (entries) => entries.reduce((carry, _ref) => {
  var [key, value] = _ref;
  carry[key] = value;
  return carry;
}, {});
Object.freeze(["base", "sm", "md", "lg", "xl"]);
function createContext(options) {
  if (options === void 0) {
    options = {};
  }
  var {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name
  } = options;
  var contextSymbol = Symbol(name + "Symbol");
  function Provider(payload) {
    vue.provide(contextSymbol, payload);
  }
  function useContext() {
    var context = vue.inject(contextSymbol, null);
    if (!context && strict) {
      throw new Error(errorMessage);
    }
    return context;
  }
  return [Provider, useContext];
}
function _extends$n() {
  _extends$n = Object.assign || function(target) {
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
  return _extends$n.apply(this, arguments);
}
function orient(options) {
  var {
    orientation,
    vertical,
    horizontal
  } = options;
  if (!orientation)
    return {};
  return orientation === "vertical" ? vertical : horizontal;
}
var createBreakpoints = (config2) => {
  var sorted = fromEntries(Object.entries(_extends$n({
    base: "0em"
  }, config2)).sort((a, b) => parseInt(a[1], 10) > parseInt(b[1], 10) ? 1 : -1));
  return Object.assign(Object.values(sorted), sorted);
};
function mode(light, dark) {
  return (props2) => props2.colorMode === "dark" ? dark : light;
}
var getColor = (theme2, color, fallback) => {
  var hex = memoizedGet(theme2, "colors." + color, color);
  var isValid = Color__default["default"](hex).isValid();
  return isValid ? hex : fallback;
};
var tone = (color) => (theme2) => {
  var hex = getColor(theme2, color);
  var isDark2 = Color__default["default"](hex).isDark();
  return isDark2 ? "dark" : "light";
};
var isDark = (color) => (theme2) => tone(color)(theme2) === "dark";
var transparentize = (color, opacity) => (theme2) => {
  var raw = getColor(theme2, color);
  return Color__default["default"](raw).setAlpha(opacity).toRgbString();
};
function generateStripe(size2, color) {
  if (size2 === void 0) {
    size2 = "1rem";
  }
  if (color === void 0) {
    color = "rgba(255, 255, 255, 0.15)";
  }
  return {
    backgroundImage: "linear-gradient(\n    45deg,\n    " + color + " 25%,\n    transparent 25%,\n    transparent 50%,\n    " + color + " 50%,\n    " + color + " 75%,\n    transparent 75%,\n    transparent\n  )",
    backgroundSize: size2 + " " + size2
  };
}
function randomColor(opts) {
  var fallback = Color__default["default"].random().toHexString();
  if (!opts || isEmptyObject(opts)) {
    return fallback;
  }
  if (opts.string && opts.colors) {
    return randomColorFromList(opts.string, opts.colors);
  }
  if (opts.string && !opts.colors) {
    return randomColorFromString(opts.string);
  }
  if (opts.colors && !opts.string) {
    return randomFromList(opts.colors);
  }
  return fallback;
}
function randomColorFromString(str) {
  var hash = 0;
  if (str.length === 0)
    return hash.toString();
  for (var i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  var color = "#";
  for (var j = 0; j < 3; j += 1) {
    var value = hash >> j * 8 & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}
function randomColorFromList(str, list) {
  var index = 0;
  if (str.length === 0)
    return list[0];
  for (var i = 0; i < str.length; i += 1) {
    index = str.charCodeAt(i) + ((index << 5) - index);
    index = index & index;
  }
  index = (index % list.length + list.length) % list.length;
  return list[index];
}
function randomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}
var parts$j = ["container", "title", "icon"];
var baseStyle$v = {
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
function getBg(props2) {
  var {
    theme: theme2,
    colorScheme: c
  } = props2;
  var lightBg = getColor(theme2, c + ".100", c);
  var darkBg = transparentize(c + ".200", 0.16)(theme2);
  return mode(lightBg, darkBg)(props2);
}
function variantSubtle$1(props2) {
  var {
    colorScheme: c
  } = props2;
  return {
    container: {
      bg: getBg(props2)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props2)
    }
  };
}
function variantLeftAccent(props2) {
  var {
    colorScheme: c
  } = props2;
  return {
    container: {
      pl: 3,
      borderLeft: "4px solid",
      borderColor: mode(c + ".500", c + ".200")(props2),
      bg: getBg(props2)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props2)
    }
  };
}
function variantTopAccent(props2) {
  var {
    colorScheme: c
  } = props2;
  return {
    container: {
      pt: 2,
      borderTop: "4px solid",
      borderColor: mode(c + ".500", c + ".200")(props2),
      bg: getBg(props2)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props2)
    }
  };
}
function variantSolid$2(props2) {
  var {
    colorScheme: c
  } = props2;
  return {
    container: {
      bg: mode(c + ".500", c + ".200")(props2),
      color: mode("white", "gray.900")(props2)
    }
  };
}
var variants$a = {
  subtle: variantSubtle$1,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid$2
};
var defaultProps$m = {
  variant: "subtle"
};
var Alert = {
  parts: parts$j,
  baseStyle: baseStyle$v,
  variants: variants$a,
  defaultProps: defaultProps$m
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
function _extends$m() {
  _extends$m = Object.assign || function(target) {
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
  return _extends$m.apply(this, arguments);
}
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
  "7xl": "80rem"
};
var container = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
};
var sizes$k = _extends$m({}, spacing, largeSizes, {
  container
});
var parts$i = ["container", "excessLabel", "badge", "label"];
function baseStyleBadge(props2) {
  return {
    transform: "translate(25%, 25%)",
    borderRadius: "full",
    border: "0.2em solid",
    borderColor: mode("white", "gray.800")(props2)
  };
}
function baseStyleExcessLabel(props2) {
  return {
    bg: mode("gray.200", "whiteAlpha.400")(props2)
  };
}
function baseStyleContainer$2(props2) {
  var {
    name,
    theme: theme2
  } = props2;
  var bg = name ? randomColor({
    string: name
  }) : "gray.400";
  var isBgDark = isDark(bg)(theme2);
  var color = "white";
  if (!isBgDark)
    color = "gray.800";
  var borderColor = mode("white", "gray.800")(props2);
  return {
    bg,
    color,
    borderColor,
    verticalAlign: "top"
  };
}
var baseStyle$u = (props2) => ({
  badge: baseStyleBadge(props2),
  excessLabel: baseStyleExcessLabel(props2),
  container: baseStyleContainer$2(props2)
});
function getSize$3(size2) {
  var themeSize = sizes$k[size2];
  return {
    container: {
      width: size2,
      height: size2,
      fontSize: "calc(" + (themeSize != null ? themeSize : size2) + " / 2.5)"
    },
    excessLabel: {
      width: size2,
      height: size2
    },
    label: {
      fontSize: "calc(" + (themeSize != null ? themeSize : size2) + " / 2.5)",
      lineHeight: size2 !== "100%" ? themeSize != null ? themeSize : size2 : void 0
    }
  };
}
var sizes$j = {
  "2xs": getSize$3("4"),
  xs: getSize$3("6"),
  sm: getSize$3("8"),
  md: getSize$3("12"),
  lg: getSize$3("16"),
  xl: getSize$3("24"),
  "2xl": getSize$3("32"),
  full: getSize$3("100%")
};
var defaultProps$l = {
  size: "md"
};
var Avatar = {
  parts: parts$i,
  baseStyle: baseStyle$u,
  sizes: sizes$j,
  defaultProps: defaultProps$l
};
var baseStyle$t = {
  px: 1,
  textTransform: "uppercase",
  fontSize: "xs",
  borderRadius: "sm",
  fontWeight: "bold"
};
function variantSolid$1(props2) {
  var {
    colorScheme: c,
    theme: theme2
  } = props2;
  var dark = transparentize(c + ".500", 0.6)(theme2);
  return {
    bg: mode(c + ".500", dark)(props2),
    color: mode("white", "whiteAlpha.800")(props2)
  };
}
function variantSubtle(props2) {
  var {
    colorScheme: c,
    theme: theme2
  } = props2;
  var darkBg = transparentize(c + ".200", 0.16)(theme2);
  return {
    bg: mode(c + ".100", darkBg)(props2),
    color: mode(c + ".800", c + ".200")(props2)
  };
}
function variantOutline$2(props2) {
  var {
    colorScheme: c,
    theme: theme2
  } = props2;
  var darkColor = transparentize(c + ".200", 0.8)(theme2);
  var lightColor = getColor(theme2, c + ".500");
  var color = mode(lightColor, darkColor)(props2);
  return {
    color,
    boxShadow: "inset 0 0 0px 1px " + color
  };
}
var variants$9 = {
  solid: variantSolid$1,
  subtle: variantSubtle,
  outline: variantOutline$2
};
var defaultProps$k = {
  variant: "subtle",
  colorScheme: "gray"
};
var Badge = {
  baseStyle: baseStyle$t,
  variants: variants$9,
  defaultProps: defaultProps$k
};
var parts$h = ["link", "separator"];
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
var baseStyle$s = {
  link: baseStyleLink
};
var Breadcrumb = {
  parts: parts$h,
  baseStyle: baseStyle$s
};
function _extends$l() {
  _extends$l = Object.assign || function(target) {
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
  return _extends$l.apply(this, arguments);
}
var baseStyle$r = {
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
function variantGhost(props2) {
  var {
    colorScheme: c,
    theme: theme2
  } = props2;
  if (c === "gray") {
    return {
      color: mode("inherit", "whiteAlpha.900")(props2),
      _hover: {
        bg: mode("gray.100", "whiteAlpha.200")(props2)
      },
      _active: {
        bg: mode("gray.200", "whiteAlpha.300")(props2)
      }
    };
  }
  var darkHoverBg = transparentize(c + ".200", 0.12)(theme2);
  var darkActiveBg = transparentize(c + ".200", 0.24)(theme2);
  return {
    color: mode(c + ".600", c + ".200")(props2),
    bg: "transparent",
    _hover: {
      bg: mode(c + ".50", darkHoverBg)(props2)
    },
    _active: {
      bg: mode(c + ".100", darkActiveBg)(props2)
    }
  };
}
function variantOutline$1(props2) {
  var {
    colorScheme: c
  } = props2;
  var borderColor = mode("gray.200", "whiteAlpha.300")(props2);
  return _extends$l({
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor"
  }, variantGhost(props2));
}
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
function variantSolid(props2) {
  var {
    colorScheme: c
  } = props2;
  if (c === "gray") {
    var _bg = mode("gray.100", "whiteAlpha.200")(props2);
    return {
      bg: _bg,
      _hover: {
        bg: mode("gray.200", "whiteAlpha.300")(props2),
        _disabled: {
          bg: _bg
        }
      },
      _active: {
        bg: mode("gray.300", "whiteAlpha.400")(props2)
      }
    };
  }
  var {
    bg = c + ".500",
    color = "white",
    hoverBg = c + ".600",
    activeBg = c + ".700"
  } = accessibleColorMap[c] || {};
  var background = mode(bg, c + ".200")(props2);
  return {
    bg: background,
    color: mode(color, "gray.800")(props2),
    _hover: {
      bg: mode(hoverBg, c + ".300")(props2),
      _disabled: {
        bg: background
      }
    },
    _active: {
      bg: mode(activeBg, c + ".400")(props2)
    }
  };
}
function variantLink(props2) {
  var {
    colorScheme: c
  } = props2;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    color: mode(c + ".500", c + ".200")(props2),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none"
      }
    },
    _active: {
      color: mode(c + ".700", c + ".500")(props2)
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
var variants$8 = {
  ghost: variantGhost,
  outline: variantOutline$1,
  solid: variantSolid,
  link: variantLink,
  unstyled: variantUnstyled$2
};
var sizes$i = {
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
var defaultProps$j = {
  variant: "solid",
  size: "md",
  colorScheme: "gray"
};
var Button = {
  baseStyle: baseStyle$r,
  variants: variants$8,
  sizes: sizes$i,
  defaultProps: defaultProps$j
};
var parts$g = ["control", "label", "description", "icon"];
function baseStyleControl$1(props2) {
  var {
    colorScheme: c
  } = props2;
  return {
    w: "100%",
    transition: "box-shadow 250ms",
    border: "2px solid",
    borderRadius: "sm",
    borderColor: "inherit",
    color: "white",
    _checked: {
      bg: mode(c + ".500", c + ".200")(props2),
      borderColor: mode(c + ".500", c + ".200")(props2),
      color: mode("white", "gray.900")(props2),
      _hover: {
        bg: mode(c + ".600", c + ".300")(props2),
        borderColor: mode(c + ".600", c + ".300")(props2)
      },
      _disabled: {
        borderColor: mode("gray.200", "transparent")(props2),
        bg: mode("gray.200", "whiteAlpha.300")(props2),
        color: mode("gray.500", "whiteAlpha.500")(props2)
      }
    },
    _indeterminate: {
      bg: mode(c + ".500", c + ".200")(props2),
      borderColor: mode(c + ".500", c + ".200")(props2),
      color: mode("white", "gray.900")(props2)
    },
    _disabled: {
      bg: mode("gray.100", "whiteAlpha.100")(props2),
      borderColor: mode("gray.100", "transparent")(props2)
    },
    _focus: {
      boxShadow: "outline"
    },
    _invalid: {
      borderColor: mode("red.500", "red.300")(props2)
    }
  };
}
var baseStyleLabel$3 = {
  userSelect: "none",
  _disabled: {
    opacity: 0.4
  }
};
var baseStyle$q = (props2) => ({
  control: baseStyleControl$1(props2),
  label: baseStyleLabel$3
});
var sizes$h = {
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
var defaultProps$i = {
  size: "md",
  colorScheme: "blue"
};
var Checkbox = {
  parts: parts$g,
  baseStyle: baseStyle$q,
  sizes: sizes$h,
  defaultProps: defaultProps$i
};
function baseStyle$p(props2) {
  var hoverBg = mode("blackAlpha.100", "whiteAlpha.100")(props2);
  var activeBg = mode("blackAlpha.200", "whiteAlpha.200")(props2);
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
var sizes$g = {
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
var defaultProps$h = {
  size: "md"
};
var CloseButton = {
  baseStyle: baseStyle$p,
  sizes: sizes$g,
  defaultProps: defaultProps$h
};
var {
  variants: variants$7,
  defaultProps: defaultProps$g
} = Badge;
var baseStyle$o = {
  fontFamily: "mono",
  fontSize: "sm",
  px: "0.2em",
  borderRadius: "sm"
};
var Code = {
  baseStyle: baseStyle$o,
  variants: variants$7,
  defaultProps: defaultProps$g
};
var parts$f = ["overlay", "dialogContainer", "dialog", "header", "body", "footer"];
var baseStyleOverlay$1 = {
  bg: "blackAlpha.600",
  zIndex: "modal"
};
function baseStyleDialogContainer$1(props2) {
  var {
    isCentered,
    scrollBehavior
  } = props2;
  return {
    display: "flex",
    zIndex: "modal",
    justifyContent: "center",
    alignItems: isCentered ? "center" : "flex-start",
    overflow: scrollBehavior === "inside" ? "hidden" : "auto"
  };
}
function baseStyleDialog$1(props2) {
  var {
    scrollBehavior
  } = props2;
  return {
    borderRadius: "md",
    bg: mode("white", "gray.700")(props2),
    color: "inherit",
    my: "3.75rem",
    zIndex: "modal",
    maxH: scrollBehavior === "inside" ? "calc(100vh - 7.5rem)" : void 0,
    boxShadow: mode("lg", "dark-lg")(props2)
  };
}
var baseStyleHeader$2 = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold"
};
function baseStyleBody$2(props2) {
  var {
    scrollBehavior
  } = props2;
  return {
    px: 6,
    py: 2,
    flex: 1,
    overflow: scrollBehavior === "inside" ? "auto" : void 0
  };
}
var baseStyleFooter$2 = {
  px: 6,
  py: 4
};
var baseStyle$n = (props2) => ({
  overlay: baseStyleOverlay$1,
  dialogContainer: baseStyleDialogContainer$1(props2),
  dialog: baseStyleDialog$1(props2),
  header: baseStyleHeader$2,
  body: baseStyleBody$2(props2),
  footer: baseStyleFooter$2
});
function getSize$2(value) {
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
var sizes$f = {
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
var defaultProps$f = {
  size: "md"
};
var Modal = {
  parts: parts$f,
  baseStyle: baseStyle$n,
  sizes: sizes$f,
  defaultProps: defaultProps$f
};
function _extends$k() {
  _extends$k = Object.assign || function(target) {
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
  return _extends$k.apply(this, arguments);
}
var parts$e = Modal.parts;
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
function baseStyleDialog(props2) {
  var {
    isFullHeight
  } = props2;
  return _extends$k({}, isFullHeight && {
    height: "100vh"
  }, {
    zIndex: "modal",
    maxH: "100vh",
    bg: mode("white", "gray.700")(props2),
    color: "inherit",
    boxShadow: mode("lg", "dark-lg")(props2)
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
var baseStyle$m = (props2) => ({
  overlay: baseStyleOverlay,
  dialogContainer: baseStyleDialogContainer,
  dialog: baseStyleDialog(props2),
  header: baseStyleHeader$1,
  body: baseStyleBody$1,
  footer: baseStyleFooter$1
});
var sizes$e = {
  xs: getSize$1("xs"),
  sm: getSize$1("md"),
  md: getSize$1("lg"),
  lg: getSize$1("2xl"),
  xl: getSize$1("4xl"),
  full: getSize$1("full")
};
var defaultProps$e = {
  size: "xs"
};
var Drawer = {
  parts: parts$e,
  baseStyle: baseStyle$m,
  sizes: sizes$e,
  defaultProps: defaultProps$e
};
var parts$d = ["preview", "input"];
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
var baseStyle$l = {
  preview: baseStylePreview,
  input: baseStyleInput$1
};
var Editable = {
  parts: parts$d,
  baseStyle: baseStyle$l
};
var parts$c = ["errorText", "errorIcon", "requiredIndicator", "helperText"];
function baseStyleErrorText(props2) {
  return {
    color: mode("red.500", "red.300")(props2),
    mt: 2,
    fontSize: "sm"
  };
}
function baseStyleRequiredIndicator(props2) {
  return {
    ml: 1,
    color: mode("red.500", "red.300")(props2)
  };
}
function baseStyleHelperText(props2) {
  return {
    mt: 2,
    color: mode("gray.500", "whiteAlpha.600")(props2),
    lineHeight: "normal",
    fontSize: "sm"
  };
}
function baseStyleErrorIcon(props2) {
  return {
    mr: "0.5em",
    color: mode("red.500", "red.300")(props2)
  };
}
var baseStyle$k = (props2) => ({
  errorText: baseStyleErrorText(props2),
  requiredIndicator: baseStyleRequiredIndicator(props2),
  helperText: baseStyleHelperText(props2),
  errorIcon: baseStyleErrorIcon(props2)
});
var Form = {
  parts: parts$c,
  baseStyle: baseStyle$k
};
var baseStyle$j = {
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
  baseStyle: baseStyle$j
};
var baseStyle$i = {
  fontFamily: "heading",
  fontWeight: "bold"
};
var sizes$d = {
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
var defaultProps$d = {
  size: "xl"
};
var Heading = {
  baseStyle: baseStyle$i,
  sizes: sizes$d,
  defaultProps: defaultProps$d
};
var parts$b = ["field", "addon"];
var baseStyle$h = {
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
var sizes$c = {
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
function getDefaults(props2) {
  var {
    focusBorderColor: fc,
    errorBorderColor: ec
  } = props2;
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props2),
    errorBorderColor: ec || mode("red.500", "red.300")(props2)
  };
}
function variantOutline(props2) {
  var {
    theme: theme2
  } = props2;
  var {
    focusBorderColor: fc,
    errorBorderColor: ec
  } = getDefaults(props2);
  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props2)
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
        borderColor: getColor(theme2, fc),
        boxShadow: "0 0 0 1px " + getColor(theme2, fc)
      },
      _invalid: {
        borderColor: getColor(theme2, ec),
        boxShadow: "0 0 0 1px " + getColor(theme2, ec)
      }
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props2),
      bg: mode("gray.100", "whiteAlpha.300")(props2)
    }
  };
}
function variantFilled(props2) {
  var {
    theme: theme2
  } = props2;
  var {
    focusBorderColor: fc,
    errorBorderColor: ec
  } = getDefaults(props2);
  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props2),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props2)
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
        borderColor: getColor(theme2, fc)
      },
      _invalid: {
        borderColor: getColor(theme2, ec)
      }
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props2)
    }
  };
}
function variantFlushed(props2) {
  var {
    theme: theme2
  } = props2;
  var {
    focusBorderColor: fc,
    errorBorderColor: ec
  } = getDefaults(props2);
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
        borderColor: getColor(theme2, fc),
        boxShadow: "0px 1px 0px 0px " + getColor(theme2, fc)
      },
      _invalid: {
        borderColor: getColor(theme2, ec)
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
var variants$6 = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled$1
};
var defaultProps$c = {
  size: "md",
  variant: "outline"
};
var Input = {
  parts: parts$b,
  baseStyle: baseStyle$h,
  sizes: sizes$c,
  variants: variants$6,
  defaultProps: defaultProps$c
};
function baseStyle$g(props2) {
  return {
    bg: mode("gray.100", "whiteAlpha")(props2),
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
  baseStyle: baseStyle$g
};
var baseStyle$f = {
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
  baseStyle: baseStyle$f
};
var parts$a = ["item", "command", "list", "button", "groupTitle", "divider"];
function baseStyleList(props2) {
  return {
    bg: mode("#fff", "gray.700")(props2),
    boxShadow: mode("sm", "dark-lg")(props2),
    color: "inherit",
    minW: "3xs",
    py: "2",
    zIndex: 1,
    borderRadius: "md",
    borderWidth: "1px"
  };
}
function baseStyleItem(props2) {
  return {
    py: "0.4rem",
    px: "0.8rem",
    transition: "background 50ms ease-in 0s",
    _focus: {
      bg: mode("gray.100", "whiteAlpha.100")(props2)
    },
    _active: {
      bg: mode("gray.200", "whiteAlpha.200")(props2)
    },
    _expanded: {
      bg: mode("gray.100", "whiteAlpha.100")(props2)
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
var baseStyle$e = (props2) => {
  return {
    list: baseStyleList(props2),
    item: baseStyleItem(props2),
    groupTitle: baseStyleGroupTitle,
    command: baseStyleCommand,
    divider: baseStyleDivider
  };
};
var Menu = {
  parts: parts$a,
  baseStyle: baseStyle$e
};
var _Input$baseStyle;
var parts$9 = ["field", "stepper", "stepperGroup"];
var {
  variants: variants$5,
  defaultProps: defaultProps$b
} = Input;
var baseStyleField$1 = (_Input$baseStyle = Input.baseStyle) == null ? void 0 : _Input$baseStyle.field;
var baseStyleStepperGroup = {
  width: "24px"
};
function baseStyleStepper(props2) {
  return {
    borderLeft: "1px solid",
    borderColor: mode("inherit", "whiteAlpha.300")(props2),
    color: mode("inherit", "whiteAlpha.800")(props2),
    _active: {
      bg: mode("gray.200", "whiteAlpha.300")(props2)
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  };
}
var baseStyle$d = (props2) => {
  return {
    field: baseStyleField$1,
    stepperGroup: baseStyleStepperGroup,
    stepper: baseStyleStepper(props2)
  };
};
function getSize(size2) {
  var _Input$sizes;
  var sizeStyle = (_Input$sizes = Input.sizes) == null ? void 0 : _Input$sizes[size2];
  var radius = {
    lg: "md",
    md: "md",
    sm: "sm"
  };
  return {
    field: sizeStyle == null ? void 0 : sizeStyle.field,
    stepper: {
      fontSize: size2 === "lg" ? "14px" : "10px",
      _first: {
        borderTopRightRadius: radius[size2]
      },
      _last: {
        borderBottomRightRadius: radius[size2],
        mt: "-1px",
        borderTopWidth: 1
      }
    }
  };
}
var sizes$b = {
  sm: getSize("sm"),
  md: getSize("md"),
  lg: getSize("lg")
};
var NumberInput = {
  parts: parts$9,
  baseStyle: baseStyle$d,
  sizes: sizes$b,
  variants: variants$5,
  defaultProps: defaultProps$b
};
function _extends$j() {
  _extends$j = Object.assign || function(target) {
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
  return _extends$j.apply(this, arguments);
}
var baseStyle$c = _extends$j({}, Input.baseStyle.field, {
  textAlign: "center"
});
var sizes$a = {
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
var variants$4 = {
  outline: (props2) => Input.variants.outline(props2).field,
  flushed: (props2) => Input.variants.flushed(props2).field,
  filled: (props2) => Input.variants.filled(props2).field,
  unstyled: Input.variants.unstyled.field
};
var defaultProps$a = Input.defaultProps;
var PinInput = {
  baseStyle: baseStyle$c,
  sizes: sizes$a,
  variants: variants$4,
  defaultProps: defaultProps$a
};
var parts$8 = ["popper", "content", "header", "body", "footer", "arrow"];
var baseStylePopper = {
  w: "100%",
  maxW: "xs",
  zIndex: 10
};
function baseStyleContent(props2) {
  return {
    bg: mode("white", "gray.700")(props2),
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
function baseStyleArrow(props2) {
  return {
    bg: mode("white", "gray.700")(props2)
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
var baseStyle$b = (props2) => {
  return {
    popper: baseStylePopper,
    content: baseStyleContent(props2),
    header: baseStyleHeader,
    body: baseStyleBody,
    footer: baseStyleFooter,
    arrow: baseStyleArrow(props2)
  };
};
var Popover = {
  parts: parts$8,
  baseStyle: baseStyle$b
};
function _extends$i() {
  _extends$i = Object.assign || function(target) {
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
  return _extends$i.apply(this, arguments);
}
var parts$7 = ["track", "filledTrack", "panel"];
function filledStyle(props2) {
  var {
    colorScheme: c,
    theme: t,
    isIndeterminate,
    hasStripe
  } = props2;
  var stripeStyle = mode(generateStripe(), generateStripe("1rem", "rgba(0,0,0,0.1)"))(props2);
  var bgColor = mode(c + ".500", c + ".200")(props2);
  var gradient = "linear-gradient(\n    to right,\n    transparent 0%,\n    " + getColor(t, bgColor) + " 50%,\n    transparent 100%\n  )";
  var addStripe = !isIndeterminate && hasStripe;
  return _extends$i({}, addStripe && stripeStyle, isIndeterminate ? {
    bgImage: gradient
  } : {
    bgColor
  });
}
var baseStyleLabel$2 = {
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white"
};
function baseStyleTrack$2(props2) {
  return {
    bg: mode("gray.100", "whiteAlpha.300")(props2)
  };
}
function baseStyleFilledTrack$1(props2) {
  return _extends$i({
    transition: "all 0.3s"
  }, filledStyle(props2));
}
var baseStyle$a = (props2) => {
  return {
    label: baseStyleLabel$2,
    filledTrack: baseStyleFilledTrack$1(props2),
    track: baseStyleTrack$2(props2)
  };
};
var sizes$9 = {
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
var defaultProps$9 = {
  size: "md",
  colorScheme: "blue"
};
var Progress = {
  parts: parts$7,
  sizes: sizes$9,
  baseStyle: baseStyle$a,
  defaultProps: defaultProps$9
};
function _extends$h() {
  _extends$h = Object.assign || function(target) {
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
  return _extends$h.apply(this, arguments);
}
var parts$6 = ["control", "label"];
function baseStyleControl(props2) {
  var {
    control
  } = Checkbox.baseStyle(props2);
  return _extends$h({}, control, {
    borderRadius: "full",
    _checked: _extends$h({}, control["_checked"], {
      _before: {
        content: '""',
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
var baseStyle$9 = (props2) => {
  return {
    label: Checkbox.baseStyle(props2).label,
    control: baseStyleControl(props2)
  };
};
var sizes$8 = {
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
var defaultProps$8 = {
  size: "md",
  colorScheme: "blue"
};
var Radio = {
  parts: parts$6,
  baseStyle: baseStyle$9,
  sizes: sizes$8,
  defaultProps: defaultProps$8
};
function _extends$g() {
  _extends$g = Object.assign || function(target) {
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
  return _extends$g.apply(this, arguments);
}
var {
  sizes: sizes$7,
  defaultProps: defaultProps$7,
  variants: variants$3
} = Input;
var parts$5 = ["field", "icon"];
function baseStyleField(props2) {
  return _extends$g({}, Input.baseStyle.field, {
    appearance: "none",
    paddingBottom: "1px",
    lineHeight: "normal",
    "> option": {
      bg: mode("white", "gray.700")(props2)
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
var baseStyle$8 = (props2) => ({
  field: baseStyleField(props2),
  icon: baseStyleInput
});
var Select = {
  parts: parts$5,
  baseStyle: baseStyle$8,
  sizes: sizes$7,
  variants: variants$3,
  defaultProps: defaultProps$7
};
var baseStyle$7 = (props2) => {
  return {
    borderRadius: "md",
    fontWeight: "semibold",
    _focus: {
      boxShadow: "outline",
      padding: "1rem",
      position: "fixed",
      top: "1.5rem",
      left: "1.5rem",
      bg: mode("white", "gray.700")(props2)
    }
  };
};
var SkipLink = {
  baseStyle: baseStyle$7
};
function _extends$f() {
  _extends$f = Object.assign || function(target) {
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
  return _extends$f.apply(this, arguments);
}
var parts$4 = ["container", "thumb", "track", "filledTrack"];
function thumbOrientation(props2) {
  return orient({
    orientation: props2.orientation,
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
var baseStyleContainer$1 = (props2) => {
  var {
    orientation
  } = props2;
  return _extends$f({
    _disabled: {
      opacity: 0.6,
      cursor: "default",
      pointerEvents: "none"
    }
  }, orient({
    orientation,
    vertical: {
      h: "100%"
    },
    horizontal: {
      w: "100%"
    }
  }));
};
function baseStyleTrack$1(props2) {
  return {
    borderRadius: "sm",
    bg: mode("gray.200", "whiteAlpha.200")(props2),
    _disabled: {
      bg: mode("gray.300", "whiteAlpha.300")(props2)
    }
  };
}
function baseStyleThumb$1(props2) {
  return _extends$f({
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
  }, thumbOrientation(props2));
}
function baseStyleFilledTrack(props2) {
  var {
    colorScheme: c
  } = props2;
  return {
    bg: mode(c + ".500", c + ".200")(props2)
  };
}
var baseStyle$6 = (props2) => ({
  container: baseStyleContainer$1(props2),
  track: baseStyleTrack$1(props2),
  thumb: baseStyleThumb$1(props2),
  filledTrack: baseStyleFilledTrack(props2)
});
function sizeLg(props2) {
  return {
    thumb: {
      w: "16px",
      h: "16px"
    },
    track: orient({
      orientation: props2.orientation,
      horizontal: {
        h: "4px"
      },
      vertical: {
        w: "4px"
      }
    })
  };
}
function sizeMd(props2) {
  return {
    thumb: {
      w: "14px",
      h: "14px"
    },
    track: orient({
      orientation: props2.orientation,
      horizontal: {
        h: "4px"
      },
      vertical: {
        w: "4px"
      }
    })
  };
}
function sizeSm(props2) {
  return {
    thumb: {
      w: "10px",
      h: "10px"
    },
    track: orient({
      orientation: props2.orientation,
      horizontal: {
        h: "2px"
      },
      vertical: {
        w: "2px"
      }
    })
  };
}
var sizes$6 = {
  lg: sizeLg,
  md: sizeMd,
  sm: sizeSm
};
var defaultProps$6 = {
  size: "md",
  colorScheme: "blue"
};
var Slider = {
  parts: parts$4,
  sizes: sizes$6,
  baseStyle: baseStyle$6,
  defaultProps: defaultProps$6
};
var sizes$5 = {
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
var defaultProps$5 = {
  size: "md"
};
var Spinner = {
  sizes: sizes$5,
  defaultProps: defaultProps$5
};
var parts$3 = ["label", "number", "icon", "helpText"];
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
var baseStyleIcon = {
  mr: 1,
  w: "14px",
  h: "14px",
  verticalAlign: "middle"
};
var baseStyle$5 = {
  label: baseStyleLabel$1,
  helpText: baseStyleHelpText,
  number: baseStyleNumber,
  icon: baseStyleIcon
};
var sizes$4 = {
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
var defaultProps$4 = {
  size: "md"
};
var Stat = {
  parts: parts$3,
  baseStyle: baseStyle$5,
  sizes: sizes$4,
  defaultProps: defaultProps$4
};
var parts$2 = ["track", "thumb"];
function baseStyleTrack(props2) {
  var {
    colorScheme: c
  } = props2;
  return {
    borderRadius: "full",
    p: "2px",
    transition: "all 120ms",
    bg: mode("gray.300", "whiteAlpha.400")(props2),
    _focus: {
      boxShadow: "outline"
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    },
    _checked: {
      bg: mode(c + ".500", c + ".200")(props2)
    }
  };
}
var baseStyleThumb = {
  bg: "white",
  transition: "transform 250ms",
  borderRadius: "full",
  transform: "translateX(0)"
};
var baseStyle$4 = (props2) => ({
  track: baseStyleTrack(props2),
  thumb: baseStyleThumb
});
var sizes$3 = {
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
var defaultProps$3 = {
  size: "md",
  colorScheme: "blue"
};
var Switch = {
  parts: parts$2,
  baseStyle: baseStyle$4,
  sizes: sizes$3,
  defaultProps: defaultProps$3
};
var parts$1 = ["tablist", "tab", "tabpanel", "indicator"];
function baseStyleTab(props2) {
  var {
    isFitted
  } = props2;
  return {
    flex: isFitted ? 1 : void 0,
    transition: "all 0.2s",
    _focus: {
      zIndex: 1,
      boxShadow: "outline"
    }
  };
}
function baseStyleTablist(props2) {
  var {
    align = "start",
    orientation
  } = props2;
  var alignments = {
    end: "flex-end",
    center: "center",
    start: "flex-start"
  };
  return {
    justifyContent: alignments[align],
    flexDirection: orientation === "vertical" ? "column" : "row"
  };
}
var baseStyleTabpanel = {
  p: 4
};
var baseStyle$3 = (props2) => {
  return {
    tab: baseStyleTab(props2),
    tablist: baseStyleTablist(props2),
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
function variantLine(props2) {
  var {
    colorScheme: c,
    orientation
  } = props2;
  var borderProp = orientation === "vertical" ? "borderLeft" : "borderBottom";
  return {
    tablist: {
      [borderProp]: "2px solid",
      borderColor: "inherit"
    },
    tab: {
      [borderProp]: "2px solid",
      borderColor: "transparent",
      mb: "-2px",
      _selected: {
        color: mode(c + ".600", c + ".300")(props2),
        borderColor: "currentColor"
      },
      _active: {
        bg: mode("gray.200", "whiteAlpha.300")(props2)
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      }
    }
  };
}
function variantEnclosed(props2) {
  var {
    colorScheme: c
  } = props2;
  return {
    tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      _selected: {
        color: mode(c + ".600", c + ".300")(props2),
        borderColor: "inherit",
        borderBottomColor: mode("white", "gray.800")(props2)
      }
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
}
function variantEnclosedColored(props2) {
  var {
    colorScheme: c
  } = props2;
  return {
    tab: {
      border: "1px solid",
      borderColor: "inherit",
      bg: mode("gray.50", "whiteAlpha.50")(props2),
      mb: "-1px",
      _notLast: {
        mr: "-1px"
      },
      _selected: {
        bg: mode("#fff", "gray.800")(props2),
        color: mode(c + ".600", c + ".300")(props2),
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
function variantSoftRounded(props2) {
  var {
    colorScheme: c,
    theme: theme2
  } = props2;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: getColor(theme2, c + ".700"),
        bg: getColor(theme2, c + ".100")
      }
    }
  };
}
function variantSolidRounded(props2) {
  var {
    colorScheme: c
  } = props2;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: mode("gray.600", "inherit")(props2),
      _selected: {
        color: mode("#fff", "gray.800")(props2),
        bg: mode(c + ".600", c + ".300")(props2)
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
  parts: parts$1,
  baseStyle: baseStyle$3,
  sizes: sizes$2,
  variants: variants$2,
  defaultProps: defaultProps$2
};
var parts = ["container", "label", "closeButton"];
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
var baseStyle$2 = {
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
  subtle: (props2) => ({
    container: Badge.variants.subtle(props2)
  }),
  solid: (props2) => ({
    container: Badge.variants.solid(props2)
  }),
  outline: (props2) => ({
    container: Badge.variants.outline(props2)
  })
};
var defaultProps$1 = {
  size: "md",
  variant: "subtle",
  colorScheme: "gray"
};
var Tag = {
  parts,
  variants: variants$1,
  baseStyle: baseStyle$2,
  sizes: sizes$1,
  defaultProps: defaultProps$1
};
function _extends$e() {
  _extends$e = Object.assign || function(target) {
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
  return _extends$e.apply(this, arguments);
}
var baseStyle$1 = _extends$e({}, Input.baseStyle.field, {
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short"
});
var variants = {
  outline: (props2) => Input.variants.outline(props2).field,
  flushed: (props2) => Input.variants.flushed(props2).field,
  filled: (props2) => Input.variants.filled(props2).field,
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
  baseStyle: baseStyle$1,
  sizes,
  variants,
  defaultProps
};
function baseStyle(props2) {
  return {
    px: "8px",
    py: "2px",
    bg: mode("gray.700", "gray.300")(props2),
    color: mode("whiteAlpha.900", "gray.900")(props2),
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
  baseStyle
};
var components = {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  CloseButton,
  Code,
  Drawer,
  Editable,
  Form,
  FormLabel,
  Heading,
  Input,
  Kbd,
  Link,
  Menu,
  Modal,
  NumberInput,
  PinInput,
  Popover,
  Progress,
  Radio,
  Select,
  SkipLink,
  Slider,
  Spinner,
  Stat,
  Switch,
  Tabs,
  Tag,
  Textarea,
  Tooltip
};
var borders = {
  none: 0,
  "1px": "1px solid",
  "2px": "2px solid",
  "4px": "4px solid",
  "8px": "8px solid"
};
var breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em"
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
    short: 1.375,
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
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'
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
  dropdown: 1e3,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
};
function _extends$d() {
  _extends$d = Object.assign || function(target) {
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
  return _extends$d.apply(this, arguments);
}
var theme$1 = _extends$d({
  breakpoints,
  zIndices,
  radii,
  colors
}, typography, {
  sizes: sizes$k,
  shadows,
  space: spacing,
  borders,
  transition
});
var styles = {
  global: (props2) => ({
    body: {
      fontFamily: "body",
      color: mode("gray.800", "whiteAlpha.900")(props2),
      bg: mode("white", "gray.800")(props2),
      transition: "background-color 0.2s",
      lineHeight: "base"
    },
    "*::placeholder": {
      color: mode("gray.400", "whiteAlpha.400")(props2)
    },
    "*, *::before, &::after": {
      borderColor: mode("gray.200", "whiteAlpha.300")(props2),
      wordWrap: "break-word"
    }
  })
};
function _extends$c() {
  _extends$c = Object.assign || function(target) {
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
  return _extends$c.apply(this, arguments);
}
var config = {
  useSystemColorMode: false,
  initialColorMode: "light"
};
var theme = _extends$c({}, theme$1, {
  components,
  styles,
  config
});
function _extends$b() {
  _extends$b = Object.assign || function(target) {
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
  return _extends$b.apply(this, arguments);
}
var baseStylePropNames = styledSystem.propNames.reduce((acc, curr) => {
  acc[curr] = true;
  acc[kebabCase__default["default"](curr)] = true;
  return acc;
}, {});
var pseudoStylePropNames = styledSystem.pseudoPropNames.reduce((acc, curr) => {
  acc[curr] = curr;
  return acc;
}, {});
var allStylePropNames = _extends$b({}, baseStylePropNames, pseudoStylePropNames);
var extractStyleAttrs = (styleProps) => {
  var styles2 = {};
  var attrs = {};
  for (var prop in styleProps) {
    var _attr = pseudoStylePropNames[prop] || camelCase__default["default"](prop);
    if (_attr in allStylePropNames) {
      styles2[_attr] = styleProps[prop];
    } else {
      attrs[prop] = styleProps[prop];
    }
  }
  return {
    styles: styles2,
    attrs
  };
};
var domElements = ["a", "b", "article", "aside", "blockquote", "button", "caption", "cite", "circle", "code", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "img", "input", "kbd", "label", "li", "mark", "main", "nav", "ol", "p", "path", "pre", "q", "rect", "s", "svg", "section", "select", "strong", "small", "span", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "tr", "ul"];
var useTheme = () => {
  var theme2 = vue.inject("$chakraTheme");
  return theme2;
};
var useColorMode = () => {
  var _colorMode = vue.inject("$chakraColorMode");
  var colorMode = vue.ref(_colorMode);
  var toggleColorMode = () => {
    colorMode.value = colorMode.value = "dark";
  };
  return {
    colorMode,
    toggleColorMode
  };
};
var useChakra = () => {
  var theme2 = useTheme();
  var {
    colorMode
  } = useColorMode();
  return {
    theme: theme2,
    colorMode
  };
};
function _extends$a() {
  _extends$a = Object.assign || function(target) {
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
  return _extends$a.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var chakraProps = {
  __css: Object,
  sx: Object,
  css: Object,
  noOfLines: Number,
  baseStyle: Object,
  isTruncated: Boolean,
  layerStyle: String,
  textStyle: String,
  apply: String,
  label: String
};
var chakra = function chakra2(tag, options) {
  if (options === void 0) {
    options = {};
  }
  return vue.defineComponent({
    name: "chakra-factory-" + String(tag),
    inheritAttrs: false,
    props: chakraProps,
    setup(props2, _ref) {
      var {
        slots,
        attrs
      } = _ref;
      var {
        class: inheritedClass
      } = attrs, rest = _objectWithoutPropertiesLoose(attrs, ["class"]);
      var {
        label
      } = options, otherStyles = _objectWithoutPropertiesLoose(options, ["layerStyle", "baseStyle", "textStyle", "noOfLines", "isTruncated", "__css", "css", "sx", "apply", "label"]);
      var {
        styles: styles2,
        attrs: elementAttributes
      } = extractStyleAttrs(_extends$a({}, otherStyles, rest));
      var theme2 = useTheme();
      var layerStyle$ = vue.computed(() => {
        var _options;
        return props2.layerStyle || ((_options = options) == null ? void 0 : _options.layerStyle);
      });
      var textStyle$ = vue.computed(() => {
        var _options2;
        return props2.textStyle || ((_options2 = options) == null ? void 0 : _options2.textStyle);
      });
      var baseStyle$ = vue.computed(() => {
        var _options3;
        return props2.baseStyle || ((_options3 = options) == null ? void 0 : _options3.baseStyle);
      });
      var noOfLines$ = vue.computed(() => {
        var _options4;
        return props2.noOfLines || ((_options4 = options) == null ? void 0 : _options4.noOfLines);
      });
      var isTruncated$ = vue.computed(() => {
        var _options5;
        return props2.isTruncated || ((_options5 = options) == null ? void 0 : _options5.isTruncated);
      });
      var __css$ = vue.computed(() => {
        var _options6;
        return props2.__css || ((_options6 = options) == null ? void 0 : _options6.__css);
      });
      var css$ = vue.computed(() => {
        var _options7;
        return props2.css || ((_options7 = options) == null ? void 0 : _options7.css);
      });
      var sx$ = vue.computed(() => {
        var _options8;
        return props2.sx || ((_options8 = options) == null ? void 0 : _options8.sx);
      });
      var apply$ = vue.computed(() => {
        var _options9;
        return props2.apply || ((_options9 = options) == null ? void 0 : _options9.apply);
      });
      var resolvedComponentStyles = resolveStyles(_extends$a({
        __css: __css$.value,
        baseStyle: baseStyle$.value,
        apply: apply$.value,
        layerStyle: layerStyle$.value,
        noOfLines: noOfLines$.value,
        isTruncated: isTruncated$.value,
        textStyle: textStyle$.value,
        sx: sx$.value,
        css: css$.value
      }, styles2, {
        theme: theme2
      }));
      var className = css.css(resolvedComponentStyles);
      var _componentName = label ? "chakra-" + label : "";
      return () => vue.h(tag, _extends$a({
        class: cx(inheritedClass, _componentName, className)
      }, elementAttributes), slots);
    }
  });
};
var resolveStyles = function resolveStyles2(resolvers) {
  if (resolvers === void 0) {
    resolvers = {};
  }
  var {
    layerStyle,
    baseStyle: baseStyle2,
    textStyle,
    noOfLines,
    isTruncated,
    __css,
    css: cssProp,
    sx,
    apply,
    theme: theme2
  } = resolvers, otherStyles = _objectWithoutPropertiesLoose(resolvers, ["layerStyle", "baseStyle", "textStyle", "noOfLines", "isTruncated", "__css", "css", "sx", "apply", "theme"]);
  var _layerStyle = memoizedGet(theme2, "layerStyles." + layerStyle, {});
  var _textStyle = memoizedGet(theme2, "textStyles." + textStyle, {});
  var truncateStyle = {};
  if (noOfLines != null) {
    truncateStyle = {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: noOfLines
    };
  } else if (isTruncated) {
    truncateStyle = {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    };
  }
  var finalStyles = styledSystem.css(objectAssign__default["default"]({}, __css, baseStyle2, {
    apply
  }, _layerStyle, _textStyle, truncateStyle, otherStyles, sx))(theme2);
  var cssObject = objectAssign__default["default"](finalStyles, isFunction(cssProp) ? cssProp(theme2) : cssProp);
  return cssObject;
};
domElements.forEach((tag) => {
  chakra[tag] = chakra(tag, {});
});
var [StylesProvider, useStyles] = createContext({
  name: "StylesContext",
  errorMessage: "useStyles: `styles` is undefined. Seems you forgot to provide `StylesProvider(...)` "
});
function useStyleConfig(themeKey, themingProps, options, userStyleConfig) {
  var _styleConfig$defaultP;
  if (options === void 0) {
    options = {};
  }
  var {
    theme: theme2,
    colorMode
  } = useChakra();
  var themeStyleConfig = get(theme2, "components." + themeKey);
  var styleConfig = userStyleConfig || themeStyleConfig;
  var mergedProps = mergeWith__default["default"]({
    theme: theme2,
    colorMode
  }, (_styleConfig$defaultP = styleConfig == null ? void 0 : styleConfig.defaultProps) != null ? _styleConfig$defaultP : {}, filterUndefined(themingProps));
  return vue.computed(() => {
    var _styleConfig$baseStyl, _styleConfig$variants, _styleConfig$variants2, _styleConfig$sizes$me, _styleConfig$sizes;
    var baseStyles = runIfFn((_styleConfig$baseStyl = styleConfig.baseStyle) != null ? _styleConfig$baseStyl : {}, mergedProps);
    var variants2 = runIfFn((_styleConfig$variants = (_styleConfig$variants2 = styleConfig.variants) == null ? void 0 : _styleConfig$variants2[mergedProps.variant]) != null ? _styleConfig$variants : {}, mergedProps);
    var sizes2 = runIfFn((_styleConfig$sizes$me = (_styleConfig$sizes = styleConfig.sizes) == null ? void 0 : _styleConfig$sizes[mergedProps.size]) != null ? _styleConfig$sizes$me : {}, mergedProps);
    var styles2 = mergeWith__default["default"]({}, baseStyles, sizes2, variants2);
    if (options.isMultiPart && styleConfig.parts) {
      styleConfig.parts.forEach((part) => {
        var _styles$part;
        styles2[part] = (_styles$part = styles2[part]) != null ? _styles$part : {};
      });
    }
    return styles2;
  });
}
function useMultiStyleConfig(themeKey, themingProps) {
  return useStyleConfig(themeKey, themingProps, {
    isMultiPart: true
  });
}
var icons = {
  star: {
    path: '\n      <path\n        fill="currentColor"\n        d="M23.555,8.729a1.505,1.505,0,0,0-1.406-.98H16.062a.5.5,0,0,1-.472-.334L13.405,1.222a1.5,1.5,0,0,0-2.81,0l-.005.016L8.41,7.415a.5.5,0,0,1-.471.334H1.85A1.5,1.5,0,0,0,.887,10.4l5.184,4.3a.5.5,0,0,1,.155.543L4.048,21.774a1.5,1.5,0,0,0,2.31,1.684l5.346-3.92a.5.5,0,0,1,.591,0l5.344,3.919a1.5,1.5,0,0,0,2.312-1.683l-2.178-6.535a.5.5,0,0,1,.155-.543l5.194-4.306A1.5,1.5,0,0,0,23.555,8.729Z"\n      />\n    '
  },
  email: {
    path: '\n    <g fill="currentColor">\n      <path d="M11.114,14.556a1.252,1.252,0,0,0,1.768,0L22.568,4.87a.5.5,0,0,0-.281-.849A1.966,1.966,0,0,0,22,4H2a1.966,1.966,0,0,0-.289.021.5.5,0,0,0-.281.849Z" />\n      <path d="M23.888,5.832a.182.182,0,0,0-.2.039l-6.2,6.2a.251.251,0,0,0,0,.354l5.043,5.043a.75.75,0,1,1-1.06,1.061l-5.043-5.043a.25.25,0,0,0-.354,0l-2.129,2.129a2.75,2.75,0,0,1-3.888,0L7.926,13.488a.251.251,0,0,0-.354,0L2.529,18.531a.75.75,0,0,1-1.06-1.061l5.043-5.043a.251.251,0,0,0,0-.354l-6.2-6.2a.18.18,0,0,0-.2-.039A.182.182,0,0,0,0,6V18a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V6A.181.181,0,0,0,23.888,5.832Z" />\n    </g>\n    '
  },
  phone: {
    viewBox: "0 0 14 14",
    path: '\n    <path\n      fill="currentColor"\n      d="M2.20731,0.0127209 C2.1105,-0.0066419 1.99432,-0.00664663 1.91687,0.032079 C0.871279,0.438698 0.212942,1.92964 0.0580392,2.95587 C-0.426031,6.28627 2.20731,9.17133 4.62766,11.0689 C6.77694,12.7534 10.9012,15.5223 13.3409,12.8503 C13.6507,12.5211 14.0186,12.037 13.9993,11.553 C13.9412,10.7397 13.186,10.1588 12.6051,9.71349 C12.1598,9.38432 11.2304,8.47427 10.6495,8.49363 C10.1267,8.51299 9.79754,9.05515 9.46837,9.38432 L8.88748,9.96521 C8.79067,10.062 7.55145,9.24878 7.41591,9.15197 C6.91248,8.8228 6.4284,8.45491 6.00242,8.04829 C5.57644,7.64167 5.18919,7.19632 4.86002,6.73161 C4.7632,6.59607 3.96933,5.41495 4.04678,5.31813 C4.04678,5.31813 4.72448,4.58234 4.91811,4.2919 C5.32473,3.67229 5.63453,3.18822 5.16982,2.45243 C4.99556,2.18135 4.78257,1.96836 4.55021,1.73601 C4.14359,1.34875 3.73698,0.942131 3.27227,0.612963 C3.02055,0.419335 2.59457,0.0708094 2.20731,0.0127209 Z"\n    />\n    '
  },
  info: {
    path: '\n    <path\n      fill="currentColor"\n      d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"\n    />\n    '
  },
  "warning-alt": {
    path: '\n      <path\n        fill="currentColor"\n        d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"\n      />'
  },
  check: {
    path: '\n      <g fill="currentColor">\n        <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />\n      </g>\n    ',
    viewBox: "0 0 14 14"
  },
  "check-circle": {
    path: '\n      <path\n        fill="currentColor"\n        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"\n      />'
  },
  exclamation: {
    path: '\n      <path\n        fill="currentColor"\n        d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"\n      />'
  },
  "question-outline": {
    viewBox: "0 0 24 24",
    path: '\n    <g stroke="currentColor" strokeWidth="1.5">\n      <path\n        strokeLinecap="full"\n        fill="none"\n        d="M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"\n      />\n      <path\n        fill="none"\n        strokeLinecap="full"\n        d="M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"\n      />\n      <circle fill="none" strokeMiterlimit="10" cx="12" cy="12" r="11.25" />\n    </g>\n    '
  },
  close: {
    path: '\n      <path\n        fill="currentColor"\n        d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"\n      />'
  },
  "chevron-right": {
    path: '\n    <path\n      fill="currentColor"\n      d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"\n    />'
  },
  "chevron-left": {
    path: '\n      <path\n        fill="currentColor"\n        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"\n      />'
  },
  "chevron-down": {
    path: '\n    <path\n      fill="currentColor"\n      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"\n    />'
  },
  "chevron-up": {
    path: '\n    <path\n      fill="currentColor"\n      d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"\n    />'
  },
  "arrow-forward": {
    path: '\n    <path\n      fill="currentColor"\n      d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"\n    />'
  },
  "arrow-up": {
    path: '\n    <path\n      fill="currentColor"\n      d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"\n    />'
  },
  "arrow-down": {
    path: '\n      <path\n        fill="currentColor"\n        d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"\n      />'
  },
  add: {
    path: '\n    <path\n      fill="currentColor"\n      d="M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"\n    />\n    '
  },
  minus: {
    path: '\n      <g fill="currentColor">\n        <rect height="4" width="20" x="2" y="10" />\n      </g>\n    '
  },
  moon: {
    path: '\n      <path\n        fill="currentColor"\n        d="M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z"\n      />\n    '
  },
  sun: {
    path: '\n      <g\n        strokeLinejoin="full"\n        strokeLinecap="full"\n        strokeWidth="2"\n        fill="none"\n        stroke="currentColor"\n      >\n        <circle cx="12" cy="12" r="5" />\n        <path d="M12 1v2" />\n        <path d="M12 21v2" />\n        <path d="M4.22 4.22l1.42 1.42" />\n        <path d="M18.36 18.36l1.42 1.42" />\n        <path d="M1 12h2" />\n        <path d="M21 12h2" />\n        <path d="M4.22 19.78l1.42-1.42" />\n        <path d="M18.36 5.64l1.42-1.42" />\n      </g>\n    '
  },
  warning: {
    path: '\n    <path\n      fill="currentColor"\n      d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"\n    />'
  },
  "small-close": {
    path: '\n      <path\n        d="M9.41 8l2.29-2.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-2.29-2.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 4.3 10.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l2.29 2.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z"\n        fillRule="evenodd"\n        fill="currentColor"\n      />\n    ',
    viewBox: "0 0 16 16"
  },
  "triangle-up": {
    path: '\n      <path\n        fill="currentColor"\n        d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"\n      />\n    '
  },
  "triangle-down": {
    path: '\n      <path\n        fill="currentColor"\n        d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"\n      />\n    '
  }
};
function extendTheme(overrides, baseTheme) {
  if (baseTheme === void 0) {
    baseTheme = theme;
  }
  function customizer(source, override) {
    if (isFunction(source)) {
      return function() {
        var sourceValue = source(...arguments);
        var overrideValue = isFunction(override) ? override(...arguments) : override;
        return mergeWith__default["default"]({}, sourceValue, overrideValue, customizer);
      };
    }
    return void 0;
  }
  return mergeWith__default["default"]({}, baseTheme, overrides, customizer);
}
var parseIcon = (iconObject) => {
  var {
    icon
  } = iconObject;
  if (icon) {
    var [w, h, content, svg, path, , attrs] = icon;
    return {
      ["" + iconObject.iconName]: {
        path: iconObject.prefix.startsWith("fa") ? '<path d="' + path + '" fill="currentColor" />' : iconObject.prefix.startsWith("fe") ? content : svg,
        viewBox: "0 0 " + w + " " + h,
        attrs
      }
    };
  } else {
    return {};
  }
};
var parseIcons = function parseIcons2(iconSet) {
  if (iconSet === void 0) {
    iconSet = {};
  }
  var result = Object.values(iconSet).map((value) => parseIcon(value)).reduce((target, source) => mergeWith__default["default"](target, source), {});
  return result;
};
function _extends$9() {
  _extends$9 = Object.assign || function(target) {
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
  return _extends$9.apply(this, arguments);
}
vue.defineComponent({
  props: {
    as: {
      type: [String],
      default: "div"
    }
  },
  setup(props2, _ref) {
    var {
      slots,
      attrs
    } = _ref;
    return () => vue.h(chakra(props2.as, {
      label: "accordion"
    }), _extends$9({}, attrs), slots);
  }
});
function _extends$8() {
  _extends$8 = Object.assign || function(target) {
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
  return _extends$8.apply(this, arguments);
}
var fallbackIcon = {
  path: '\n    <g stroke="currentColor" strokeWidth="1.5">\n      <path\n        strokeLinecap="round"\n        fill="none"\n        d="M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"\n      />\n      <path\n        fill="currentColor"\n        strokeLinecap="round"\n        d="M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"\n      />\n      <circle fill="none" strokeMiterlimit="10" cx="12" cy="12" r="11.25" />\n    </g>\n  ',
  viewBox: "0 0 24 24"
};
var CIcon = vue.defineComponent({
  props: {
    as: {
      type: [Object, String],
      default: "svg"
    },
    name: {
      type: [String]
    },
    size: {
      type: [String],
      default: "1em"
    }
  },
  setup(props2, _ref) {
    var {
      slots,
      attrs
    } = _ref;
    var icons2 = vue.inject("$chakraIcons");
    var icon = vue.computed(() => (icons2 == null ? void 0 : icons2[props2 == null ? void 0 : props2.name]) || fallbackIcon);
    var vnodeProps = vue.computed(() => ({
      w: props2.size,
      h: props2.size,
      display: "inline-block",
      lineHeight: "1em",
      flexShrink: 0,
      color: "currentColor",
      innerHTML: icon.value.path,
      focusable: false,
      viewBox: fallbackIcon.viewBox
    }));
    return () => vue.h(chakra(props2.as, {
      label: "icon"
    }), _extends$8({}, icon.value.attrs || {}, vnodeProps.value, attrs), slots);
  }
});
function _extends$7() {
  _extends$7 = Object.assign || function(target) {
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
  return _extends$7.apply(this, arguments);
}
var STATUSES = {
  info: {
    colorScheme: "blue",
    icon: "info"
  },
  success: {
    colorScheme: "green",
    icon: "check-circle"
  },
  warning: {
    colorScheme: "orange",
    icon: "warning-alt"
  },
  error: {
    colorScheme: "red",
    icon: "warning"
  }
};
var [AlertProvider, useAlertContext] = createContext({
  name: "AlertContext",
  errorMessage: "useAlertContext: `context` is undefined. Seems you forgot to wrap alert components in `<c-alert />`"
});
vue.defineComponent({
  name: "CAlert",
  props: {
    as: {
      type: [String, Object],
      default: "div"
    },
    status: {
      type: [String],
      default: "info"
    },
    colorScheme: {
      type: [String]
    },
    styleConfig: {
      type: [Object]
    },
    variant: {
      type: [String],
      default: "solid"
    }
  },
  setup(props2, _ref) {
    var {
      slots,
      attrs
    } = _ref;
    var colorScheme = props2.colorScheme || STATUSES[props2.status].colorScheme;
    var themingProps = {
      colorScheme,
      variant: props2.variant
    };
    var styles2 = useMultiStyleConfig("Alert", themingProps);
    var alertStyles = _extends$7({
      width: "100%",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden"
    }, styles2.value.container);
    StylesProvider(styles2.value);
    AlertProvider({
      status: props2.status
    });
    return () => vue.h(chakra(props2.as, {
      label: "alert"
    }), _extends$7({
      role: "alert"
    }, alertStyles, attrs), slots);
  }
});
vue.defineComponent({
  name: "CAlertTitle",
  setup(_, _ref2) {
    var {
      attrs,
      slots
    } = _ref2;
    var styles2 = useStyles();
    return () => vue.h(chakra("div", {
      label: "alert__title"
    }), _extends$7({}, styles2.title, attrs), slots);
  }
});
vue.defineComponent({
  name: "CAlertDescription",
  setup(_, _ref3) {
    var {
      attrs,
      slots
    } = _ref3;
    var styles2 = useStyles();
    return () => vue.h(chakra("div", {
      label: "alert__description"
    }), _extends$7({}, styles2.description, attrs), slots);
  }
});
vue.defineComponent({
  name: "CAlertIcon",
  props: {
    icon: {
      type: [String]
    }
  },
  setup(props2, _ref4) {
    var {
      attrs
    } = _ref4;
    var {
      status
    } = useAlertContext();
    var {
      icon
    } = STATUSES[status];
    var styles2 = useStyles();
    var alertIcon = vue.computed(() => props2.icon || icon);
    return () => vue.h(CIcon, _extends$7({
      class: "alert__icon",
      name: alertIcon.value
    }, styles2.icon, attrs));
  }
});
function _extends$6() {
  _extends$6 = Object.assign || function(target) {
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
  return _extends$6.apply(this, arguments);
}
var CBadge = vue.defineComponent({
  props: {
    as: {
      type: [Object, String],
      default: "div"
    },
    colorScheme: String,
    variant: String,
    size: String,
    styleConfig: String
  },
  setup(props2, _ref) {
    var {
      slots,
      attrs
    } = _ref;
    var themingProps = vue.computed(() => filterUndefined({
      colorScheme: props2.colorScheme,
      variant: props2.variant,
      size: props2.size,
      styleConfig: props2.styleConfig
    }));
    var styles2 = useStyleConfig("Badge", themingProps.value);
    return () => vue.h(chakra(props2.as), _extends$6({
      __css: _extends$6({
        display: "inline-block",
        whiteSpace: "nowrap",
        verticalAlign: "middle"
      }, styles2.value)
    }, attrs), slots);
  }
});
function _extends$5() {
  _extends$5 = Object.assign || function(target) {
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
  return _extends$5.apply(this, arguments);
}
var props$1 = {
  isAttached: Boolean,
  isDisabled: Boolean,
  spacing: {
    type: [String, Number, Array],
    default: 3
  },
  variant: {
    type: String,
    default: "solid"
  },
  size: {
    type: String,
    default: "sm"
  },
  colorScheme: String,
  styleConfig: String
};
var [ButtonGroupProvider, useButtonGroup] = createContext({
  strict: false,
  name: "ButtonGroupContext"
});
vue.defineComponent({
  name: "CButtonGroup",
  props: props$1,
  setup(props2, _ref) {
    var {
      attrs,
      slots
    } = _ref;
    ButtonGroupProvider(() => ({
      size: props2.size,
      colorScheme: props2.colorScheme,
      variant: props2.variant,
      isDisabled: props2.isDisabled
    }));
    var styles2 = vue.computed(() => {
      var groupStyles = {
        display: "inline-flex"
      };
      if (props2.isAttached) {
        groupStyles = _extends$5({}, groupStyles, {
          "> *:first-of-type:not(:last-of-type)": {
            borderRightRadius: 0
          },
          "> *:not(:first-of-type):not(:last-of-type)": {
            borderRadius: 0
          },
          "> *:not(:first-of-type):last-of-type": {
            borderLeftRadius: 0
          }
        });
      } else {
        groupStyles = _extends$5({}, groupStyles, {
          "& > *:not(style) ~ *:not(style)": {
            marginLeft: props2.spacing
          }
        });
      }
      return groupStyles;
    });
    return () => vue.h(chakra("div", {
      label: "button__group"
    }), _extends$5({
      __css: _extends$5({}, styles2.value),
      role: "group"
    }, attrs), slots);
  }
});
var visuallyHiddenStyle = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute"
};
var CVisuallyHidden = chakra("span", {
  baseStyle: visuallyHiddenStyle
});
chakra("input", {
  baseStyle: visuallyHiddenStyle
});
function _extends$4() {
  _extends$4 = Object.assign || function(target) {
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
  return _extends$4.apply(this, arguments);
}
var spin = css.keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});
var props = {
  as: {
    type: [Object, String],
    default: "div"
  },
  emptyColor: {
    type: String,
    default: "transparent"
  },
  thickness: {
    type: String,
    default: "2px"
  },
  speed: {
    type: String,
    default: "0.45s"
  },
  color: {
    type: String
  },
  label: {
    type: String
  },
  colorScheme: String,
  variant: {
    type: String,
    default: "solid"
  },
  size: {
    type: String,
    default: "md"
  },
  styleConfig: String
};
var CSpinner = vue.defineComponent({
  props,
  setup(props2, _ref) {
    var {
      slots,
      attrs
    } = _ref;
    var themingProps = vue.computed(() => ({
      colorScheme: props2.colorScheme,
      variant: props2.variant,
      size: props2.size,
      styleConfig: props2.styleConfig
    }));
    var styles2 = useStyleConfig("Spinner", _extends$4({}, themingProps.value));
    var spinnerStyles = _extends$4({
      display: "inline-block",
      borderColor: "currentColor",
      borderStyle: "solid",
      borderRadius: "99999px",
      borderWidth: props2.thickness,
      borderBottomColor: props2.emptyColor,
      borderLeftColor: props2.emptyColor,
      color: props2.color,
      animation: spin + " " + props2.speed + " linear infinite"
    }, styles2.value);
    return () => vue.h(chakra(props2.as, {
      label: "spinner",
      __css: spinnerStyles
    }), _extends$4({}, attrs), props2.label && [vue.h(CVisuallyHidden, props2.label)]);
  }
});
var BUTTON_PROPS = {
  as: {
    type: String,
    default: "button"
  },
  isLoading: Boolean,
  isActive: Boolean,
  isDisabled: Boolean,
  loadingText: String,
  isFullWidth: Boolean,
  type: String,
  leftIcon: String,
  rightIcon: String,
  colorScheme: String,
  variant: String,
  size: String,
  styleConfig: String,
  iconSpacing: {
    type: [String, Number, Array],
    default: "0.5rem"
  }
};
function _extends$3() {
  _extends$3 = Object.assign || function(target) {
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
  return _extends$3.apply(this, arguments);
}
var CButtonSpinner = vue.defineComponent({
  name: "CButtonSpinner",
  inheritAttrs: false,
  props: {
    label: Boolean,
    spacing: [Number, String, Array]
  },
  setup(props2, _ref) {
    var {
      attrs
    } = _ref;
    var spinnerStyles = vue.computed(() => ({
      display: "flex",
      alignItems: "center",
      position: props2.label ? "relative" : "absolute",
      marginEnd: props2.label ? props2.spacing : 0
    }));
    return () => vue.h(chakra("div", {
      label: "button__spinner"
    }), _extends$3({}, spinnerStyles.value, attrs), [vue.h(CSpinner, {
      color: "currentColor",
      width: "1em",
      height: "1em"
    })]);
  }
});
var CButtonIcon = vue.defineComponent({
  name: "CButtonIcon",
  inheritAttrs: false,
  props: {
    icon: String
  },
  setup(props2, _ref2) {
    var {
      attrs
    } = _ref2;
    return () => vue.h(CIcon, _extends$3({
      label: "button__icon",
      name: props2.icon
    }, attrs));
  }
});
var CButton = vue.defineComponent({
  name: "CButton",
  props: BUTTON_PROPS,
  setup(props2, _ref3) {
    var _styles$value$_focus, _styles$value;
    var {
      attrs,
      slots
    } = _ref3;
    var themingProps = vue.computed(() => filterUndefined({
      colorScheme: props2.colorScheme,
      variant: props2.variant,
      size: props2.size,
      styleConfig: props2.styleConfig
    }));
    var group = useButtonGroup();
    var styles2 = useStyleConfig("Button", _extends$3({}, group == null ? void 0 : group(), themingProps.value));
    var _focus = mergeWith__default["default"]({}, (_styles$value$_focus = (_styles$value = styles2.value) == null ? void 0 : _styles$value["_focus"]) != null ? _styles$value$_focus : {}, {
      zIndex: 1
    });
    var buttonStyles = vue.computed(() => _extends$3({
      display: "inline-flex",
      appearance: "none",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 250ms",
      userSelect: "none",
      position: "relative",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      outline: "none",
      width: props2.isFullWidth ? "100%" : "auto"
    }, styles2.value, !!group && {
      _focus
    }));
    return () => vue.h(chakra(props2.as, {
      label: "button"
    }), _extends$3({
      disabled: props2.isDisabled || props2.isLoading,
      type: props2.as === "button" ? void 0 : props2.type,
      dataActive: dataAttr(props2.isActive),
      dataLoading: dataAttr(props2.isLoading)
    }, buttonStyles.value, attrs), () => [props2.leftIcon && !props2.isLoading && vue.h(CButtonIcon, {
      icon: props2.leftIcon,
      marginEnd: props2.iconSpacing
    }), props2.isLoading && vue.h(CButtonSpinner, {
      spacing: props2.iconSpacing,
      label: props2.loadingText,
      __css: {
        fontSize: "1em",
        lineHeight: "normal"
      }
    }), props2.isLoading ? props2.loadingText || vue.h(chakra.span, {
      opacity: 0
    }, slots == null ? void 0 : slots.default == null ? void 0 : slots.default()) : slots == null ? void 0 : slots.default == null ? void 0 : slots.default(), props2.rightIcon && !props2.isLoading && vue.h(CButtonIcon, {
      icon: props2.rightIcon,
      marginStart: props2.iconSpacing
    })]);
  }
});
function _extends$2() {
  _extends$2 = Object.assign || function(target) {
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
  return _extends$2.apply(this, arguments);
}
var IconButtonProps = _extends$2({}, BUTTON_PROPS, {
  icon: String,
  isRound: Boolean,
  ariaLabel: {
    type: String,
    required: true
  }
});
var CIconButton = vue.defineComponent({
  name: "CIconButton",
  props: IconButtonProps,
  setup(props2, _ref) {
    var {
      attrs
    } = _ref;
    if (!props2.ariaLabel) {
      console.error("chakra-ui: The `aria-label` prop is required for the <c-icon-button />");
    }
    return () => vue.h(CButton, _extends$2({
      padding: 0,
      rounded: props2.isRound ? "rounded" : "md",
      "aria-label": props2.ariaLabel
    }, props2, attrs), () => [vue.h(CIcon, {
      name: props2.icon
    })]);
  }
});
function _extends$1() {
  _extends$1 = Object.assign || function(target) {
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
  return _extends$1.apply(this, arguments);
}
var CFlex = vue.defineComponent({
  props: {
    as: {
      type: [Object, String],
      default: "div"
    },
    align: [Object, String, Array],
    justify: [Object, String, Array],
    wrap: [Object, String, Array],
    direction: {
      type: [Object, String, Array],
      default: "row"
    },
    basis: [Object, String, Array],
    grow: [Object, String, Array],
    shrink: [Object, String, Array],
    size: String
  },
  setup(props2, _ref) {
    var {
      slots,
      attrs
    } = _ref;
    var styles2 = vue.reactive({
      display: "flex",
      flexDirection: props2.direction,
      alignItems: props2.align,
      justifyContent: props2.justify,
      flexWrap: props2.wrap,
      flexBasis: props2.basis,
      flexGrow: props2.grow,
      flexShrink: props2.shrink,
      h: props2.size,
      w: props2.size
    });
    return () => vue.h(chakra(props2.as), _extends$1({
      __css: styles2
    }, attrs), slots);
  }
});
var CReset = vue.defineComponent({
  setup() {
    css.injectGlobal(`
      html {
        line-height: 1.5;
        -webkit-text-size-adjust: 100%;
        font-family: system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        touch-action: manipulation;
      }

      body {
        position: relative;
        min-height: 100%;
        font-feature-settings: 'kern';
      }

      *,
      *::before,
      *::after {
        border-width: 0;
        border-style: solid;
        box-sizing: border-box;
      }

      main {
        display: block;
      }

      hr {
        border-top-width: 1px;
        box-sizing: content-box;
        height: 0;
        overflow: visible;
      }

      pre,
      code,
      kbd,
      samp {
        font-family: SFMono-Regular,  Menlo, Monaco, Consolas, monospace;
        font-size: 1em;
      }

      a {
        background-color: transparent;
        color: inherit;
        text-decoration: inherit;
      }

      abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        -webkit-text-decoration: underline dotted;
        text-decoration: underline dotted;
      }

      b,
      strong {
        font-weight: bold;
      }

      small {
        font-size: 80%;
      }

      sub,
      sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }

      sub {
        bottom: -0.25em;
      }

      sup {
        top: -0.5em;
      }

      img {
        border-style: none;
      }

      button,
      input,
      optgroup,
      select,
      textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
      }

      button,
      input {
        overflow: visible;
      }

      button,
      select {
        text-transform: none;
      }

      button::-moz-focus-inner,
      [type="button"]::-moz-focus-inner,
      [type="reset"]::-moz-focus-inner,
      [type="submit"]::-moz-focus-inner {
        border-style: none;
        padding: 0;
      }

      fieldset {
        padding: 0.35em 0.75em 0.625em;
      }

      legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
      }

      progress {
        vertical-align: baseline;
      }

      textarea {
        overflow: auto;
      }

      [type="checkbox"],
      [type="radio"] {
        box-sizing: border-box;
        padding: 0;
      }

      [type="number"]::-webkit-inner-spin-button,
      [type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none !important;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }

      [type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
      }

      [type="search"]::-webkit-search-decoration {
        -webkit-appearance: none !important;
      }

      ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
      }

      details {
        display: block;
      }

      summary {
        display: list-item;
      }

      template {
        display: none;
      }

      [hidden] {
        display: none !important;
      }

      body,
      blockquote,
      dl,
      dd,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      hr,
      figure,
      p,
      pre {
        margin: 0;
      }

      button {
        background: transparent;
        padding: 0;
      }

      fieldset {
        margin: 0;
        padding: 0;
      }

      ol,
      ul {
        margin: 0;
        padding: 0;
      }

      textarea {
        resize: vertical;
      }

      button,
      [role="button"] {
        cursor: pointer;
      }

      button::-moz-focus-inner {
        border: 0 !important;
      }

      table {
        border-collapse: collapse;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: inherit;
        font-weight: inherit;
      }

      button,
      input,
      optgroup,
      select,
      textarea {
        padding: 0;
        line-height: inherit;
        color: inherit;
      }

      img,
      svg,
      video,
      canvas,
      audio,
      iframe,
      embed,
      object {
        display: block;
      }

      img,
      video {
        max-width: 100%;
        height: auto;
      }

      [data-js-focus-visible] :focus:not([data-focus-visible-added]) {
        outline: none;
        box-shadow: none;
      }

      select::-ms-expand {
        display: none;
      }
    `);
    return () => null;
  }
});
vue.defineComponent({
  name: "CThemeProvider",
  props: {
    value: {
      type: [Object],
      default: () => void 0
    }
  },
  setup(props2, _ref) {
    var {
      slots
    } = _ref;
    var pluginTheme = vue.inject("$chakraTheme");
    var applicationTheme = vue.computed(() => props2.value || pluginTheme);
    vue.provide("$chakraTheme", applicationTheme.value);
    return () => vue.h(vue.Fragment, slots.default == null ? void 0 : slots.default({
      $chakraTheme: props2.value
    }));
  }
});
function _extends() {
  _extends = Object.assign || function(target) {
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
var ChakraUIVuePlugin = {
  install(app, options) {
    var _options$icons, _theme$config;
    if (options === void 0) {
      options = {};
    }
    var theme$12 = options.extendTheme || theme;
    var libraryIcons = ((_options$icons = options.icons) == null ? void 0 : _options$icons.library) || {};
    var colorMode = ((_theme$config = theme$12.config) == null ? void 0 : _theme$config.initialColorMode) || "light";
    app.config.globalProperties.$chakraTheme = theme$12;
    app.provide("$chakraTheme", theme$12);
    app.provide("$chakraColorMode", colorMode);
    libraryIcons = parseIcons(libraryIcons);
    var mergedIcons = _extends({}, icons, libraryIcons);
    app.provide("$chakraIcons", mergedIcons);
  }
};
var CBox = chakra.div;
var _sfc_main$4 = vue.defineComponent({
  name: "App",
  components: {
    CReset
  },
  setup() {
    const siteData = vue.reactive({
      title: "Chakra UI Vue Next + Vite",
      description: "Chakra UI Vue Next + Vite test"
    });
    head.useHead({
      title: vue.computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: vue.computed(() => siteData.description)
        }
      ]
    });
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_c_reset = vue.resolveComponent("c-reset");
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<!--[-->`);
  _push(serverRenderer.ssrRenderComponent(_component_c_reset, null, null, _parent));
  _push(serverRenderer.ssrRenderComponent(_component_router_view, null, null, _parent));
  _push(`<!--]-->`);
}
_sfc_main$4.ssrRender = _sfc_ssrRender$3;
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props2, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/jonathanbakebwa/Github/chakra-ui-vue-next/website/src/App.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props2, ctx) : void 0;
};
var _sfc_main$3 = vue.defineComponent({
  name: "Hero",
  components: {
    CButton,
    CFlex,
    CBadge
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_chakra_header = vue.resolveComponent("chakra.header");
  const _component_chakra_div = vue.resolveComponent("chakra.div");
  const _component_chakra_h1 = vue.resolveComponent("chakra.h1");
  const _component_chakra_span = vue.resolveComponent("chakra.span");
  const _component_chakra_p = vue.resolveComponent("chakra.p");
  const _component_CFlex = vue.resolveComponent("CFlex");
  const _component_CButton = vue.resolveComponent("CButton");
  _push(serverRenderer.ssrRenderComponent(_component_chakra_header, vue.mergeProps({
    pos: "relative",
    "min-h": "100vh",
    pt: "150px"
  }, _attrs), {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.ssrRenderComponent(_component_chakra_div, null, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(serverRenderer.ssrRenderComponent(_component_chakra_h1, {
                maxW: "16ch",
                fontSize: {base: "2.25rem", sm: "3rem", lg: "4rem"},
                fontFamily: "heading",
                letterSpacing: "tighter",
                fontWeight: "extrabold",
                mb: "16px",
                lineHeight: "1.2"
              }, {
                default: vue.withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Build accessible Vue apps `);
                    _push4(serverRenderer.ssrRenderComponent(_component_chakra_span, {color: "teal.500"}, {
                      default: vue.withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(` with speed `);
                        } else {
                          return [
                            vue.createTextVNode(" with speed ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4));
                  } else {
                    return [
                      vue.createTextVNode(" Build accessible Vue apps "),
                      vue.createVNode(_component_chakra_span, {color: "teal.500"}, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(" with speed ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3));
            } else {
              return [
                vue.createVNode(_component_chakra_h1, {
                  maxW: "16ch",
                  fontSize: {base: "2.25rem", sm: "3rem", lg: "4rem"},
                  fontFamily: "heading",
                  letterSpacing: "tighter",
                  fontWeight: "extrabold",
                  mb: "16px",
                  lineHeight: "1.2"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(" Build accessible Vue apps "),
                    vue.createVNode(_component_chakra_span, {color: "teal.500"}, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(" with speed ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["fontSize"])
              ];
            }
          }),
          _: 1
        }, _parent2));
        _push2(serverRenderer.ssrRenderComponent(_component_chakra_p, {
          mt: "4",
          color: "gray.800",
          mb: "6",
          "font-size": "lg",
          maxW: "60ch"
        }, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Chakra UI Vue Next is a simple modular and accessible component library that gives you the building blocks to build Vue applications with speed. `);
            } else {
              return [
                vue.createTextVNode(" Chakra UI Vue Next is a simple modular and accessible component library that gives you the building blocks to build Vue applications with speed. ")
              ];
            }
          }),
          _: 1
        }, _parent2));
        _push2(serverRenderer.ssrRenderComponent(_component_CFlex, {"flex-dir": "row"}, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(serverRenderer.ssrRenderComponent(_component_CButton, {
                as: "a",
                "text-decoration": "none",
                href: "https://github.com/chakra-ui/chakra-ui-vue-next",
                size: "lg",
                "color-scheme": "teal"
              }, {
                default: vue.withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Get started `);
                  } else {
                    return [
                      vue.createTextVNode(" Get started ")
                    ];
                  }
                }),
                _: 1
              }, _parent3));
              _push3(serverRenderer.ssrRenderComponent(_component_CButton, {
                as: "a",
                "text-decoration": "none",
                href: "https://github.com/chakra-ui/chakra-ui-vue-next",
                "left-icon": "github",
                ml: "4",
                variant: "outline",
                "color-scheme": "teal",
                size: "lg"
              }, {
                default: vue.withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Github `);
                  } else {
                    return [
                      vue.createTextVNode(" Github ")
                    ];
                  }
                }),
                _: 1
              }, _parent3));
            } else {
              return [
                vue.createVNode(_component_CButton, {
                  as: "a",
                  "text-decoration": "none",
                  href: "https://github.com/chakra-ui/chakra-ui-vue-next",
                  size: "lg",
                  "color-scheme": "teal"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(" Get started ")
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_CButton, {
                  as: "a",
                  "text-decoration": "none",
                  href: "https://github.com/chakra-ui/chakra-ui-vue-next",
                  "left-icon": "github",
                  ml: "4",
                  variant: "outline",
                  "color-scheme": "teal",
                  size: "lg"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(" Github ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2));
      } else {
        return [
          vue.createVNode(_component_chakra_div, null, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_chakra_h1, {
                maxW: "16ch",
                fontSize: {base: "2.25rem", sm: "3rem", lg: "4rem"},
                fontFamily: "heading",
                letterSpacing: "tighter",
                fontWeight: "extrabold",
                mb: "16px",
                lineHeight: "1.2"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(" Build accessible Vue apps "),
                  vue.createVNode(_component_chakra_span, {color: "teal.500"}, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(" with speed ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["fontSize"])
            ]),
            _: 1
          }),
          vue.createVNode(_component_chakra_p, {
            mt: "4",
            color: "gray.800",
            mb: "6",
            "font-size": "lg",
            maxW: "60ch"
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(" Chakra UI Vue Next is a simple modular and accessible component library that gives you the building blocks to build Vue applications with speed. ")
            ]),
            _: 1
          }),
          vue.createVNode(_component_CFlex, {"flex-dir": "row"}, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_CButton, {
                as: "a",
                "text-decoration": "none",
                href: "https://github.com/chakra-ui/chakra-ui-vue-next",
                size: "lg",
                "color-scheme": "teal"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(" Get started ")
                ]),
                _: 1
              }),
              vue.createVNode(_component_CButton, {
                as: "a",
                "text-decoration": "none",
                href: "https://github.com/chakra-ui/chakra-ui-vue-next",
                "left-icon": "github",
                ml: "4",
                variant: "outline",
                "color-scheme": "teal",
                size: "lg"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(" Github ")
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
_sfc_main$3.ssrRender = _sfc_ssrRender$2;
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props2, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/jonathanbakebwa/Github/chakra-ui-vue-next/website/src/components/home/Hero.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props2, ctx) : void 0;
};
var _sfc_main$2 = vue.defineComponent({
  name: "Navbar",
  components: {
    CBox,
    CFlex,
    CIconButton,
    CIcon
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_chakra_nav = vue.resolveComponent("chakra.nav");
  const _component_CFlex = vue.resolveComponent("CFlex");
  const _component_CIcon = vue.resolveComponent("CIcon");
  const _component_CBox = vue.resolveComponent("CBox");
  const _component_CIconButton = vue.resolveComponent("CIconButton");
  _push(serverRenderer.ssrRenderComponent(_component_chakra_nav, vue.mergeProps({
    h: "60px",
    w: "100vw",
    px: "4",
    d: "flex",
    position: "fixed",
    "align-items": "center",
    shadow: "sm",
    bg: "white"
  }, _attrs), {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.ssrRenderComponent(_component_CFlex, {
          "align-items": "center",
          flex: "1"
        }, null, _parent2));
        _push2(serverRenderer.ssrRenderComponent(_component_CFlex, {
          flex: "1",
          "justify-content": "center"
        }, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(serverRenderer.ssrRenderComponent(_component_CIcon, {
                name: "search",
                mt: "8px"
              }, null, _parent3));
            } else {
              return [
                vue.createVNode(_component_CIcon, {
                  name: "search",
                  mt: "8px"
                })
              ];
            }
          }),
          _: 1
        }, _parent2));
        _push2(serverRenderer.ssrRenderComponent(_component_CBox, {
          as: "ul",
          d: "flex",
          flex: "1",
          "align-items": "center",
          "list-style-type": "none",
          pt: "8px",
          "justify-content": "flex-end"
        }, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(serverRenderer.ssrRenderComponent(_component_CBox, {
                as: "li",
                mr: "2"
              }, {
                default: vue.withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(serverRenderer.ssrRenderComponent(_component_CIconButton, {
                      as: "a",
                      variant: "ghost",
                      "variant-color": "gray",
                      "aria-label": "View the documentation",
                      target: "_blank",
                      href: "https://github.com/chakra-ui/chakra-ui-vue",
                      icon: "book"
                    }, null, _parent4));
                  } else {
                    return [
                      vue.createVNode(_component_CIconButton, {
                        as: "a",
                        variant: "ghost",
                        "variant-color": "gray",
                        "aria-label": "View the documentation",
                        target: "_blank",
                        href: "https://github.com/chakra-ui/chakra-ui-vue",
                        icon: "book"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3));
              _push3(serverRenderer.ssrRenderComponent(_component_CBox, {
                as: "li",
                mr: "2"
              }, {
                default: vue.withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(serverRenderer.ssrRenderComponent(_component_CIconButton, {
                      as: "a",
                      variant: "ghost",
                      "variant-color": "gray",
                      "aria-label": "Join Discord channel",
                      target: "_blank",
                      href: "https://discord.gg/sq2Kp6x",
                      icon: "message-circle"
                    }, null, _parent4));
                  } else {
                    return [
                      vue.createVNode(_component_CIconButton, {
                        as: "a",
                        variant: "ghost",
                        "variant-color": "gray",
                        "aria-label": "Join Discord channel",
                        target: "_blank",
                        href: "https://discord.gg/sq2Kp6x",
                        icon: "message-circle"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3));
              _push3(serverRenderer.ssrRenderComponent(_component_CBox, {
                as: "li",
                mr: "2"
              }, {
                default: vue.withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(serverRenderer.ssrRenderComponent(_component_CIconButton, {
                      as: "a",
                      variant: "ghost",
                      "variant-color": "gray",
                      "aria-label": "Open menu",
                      target: "_blank",
                      href: "https://discord.gg/sq2Kp6x",
                      icon: "menu"
                    }, null, _parent4));
                  } else {
                    return [
                      vue.createVNode(_component_CIconButton, {
                        as: "a",
                        variant: "ghost",
                        "variant-color": "gray",
                        "aria-label": "Open menu",
                        target: "_blank",
                        href: "https://discord.gg/sq2Kp6x",
                        icon: "menu"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3));
            } else {
              return [
                vue.createVNode(_component_CBox, {
                  as: "li",
                  mr: "2"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_CIconButton, {
                      as: "a",
                      variant: "ghost",
                      "variant-color": "gray",
                      "aria-label": "View the documentation",
                      target: "_blank",
                      href: "https://github.com/chakra-ui/chakra-ui-vue",
                      icon: "book"
                    })
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_CBox, {
                  as: "li",
                  mr: "2"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_CIconButton, {
                      as: "a",
                      variant: "ghost",
                      "variant-color": "gray",
                      "aria-label": "Join Discord channel",
                      target: "_blank",
                      href: "https://discord.gg/sq2Kp6x",
                      icon: "message-circle"
                    })
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_CBox, {
                  as: "li",
                  mr: "2"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_CIconButton, {
                      as: "a",
                      variant: "ghost",
                      "variant-color": "gray",
                      "aria-label": "Open menu",
                      target: "_blank",
                      href: "https://discord.gg/sq2Kp6x",
                      icon: "menu"
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2));
      } else {
        return [
          vue.createVNode(_component_CFlex, {
            "align-items": "center",
            flex: "1"
          }),
          vue.createVNode(_component_CFlex, {
            flex: "1",
            "justify-content": "center"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_CIcon, {
                name: "search",
                mt: "8px"
              })
            ]),
            _: 1
          }),
          vue.createVNode(_component_CBox, {
            as: "ul",
            d: "flex",
            flex: "1",
            "align-items": "center",
            "list-style-type": "none",
            pt: "8px",
            "justify-content": "flex-end"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_CBox, {
                as: "li",
                mr: "2"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_CIconButton, {
                    as: "a",
                    variant: "ghost",
                    "variant-color": "gray",
                    "aria-label": "View the documentation",
                    target: "_blank",
                    href: "https://github.com/chakra-ui/chakra-ui-vue",
                    icon: "book"
                  })
                ]),
                _: 1
              }),
              vue.createVNode(_component_CBox, {
                as: "li",
                mr: "2"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_CIconButton, {
                    as: "a",
                    variant: "ghost",
                    "variant-color": "gray",
                    "aria-label": "Join Discord channel",
                    target: "_blank",
                    href: "https://discord.gg/sq2Kp6x",
                    icon: "message-circle"
                  })
                ]),
                _: 1
              }),
              vue.createVNode(_component_CBox, {
                as: "li",
                mr: "2"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_CIconButton, {
                    as: "a",
                    variant: "ghost",
                    "variant-color": "gray",
                    "aria-label": "Open menu",
                    target: "_blank",
                    href: "https://discord.gg/sq2Kp6x",
                    icon: "menu"
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
_sfc_main$2.ssrRender = _sfc_ssrRender$1;
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props2, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/jonathanbakebwa/Github/chakra-ui-vue-next/website/src/components/Navbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props2, ctx) : void 0;
};
const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  style: {"vertical-align": "middle", transform: "translateY(-5%)"}
};
const _hoisted_2$2 = /* @__PURE__ */ vue.createVNode("path", {
  d: "M23 14v-2H9v2h5v2.734l-3.868 6.77l1.736.992L15.58 18h.84l3.712 6.496l1.736-.992L18 16.734V14h5z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$1 = /* @__PURE__ */ vue.createVNode("circle", {
  cx: "16",
  cy: "9",
  r: "2",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$1 = /* @__PURE__ */ vue.createVNode("path", {
  d: "M16 30a14 14 0 1 1 14-14a14.016 14.016 0 0 1-14 14zm0-26a12 12 0 1 0 12 12A12.014 12.014 0 0 0 16 4z",
  fill: "currentColor"
}, null, -1);
function render$2(_ctx, _cache) {
  return vue.openBlock(), vue.createBlock("svg", _hoisted_1$2, [
    _hoisted_2$2,
    _hoisted_3$1,
    _hoisted_4$1
  ]);
}
var IconAccessibilityAlt = {render: render$2};
const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  style: {"vertical-align": "middle", transform: "translateY(-5%)"}
};
const _hoisted_2$1 = /* @__PURE__ */ vue.createVNode("circle", {
  cx: "10",
  cy: "12",
  r: "2",
  fill: "currentColor"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ vue.createVNode("circle", {
  cx: "16",
  cy: "9",
  r: "2",
  fill: "currentColor"
}, null, -1);
const _hoisted_4 = /* @__PURE__ */ vue.createVNode("circle", {
  cx: "22",
  cy: "12",
  r: "2",
  fill: "currentColor"
}, null, -1);
const _hoisted_5 = /* @__PURE__ */ vue.createVNode("circle", {
  cx: "23",
  cy: "18",
  r: "2",
  fill: "currentColor"
}, null, -1);
const _hoisted_6 = /* @__PURE__ */ vue.createVNode("circle", {
  cx: "19",
  cy: "23",
  r: "2",
  fill: "currentColor"
}, null, -1);
const _hoisted_7 = /* @__PURE__ */ vue.createVNode("path", {
  d: "M16.54 2A14 14 0 0 0 2 16a4.82 4.82 0 0 0 6.09 4.65l1.12-.31a3 3 0 0 1 3.79 2.9V27a3 3 0 0 0 3 3a14 14 0 0 0 14-14.54A14.05 14.05 0 0 0 16.54 2zm8.11 22.31A11.93 11.93 0 0 1 16 28a1 1 0 0 1-1-1v-3.76a5 5 0 0 0-5-5a5.07 5.07 0 0 0-1.33.18l-1.12.31A2.82 2.82 0 0 1 4 16A12 12 0 0 1 16.47 4A12.18 12.18 0 0 1 28 15.53a11.89 11.89 0 0 1-3.35 8.79z",
  fill: "currentColor"
}, null, -1);
function render$1(_ctx, _cache) {
  return vue.openBlock(), vue.createBlock("svg", _hoisted_1$1, [
    _hoisted_2$1,
    _hoisted_3,
    _hoisted_4,
    _hoisted_5,
    _hoisted_6,
    _hoisted_7
  ]);
}
var ColorPalette = {render: render$1};
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  style: {"vertical-align": "middle", transform: "translateY(-5%)"}
};
const _hoisted_2 = /* @__PURE__ */ vue.createVNode("path", {
  d: "M28.504 8.136l-12-7a1 1 0 0 0-1.008 0l-12 7A1 1 0 0 0 3 9v14a1 1 0 0 0 .496.864l12 7a1 1 0 0 0 1.008 0l12-7A1 1 0 0 0 29 23V9a1 1 0 0 0-.496-.864zM16 3.158L26.016 9L16 14.842L5.984 9zM5 10.74l10 5.833V28.26L5 22.426zM17 28.26V16.574l10-5.833v11.685z",
  fill: "currentColor"
}, null, -1);
function render(_ctx, _cache) {
  return vue.openBlock(), vue.createBlock("svg", _hoisted_1, [
    _hoisted_2
  ]);
}
var Cube = {render};
var _sfc_main$1 = vue.defineComponent({
  name: "Index",
  components: {
    Hero: _sfc_main$3,
    Navbar: _sfc_main$2,
    CFlex,
    CBox,
    IconAccessibilityAlt,
    ColorPalette,
    Cube
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Navbar = vue.resolveComponent("Navbar");
  const _component_chakra_main = vue.resolveComponent("chakra.main");
  const _component_Hero = vue.resolveComponent("Hero");
  const _component_CFlex = vue.resolveComponent("CFlex");
  const _component_chakra_div = vue.resolveComponent("chakra.div");
  const _component_CBox = vue.resolveComponent("CBox");
  const _component_IconAccessibilityAlt = vue.resolveComponent("IconAccessibilityAlt");
  const _component_chakra_h4 = vue.resolveComponent("chakra.h4");
  const _component_ColorPalette = vue.resolveComponent("ColorPalette");
  const _component_Cube = vue.resolveComponent("Cube");
  _push(`<!--[-->`);
  _push(serverRenderer.ssrRenderComponent(_component_Navbar, null, null, _parent));
  _push(serverRenderer.ssrRenderComponent(_component_chakra_main, {
    h: ["auto", "auto", "100vh"],
    w: "100vw",
    px: [4, 10, 12],
    pt: "60px"
  }, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.ssrRenderComponent(_component_Hero, null, null, _parent2));
        _push2(serverRenderer.ssrRenderComponent(_component_CFlex, {
          as: "section",
          py: "10",
          "flex-dir": ["column", "column", "row"],
          "font-family": "body"
        }, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(serverRenderer.ssrRenderComponent(_component_chakra_div, {
                d: "grid",
                "grid-template-columns": ["auto", "auto", "repeat(3, 1fr)"],
                style: {gap: "1.5rem"}
              }, {
                default: vue.withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(serverRenderer.ssrRenderComponent(_component_CBox, {m: "3"}, {
                      default: vue.withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(serverRenderer.ssrRenderComponent(_component_CFlex, {
                            "align-items": "center",
                            mb: "5"
                          }, {
                            default: vue.withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(serverRenderer.ssrRenderComponent(_component_CFlex, {
                                  "justify-content": "center",
                                  color: "white",
                                  "align-items": "center",
                                  mr: "5",
                                  bg: "vue.400",
                                  w: "50px",
                                  h: "50px",
                                  rounded: "full"
                                }, {
                                  default: vue.withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(serverRenderer.ssrRenderComponent(_component_IconAccessibilityAlt, {class: "icon"}, null, _parent7));
                                    } else {
                                      return [
                                        vue.createVNode(_component_IconAccessibilityAlt, {class: "icon"})
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6));
                                _push6(serverRenderer.ssrRenderComponent(_component_chakra_h4, {size: "md"}, {
                                  default: vue.withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(` Accessible `);
                                    } else {
                                      return [
                                        vue.createTextVNode(" Accessible ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6));
                              } else {
                                return [
                                  vue.createVNode(_component_CFlex, {
                                    "justify-content": "center",
                                    color: "white",
                                    "align-items": "center",
                                    mr: "5",
                                    bg: "vue.400",
                                    w: "50px",
                                    h: "50px",
                                    rounded: "full"
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_IconAccessibilityAlt, {class: "icon"})
                                    ]),
                                    _: 1
                                  }),
                                  vue.createVNode(_component_chakra_h4, {size: "md"}, {
                                    default: vue.withCtx(() => [
                                      vue.createTextVNode(" Accessible ")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5));
                          _push5(` Chakra UI strictly follows WAI-ARIA standards. All components come with proper attributes and keyboard interactions out of the box. `);
                        } else {
                          return [
                            vue.createVNode(_component_CFlex, {
                              "align-items": "center",
                              mb: "5"
                            }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_component_CFlex, {
                                  "justify-content": "center",
                                  color: "white",
                                  "align-items": "center",
                                  mr: "5",
                                  bg: "vue.400",
                                  w: "50px",
                                  h: "50px",
                                  rounded: "full"
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(_component_IconAccessibilityAlt, {class: "icon"})
                                  ]),
                                  _: 1
                                }),
                                vue.createVNode(_component_chakra_h4, {size: "md"}, {
                                  default: vue.withCtx(() => [
                                    vue.createTextVNode(" Accessible ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            vue.createTextVNode(" Chakra UI strictly follows WAI-ARIA standards. All components come with proper attributes and keyboard interactions out of the box. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4));
                    _push4(serverRenderer.ssrRenderComponent(_component_CBox, {m: "3"}, {
                      default: vue.withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(serverRenderer.ssrRenderComponent(_component_CFlex, {
                            "align-items": "center",
                            mb: "5"
                          }, {
                            default: vue.withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(serverRenderer.ssrRenderComponent(_component_CFlex, {
                                  "justify-content": "center",
                                  color: "white",
                                  "align-items": "center",
                                  mr: "5",
                                  bg: "vue.400",
                                  w: "50px",
                                  h: "50px",
                                  rounded: "full"
                                }, {
                                  default: vue.withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(serverRenderer.ssrRenderComponent(_component_ColorPalette, {class: "icon"}, null, _parent7));
                                    } else {
                                      return [
                                        vue.createVNode(_component_ColorPalette, {class: "icon"})
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6));
                                _push6(serverRenderer.ssrRenderComponent(_component_chakra_h4, {size: "md"}, {
                                  default: vue.withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(` Themeable `);
                                    } else {
                                      return [
                                        vue.createTextVNode(" Themeable ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6));
                              } else {
                                return [
                                  vue.createVNode(_component_CFlex, {
                                    "justify-content": "center",
                                    color: "white",
                                    "align-items": "center",
                                    mr: "5",
                                    bg: "vue.400",
                                    w: "50px",
                                    h: "50px",
                                    rounded: "full"
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_ColorPalette, {class: "icon"})
                                    ]),
                                    _: 1
                                  }),
                                  vue.createVNode(_component_chakra_h4, {size: "md"}, {
                                    default: vue.withCtx(() => [
                                      vue.createTextVNode(" Themeable ")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5));
                          _push5(` Quickly and easily reference values from your theme throughout your entire application, on any component. `);
                        } else {
                          return [
                            vue.createVNode(_component_CFlex, {
                              "align-items": "center",
                              mb: "5"
                            }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_component_CFlex, {
                                  "justify-content": "center",
                                  color: "white",
                                  "align-items": "center",
                                  mr: "5",
                                  bg: "vue.400",
                                  w: "50px",
                                  h: "50px",
                                  rounded: "full"
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(_component_ColorPalette, {class: "icon"})
                                  ]),
                                  _: 1
                                }),
                                vue.createVNode(_component_chakra_h4, {size: "md"}, {
                                  default: vue.withCtx(() => [
                                    vue.createTextVNode(" Themeable ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            vue.createTextVNode(" Quickly and easily reference values from your theme throughout your entire application, on any component. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4));
                    _push4(serverRenderer.ssrRenderComponent(_component_CBox, {m: "3"}, {
                      default: vue.withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(serverRenderer.ssrRenderComponent(_component_CFlex, {
                            "align-items": "center",
                            mb: "5"
                          }, {
                            default: vue.withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(serverRenderer.ssrRenderComponent(_component_CFlex, {
                                  "justify-content": "center",
                                  color: "white",
                                  "align-items": "center",
                                  mr: "5",
                                  bg: "vue.400",
                                  w: "50px",
                                  h: "50px",
                                  rounded: "full"
                                }, {
                                  default: vue.withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(serverRenderer.ssrRenderComponent(_component_Cube, {class: "icon"}, null, _parent7));
                                    } else {
                                      return [
                                        vue.createVNode(_component_Cube, {class: "icon"})
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6));
                                _push6(serverRenderer.ssrRenderComponent(_component_chakra_h4, {size: "md"}, {
                                  default: vue.withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(` Composable `);
                                    } else {
                                      return [
                                        vue.createTextVNode(" Composable ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6));
                              } else {
                                return [
                                  vue.createVNode(_component_CFlex, {
                                    "justify-content": "center",
                                    color: "white",
                                    "align-items": "center",
                                    mr: "5",
                                    bg: "vue.400",
                                    w: "50px",
                                    h: "50px",
                                    rounded: "full"
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_Cube, {class: "icon"})
                                    ]),
                                    _: 1
                                  }),
                                  vue.createVNode(_component_chakra_h4, {size: "md"}, {
                                    default: vue.withCtx(() => [
                                      vue.createTextVNode(" Composable ")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5));
                          _push5(` Components were built with composition in mind. You can leverage any component to create new things. `);
                        } else {
                          return [
                            vue.createVNode(_component_CFlex, {
                              "align-items": "center",
                              mb: "5"
                            }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_component_CFlex, {
                                  "justify-content": "center",
                                  color: "white",
                                  "align-items": "center",
                                  mr: "5",
                                  bg: "vue.400",
                                  w: "50px",
                                  h: "50px",
                                  rounded: "full"
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(_component_Cube, {class: "icon"})
                                  ]),
                                  _: 1
                                }),
                                vue.createVNode(_component_chakra_h4, {size: "md"}, {
                                  default: vue.withCtx(() => [
                                    vue.createTextVNode(" Composable ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            vue.createTextVNode(" Components were built with composition in mind. You can leverage any component to create new things. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4));
                  } else {
                    return [
                      vue.createVNode(_component_CBox, {m: "3"}, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_CFlex, {
                            "align-items": "center",
                            mb: "5"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_CFlex, {
                                "justify-content": "center",
                                color: "white",
                                "align-items": "center",
                                mr: "5",
                                bg: "vue.400",
                                w: "50px",
                                h: "50px",
                                rounded: "full"
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(_component_IconAccessibilityAlt, {class: "icon"})
                                ]),
                                _: 1
                              }),
                              vue.createVNode(_component_chakra_h4, {size: "md"}, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(" Accessible ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          vue.createTextVNode(" Chakra UI strictly follows WAI-ARIA standards. All components come with proper attributes and keyboard interactions out of the box. ")
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_CBox, {m: "3"}, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_CFlex, {
                            "align-items": "center",
                            mb: "5"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_CFlex, {
                                "justify-content": "center",
                                color: "white",
                                "align-items": "center",
                                mr: "5",
                                bg: "vue.400",
                                w: "50px",
                                h: "50px",
                                rounded: "full"
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(_component_ColorPalette, {class: "icon"})
                                ]),
                                _: 1
                              }),
                              vue.createVNode(_component_chakra_h4, {size: "md"}, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(" Themeable ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          vue.createTextVNode(" Quickly and easily reference values from your theme throughout your entire application, on any component. ")
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_CBox, {m: "3"}, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_CFlex, {
                            "align-items": "center",
                            mb: "5"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_CFlex, {
                                "justify-content": "center",
                                color: "white",
                                "align-items": "center",
                                mr: "5",
                                bg: "vue.400",
                                w: "50px",
                                h: "50px",
                                rounded: "full"
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(_component_Cube, {class: "icon"})
                                ]),
                                _: 1
                              }),
                              vue.createVNode(_component_chakra_h4, {size: "md"}, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(" Composable ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          vue.createTextVNode(" Components were built with composition in mind. You can leverage any component to create new things. ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3));
            } else {
              return [
                vue.createVNode(_component_chakra_div, {
                  d: "grid",
                  "grid-template-columns": ["auto", "auto", "repeat(3, 1fr)"],
                  style: {gap: "1.5rem"}
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_CBox, {m: "3"}, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_CFlex, {
                          "align-items": "center",
                          mb: "5"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_CFlex, {
                              "justify-content": "center",
                              color: "white",
                              "align-items": "center",
                              mr: "5",
                              bg: "vue.400",
                              w: "50px",
                              h: "50px",
                              rounded: "full"
                            }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_component_IconAccessibilityAlt, {class: "icon"})
                              ]),
                              _: 1
                            }),
                            vue.createVNode(_component_chakra_h4, {size: "md"}, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode(" Accessible ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        vue.createTextVNode(" Chakra UI strictly follows WAI-ARIA standards. All components come with proper attributes and keyboard interactions out of the box. ")
                      ]),
                      _: 1
                    }),
                    vue.createVNode(_component_CBox, {m: "3"}, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_CFlex, {
                          "align-items": "center",
                          mb: "5"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_CFlex, {
                              "justify-content": "center",
                              color: "white",
                              "align-items": "center",
                              mr: "5",
                              bg: "vue.400",
                              w: "50px",
                              h: "50px",
                              rounded: "full"
                            }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_component_ColorPalette, {class: "icon"})
                              ]),
                              _: 1
                            }),
                            vue.createVNode(_component_chakra_h4, {size: "md"}, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode(" Themeable ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        vue.createTextVNode(" Quickly and easily reference values from your theme throughout your entire application, on any component. ")
                      ]),
                      _: 1
                    }),
                    vue.createVNode(_component_CBox, {m: "3"}, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_CFlex, {
                          "align-items": "center",
                          mb: "5"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_CFlex, {
                              "justify-content": "center",
                              color: "white",
                              "align-items": "center",
                              mr: "5",
                              bg: "vue.400",
                              w: "50px",
                              h: "50px",
                              rounded: "full"
                            }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_component_Cube, {class: "icon"})
                              ]),
                              _: 1
                            }),
                            vue.createVNode(_component_chakra_h4, {size: "md"}, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode(" Composable ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        vue.createTextVNode(" Components were built with composition in mind. You can leverage any component to create new things. ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["grid-template-columns", "style"])
              ];
            }
          }),
          _: 1
        }, _parent2));
      } else {
        return [
          vue.createVNode(_component_Hero),
          vue.createVNode(_component_CFlex, {
            as: "section",
            py: "10",
            "flex-dir": ["column", "column", "row"],
            "font-family": "body"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_chakra_div, {
                d: "grid",
                "grid-template-columns": ["auto", "auto", "repeat(3, 1fr)"],
                style: {gap: "1.5rem"}
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_CBox, {m: "3"}, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_CFlex, {
                        "align-items": "center",
                        mb: "5"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_CFlex, {
                            "justify-content": "center",
                            color: "white",
                            "align-items": "center",
                            mr: "5",
                            bg: "vue.400",
                            w: "50px",
                            h: "50px",
                            rounded: "full"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_IconAccessibilityAlt, {class: "icon"})
                            ]),
                            _: 1
                          }),
                          vue.createVNode(_component_chakra_h4, {size: "md"}, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(" Accessible ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      vue.createTextVNode(" Chakra UI strictly follows WAI-ARIA standards. All components come with proper attributes and keyboard interactions out of the box. ")
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_CBox, {m: "3"}, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_CFlex, {
                        "align-items": "center",
                        mb: "5"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_CFlex, {
                            "justify-content": "center",
                            color: "white",
                            "align-items": "center",
                            mr: "5",
                            bg: "vue.400",
                            w: "50px",
                            h: "50px",
                            rounded: "full"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_ColorPalette, {class: "icon"})
                            ]),
                            _: 1
                          }),
                          vue.createVNode(_component_chakra_h4, {size: "md"}, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(" Themeable ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      vue.createTextVNode(" Quickly and easily reference values from your theme throughout your entire application, on any component. ")
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_CBox, {m: "3"}, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_CFlex, {
                        "align-items": "center",
                        mb: "5"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_CFlex, {
                            "justify-content": "center",
                            color: "white",
                            "align-items": "center",
                            mr: "5",
                            bg: "vue.400",
                            w: "50px",
                            h: "50px",
                            rounded: "full"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_Cube, {class: "icon"})
                            ]),
                            _: 1
                          }),
                          vue.createVNode(_component_chakra_h4, {size: "md"}, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(" Composable ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      vue.createTextVNode(" Components were built with composition in mind. You can leverage any component to create new things. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["grid-template-columns", "style"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.ssrRenderComponent(_component_chakra_div, {
    h: "500px",
    w: "full"
  }, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Awesome stuff `);
      } else {
        return [
          vue.createTextVNode(" Awesome stuff ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
_sfc_main$1.ssrRender = _sfc_ssrRender;
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props2, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/jonathanbakebwa/Github/chakra-ui-vue-next/website/src/pages/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props2, ctx) : void 0;
};
const routes = [
  {
    name: "getting-started",
    path: "/getting-started",
    component: () => Promise.resolve().then(function() {
      return gettingStarted;
    }),
    props: true
  },
  {
    name: "index",
    path: "/",
    component: _sfc_main$1,
    props: true
  }
];
var main = "/* https://github.com/antfu/prism-theme-vars */\n:root {\n  --prism-scheme: light;\n\n  /* Colors */\n  --prism-foreground: #6e6e6e;\n  --prism-background: #f4f4f4;\n\n  /* Tokens */\n  --prism-comment: #a8a8a8;\n  --prism-string: #555555;\n  --prism-literal: #333333;\n  --prism-keyword: #000000;\n  --prism-function: #4f4f4f;\n  --prism-deleted: #333333;\n  --prism-class: #333333;\n  --prism-builtin: #757575;\n  --prism-property: #333333;\n  --prism-namespace: #4f4f4f;\n  --prism-punctuation: #ababab;\n  --prism-decorator: var(--prism-class);\n  --prism-operator: var(--prism-punctuation);\n  --prism-number: var(--prism-literal);\n  --prism-boolean: var(--prism-literal);\n  --prism-variable: var(--prism-literal);\n  --prism-constant: var(--prism-literal);\n  --prism-symbol: var(--prism-literal);\n  --prism-interpolation: var(--prism-literal);\n  --prism-selector: var(--prism-keyword);\n  --prism-keyword-control: var(--prism-keyword);\n  --prism-regex: var(--prism-string);\n  --prism-json-property: var(--prism-property);\n  --prism-inline-background: var(--prism-background);\n\n  /* Token Styles */\n  --prism-comment-style: italic;\n  --prism-url-decoration: underline;\n\n  /* Extension */\n  --prism-line-number: #a5a5a5;\n  --prism-line-number-gutter: #333333;\n  --prism-line-highlight-background: #eeeeee;\n  --prism-selection-background: #aaaaaa;\n  --prism-marker-color: var(--prism-foreground);\n  --prism-marker-opacity: 0.4;\n  --prism-marker-font-size: 0.8em;\n\n  /* Font */\n  --prism-font-size: 1em;\n  --prism-line-height: 1.5em;\n  --prism-font-family: monospace;\n  --prism-inline-font-size: var(--prism-font-size);\n  --prism-block-font-size: var(--prism-font-size);\n  \n  /* Sizing */\n  --prism-tab-size: 2;\n  \n  --prism-block-padding-x: 1em;\n  --prism-block-padding-y: 1em;\n  --prism-block-margin-x: 0;\n  --prism-block-margin-y: 0.5em;\n  --prism-block-radius: 0.3em;\n  --prism-inline-padding-x: 0.3em;\n  --prism-inline-padding-y: 0.1em;\n  --prism-inline-radius: 0.3em;\n}\ndiv[class*='language-'],\npre[class*='language-'],\ncode[class*='language-'] {\n  font-size: var(--prism-font-size);\n  font-family: var(--prism-font-family);\n  direction: ltr;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  line-height: var(--prism-line-height);\n  -moz-tab-size: var(--prism-tab-size);\n  -o-tab-size: var(--prism-tab-size);\n  tab-size: var(--prism-tab-size);\n  -webkit-hyphens: none;\n  -moz-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n  color: var(--prism-foreground) !important;\n}\n/* Code blocks */\ndiv[class*='language-'],\npre[class*='language-'] {\n  font-size: var(--prism-block-font-size);\n  padding: var(--prism-block-padding-y) var(--prism-block-padding-x);\n  margin: var(--prism-block-margin-y) var(--prism-block-margin-x);\n  border-radius: var(--prism-block-radius);\n  overflow: auto;\n  background: var(--prism-background);\n}\n/* Inline code */\n:not(pre) > code[class*='language-'] {\n  font-size: var(--prism-inline-font-size);\n  padding: var(--prism-inline-padding-y) var(--prism-inline-padding-x);\n  border-radius: var(--prism-inline-radius);\n  background: var(--prism-inline-background);\n}\n/* Selection */\npre[class*='language-']::selection,\npre[class*='language-'] ::selection,\ncode[class*='language-']::selection,\ncode[class*='language-'] ::selection,\npre[class*='language-']::-moz-selection,\npre[class*='language-'] ::-moz-selection,\ncode[class*='language-']::-moz-selection,\ncode[class*='language-'] ::-moz-selection {\n  background: var(--prism-selection-background);\n}\n/* Tokens */\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: var(--prism-comment);\n  font-style: var(--prism-comment-style);\n}\n.token.namespace {\n  color: var(--prism-namespace);\n}\n.token.interpolation {\n  color: var(--prism-interpolation);\n}\n.token.string {\n  color: var(--prism-string);\n}\n.token.punctuation {\n  color: var(--prism-punctuation);\n}\n.token.operator {\n  color: var(--prism-operator);\n}\n.token.keyword.module,\n.token.keyword.control-flow {\n  color: var(--prism-keyword-control);\n}\n.token.url,\n.token.symbol,\n.token.inserted {\n  color: var(--prism-symbol);\n}\n.token.constant {\n  color: var(--prism-constant);\n}\n.token.string.url {\n  text-decoration: var(--prism-url-decoration);\n}\n.token.boolean,\n.language-json .token.boolean {\n  color: var(--prism-boolean);\n}\n.token.number,\n.language-json .token.number {\n  color: var(--prism-number);\n}\n.token.variable {\n  color: var(--prism-variable);\n}\n.token.keyword {\n  color: var(--prism-keyword);\n}\n.token.atrule,\n.token.attr-value,\n.token.selector {\n  color: var(--prism-selector);\n}\n.token.function {\n  color: var(--prism-function);\n}\n.token.deleted {\n  color: var(--prism-deleted);\n}\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n.token.italic {\n  font-style: italic;\n}\n.token.class-name {\n  color: var(--prism-class);\n}\n.token.tag,\n.token.builtin {\n  color: var(--prism-builtin);\n}\n.token.attr-name,\n.token.property,\n.token.entity {\n  color: var(--prism-property);\n}\n.language-json .token.property {\n  color: var(--prism-json-property);\n}\n.token.regex {\n  color: var(--prism-regex);\n}\n.token.decorator,\n.token.annotation {\n  color: var(--prism-decorator);\n}\n/* overrides color-values for the Line Numbers plugin\n * http://prismjs.com/plugins/line-numbers/\n */\n.line-numbers .line-numbers-rows {\n  border-right-color: var(--prism-line-number);\n}\n.line-numbers-rows > span:before {\n  color: var(--prism-line-number-gutter);\n}\n/* overrides color-values for the Line Highlight plugin\n  * http://prismjs.com/plugins/line-highlight/\n  */\n.line-highlight {\n  background: var(--prism-line-highlight-background);\n}\n:root {\n  --prism-font-family: 'Input Mono', monospace;\n}\nhtml:not(.dark) {\n  --prism-foreground: #393a34;\n  --prism-background: #fbfbfb;\n  --prism-comment: #8e8f8e;\n  --prism-string: #a1644c;\n  --prism-literal: #3a9c9b;\n  --prism-keyword: #248358;\n  --prism-function: #7e8a42;\n  --prism-deleted: #a14f55;\n  --prism-class: #2b91af;\n  --prism-builtin: #a52727;\n  --prism-property: #ad502b;\n  --prism-namespace: #c96880;\n  --prism-punctuation: #8e8f8b;\n  --prism-decorator: #bd8f8f;\n  --prism-json-property: #698c96;\n}\nhtml.dark {\n  --prism-scheme: dark;\n  --prism-foreground: #d4cfbf;\n  --prism-background: #1e1e1e;\n  --prism-comment: #758575;\n  --prism-string: #ce9178;\n  --prism-literal: #4fb09d;\n  --prism-keyword: #4d9375;\n  --prism-function: #c2c275;\n  --prism-deleted: #a14f55;\n  --prism-class: #5ebaa8;\n  --prism-builtin: #cb7676;\n  --prism-property: #dd8e6e;\n  --prism-namespace: #c96880;\n  --prism-punctuation: #d4d4d4;\n  --prism-decorator: #bd8f8f;\n  --prism-regex: #ab5e3f;\n  --prism-json-property: #6b8b9e;\n  --prism-line-number: #888888;\n  --prism-line-number-gutter: #eeeeee;\n  --prism-line-highlight-background: #444444;\n  --prism-selection-background: #444444;\n}\nh1,\nh2,\nh3,\nh4 {\n  font-weight: bold;\n}\nh1 {\n  font-size: 2em;\n}\nh2 {\n  font-size: 1.5em;\n}\nh3 {\n  font-size: 1.17em;\n}\n";
const createApp = viteSsg.ViteSSG(_sfc_main$4, {routes}, ({app, isClient}) => {
  if (isClient) {
    const ssrIds = (window == null ? void 0 : window.$emotionSSRIds) || [];
    css.hydrate(ssrIds);
  }
  app.use(ChakraUIVuePlugin, {
    extendTheme: extendTheme({
      fonts: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif"
      },
      shadows: {
        search: "0 0 0 1px rgba(16,22,26,.1), 0 4px 8px rgba(16,22,26,.2), 0 18px 46px 6px rgba(16,22,26,.2)"
      },
      styles: {
        global: (props2) => ({
          body: {
            color: mode("gray.700", "whiteAlpha.900")(props2),
            ".deleted": {
              color: "#ff8383 !important",
              fontStyle: "normal !important"
            },
            ".inserted": {
              color: "#b5f4a5 !important",
              fontStyle: "normal !important"
            }
          }
        })
      },
      textStyles: {
        heading: {
          fontFamily: "heading",
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: "-0.015em",
          lineHeight: "1.24",
          fontSize: {base: "2rem", md: "3.5rem"}
        },
        "heading-2": {
          fontFamily: "heading",
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: "-0.015em",
          lineHeight: "1.24",
          fontSize: {base: "1.75rem", md: "2.75rem"}
        },
        caps: {
          textTransform: "uppercase",
          fontSize: "sm",
          letterSpacing: "widest",
          fontWeight: "bold"
        }
      },
      mdx: {
        h1: {
          mt: "2rem",
          mb: ".25rem",
          lineHeight: 1.2,
          fontWeight: "bold",
          fontSize: "1.875rem",
          letterSpacing: "-.025em"
        },
        h2: {
          mt: "4rem",
          mb: "0.5rem",
          lineHeight: 1.3,
          fontWeight: "semibold",
          fontSize: "1.5rem",
          letterSpacing: "-.025em",
          "& + h3": {
            mt: "1.5rem"
          }
        },
        h3: {
          mt: "3rem",
          lineHeight: 1.25,
          fontWeight: "semibold",
          fontSize: "1.25rem",
          letterSpacing: "-.025em"
        },
        h4: {
          mt: "3rem",
          lineHeight: 1.375,
          fontWeight: "semibold",
          fontSize: "1.125rem"
        },
        a: {
          color: "teal.500",
          fontWeight: "semibold",
          transition: "color 0.15s",
          transitionTimingFunction: "ease-out",
          _hover: {
            color: "teal.600"
          }
        },
        p: {
          mt: "1.25rem",
          lineHeight: 1.7,
          "blockquote &": {
            mt: 0
          }
        },
        hr: {
          my: "4rem"
        },
        blockquote: {
          bg: "orange.100",
          borderWidth: "1px",
          borderColor: "orange.200",
          rounded: "lg",
          px: "1.25rem",
          py: "1rem",
          my: "1.5rem"
        },
        ul: {
          mt: "1.5rem",
          ml: "1.25rem",
          "blockquote &": {mt: 0},
          "& > * + *": {
            mt: "0.25rem"
          }
        },
        code: {
          rounded: "sm",
          px: "1",
          fontSize: "0.875em",
          py: "2px",
          whiteSpace: "nowrap",
          lineHeight: "normal"
        }
      }
    }),
    icons: {
      library: {
        feGithub: featherIconsPaths.feGithub,
        feStar: featherIconsPaths.feStar,
        feBook: featherIconsPaths.feBook,
        feMenu: featherIconsPaths.feMenu,
        feMessageCircle: featherIconsPaths.feMessageCircle,
        feSearch: featherIconsPaths.feSearch,
        fePackage: featherIconsPaths.fePackage
      }
    }
  });
  domElements.forEach((tag) => {
    app.component(`chakra.${tag}`, chakra(tag));
  });
});
const _sfc_main = {
  expose: [],
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "markdown-body"}, _attrs))}><h1>Project setup with Vite</h1><h2>Scaffolding Vite Project</h2><p>If you want to use Vite you can start with using the Vite + Vue3 (+ TS) template. This can be done by using the Vite Scaffolding tool.</p><p>With NPM:</p><pre class="language-bash"><code class="language-bash"><span class="token function">npm</span> init @vitejs/app
</code></pre><p>With Yarn:</p><pre class="language-bash"><code class="language-bash"><span class="token function">yarn</span> create @vitejs/app
</code></pre><p>Take a look at the Vite documentation for more information here. <a href="https://vitejs.dev/guide/#scaffolding-your-first-vite-project">https://vitejs.dev/guide/#scaffolding-your-first-vite-project</a></p><h2>Adding Chakra UI Vue Next</h2><p>First you need to install the Chakra UI Vue Next package.</p><pre class="language-bash"><code class="language-bash"><span class="token function">yarn</span> <span class="token function">add</span> @chakra-ui-vue
</code></pre><h3>Locally for now</h3><p>For now I\u2019ve to use Yarn link.</p><p>In the Chakra UI Vue Next packages you run:</p><pre class="language-bash"><code class="language-bash"><span class="token function">yarn</span> build <span class="token operator">&amp;&amp;</span> <span class="token function">yarn</span> <span class="token function">link</span>
</code></pre><p>Then inside the Vite project you can link to the packages</p><pre class="language-bash"><code class="language-bash"><span class="token function">yarn</span> <span class="token function">link</span> <span class="token string">&quot;@chakra-ui/vue-next&quot;</span>
<span class="token function">yarn</span> <span class="token function">link</span> <span class="token string">&quot;@chakra-ui/vue-system&quot;</span>
<span class="token function">yarn</span> <span class="token function">link</span> <span class="token string">&quot;@chakra-ui/vue-theme&quot;</span>
<span class="token function">yarn</span> <span class="token function">link</span> <span class="token string">&quot;@chakra-ui/vue-utils&quot;</span>
<span class="token function">yarn</span> <span class="token function">link</span> <span class="token string">&quot;@chakra-ui/c-button&quot;</span>
</code></pre><h2>Usage</h2><p>Before you can use Chakra, you have to add it to the Vue.js instance. This will be done in your <code>main.ts</code> file.</p><pre class="language-tsx"><code class="language-tsx"><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>
<span class="token keyword">import</span> ChakraUIVuePlugin <span class="token keyword">from</span> <span class="token string">&#39;@chakra-ui/vue-next&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> domElements <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@chakra-ui/vue-system&#39;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ChakraUIVuePlugin<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</code></pre><p>If you wish to use the Chakra Factory (<a href="https://chakra-ui.com/docs/features/chakra-factory">https://chakra-ui.com/docs/features/chakra-factory</a>) to create base html elements with theme-aware style props using <code>chakra.&lt;element&gt;</code> notation. Make sure import the <code>chakra object</code> from <code>&#39;@chakra-ui/vue-next&#39;</code> and to add the following forEach function.</p><pre class="language-tsx"><code class="language-tsx"><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>
<span class="token keyword">import</span> ChakraUIVuePlugin<span class="token punctuation">,</span> <span class="token punctuation">{</span> chakra <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@chakra-ui/vue-next&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> domElements <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@chakra-ui/vue-system&#39;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ChakraUIVuePlugin<span class="token punctuation">)</span>

domElements<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">tag</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">chakra.</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>tag<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token function">chakra</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</code></pre><h2>Chakra in components</h2><p>When you can use a Chakra UI Vue component in your components, you will first have to import the Chakra component you want to use, for example, the CButton.</p><pre class="language-tsx"><code class="language-tsx"><span class="token keyword">import</span> <span class="token punctuation">{</span> CButton <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@chakra-ui/vue-next&quot;</span>
</code></pre><p>Next, you have to add it to the components option.</p><pre class="language-tsx"><code class="language-tsx"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&#39;YOUR COMPONENT NAME&#39;</span><span class="token punctuation">,</span>
  components<span class="token operator">:</span> <span class="token punctuation">{</span>
    CButton
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><p>Now you are able to use it in the template of your component.</p><pre class="language-tsx"><code class="language-tsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>c-button</span> <span class="token attr-name">variant-color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>green<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Button</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>c-button</span><span class="token punctuation">&gt;</span></span>
</code></pre><h3>C-Reset</h3><p>Sometimes you may need to apply css reset styles to your application. Chakra UI exports a <code>CReset</code> that\u2019ll remove browser default styles. It\u2019s heavily inspired by <code>Tailwind&#39;s preflight</code>.</p><pre class="language-tsx"><code class="language-tsx"><span class="token keyword">import</span> <span class="token punctuation">{</span> CReset <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@chakra-ui/vue-next&quot;</span>
</code></pre><p>And at the root level template add the following</p><pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>c-reset</span> <span class="token punctuation">/&gt;</span></span>
</code></pre><h2>Using an icon library</h2><p>Most times, you might need to use icons from a popular icon library like <code>feather-icons</code>. Here\u2019s how to go about it.</p><p>Make sure to install the <code>feather-icons-paths</code> package with</p><pre class="language-bash"><code class="language-bash"><span class="token function">yarn</span> <span class="token function">add</span> feather-icons-paths
</code></pre><p>Inside your <code>main.ts</code> file you can import the icons you wish to use and add those to the <code>ChakraUIVuePlugin</code> options.</p><pre class="language-tsx"><code class="language-tsx"><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ChakraUIVuePlugin<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  icons<span class="token operator">:</span> <span class="token punctuation">{</span>
    library<span class="token operator">:</span> <span class="token punctuation">{</span>
      feGithub
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><p>Since the <code>feather-icons-paths</code> package doesn\u2019t have provide any <code>types</code> you\u2019ve to declare it otherwise you might get some <code>Could not find a declaration file for module X</code> errors.</p><p>If you are using <code>Volar</code> inside the <code>shims-vue.d.ts</code> you can declare the module.</p><pre class="language-tsx"><code class="language-tsx"><span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">&#39;feather-icons-paths&#39;</span>
</code></pre><h3>Usage</h3><p>Icons can then be used in <code>Charka</code> components like <code>CIcon</code> and <code>CButton</code>. This happens by passing the <code>name</code> prop. This name must match an icon key in <code>theme.icons</code>.</p><pre class="language-tsx"><code class="language-tsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>c-icon</span> <span class="token attr-name">color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>red.400<span class="token punctuation">&quot;</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>activity<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props2, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/jonathanbakebwa/Github/chakra-ui-vue-next/website/src/pages/getting-started.md");
  return _sfc_setup ? _sfc_setup(props2, ctx) : void 0;
};
var gettingStarted = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _sfc_main
});
exports.createApp = createApp;
