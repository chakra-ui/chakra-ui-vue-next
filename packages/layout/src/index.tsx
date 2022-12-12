import { defineComponent, createVNode, mergeProps, isVNode, computed, Fragment } from 'vue';
import { mapResponsive, filterUndefined, isNull, isNumber } from '@chakra-ui/utils';
import { chakra, useStyleConfig, useMultiStyleConfig, StylesProvider, useStyles, tokenToCSSVar } from '@chakra-ui/vue-system';
import { vueThemingProps, SNAO, SAO, getValidChildren } from '@chakra-ui/vue-utils';
import { CIcon } from '@chakra-ui/c-icon';

function _isSlot$f(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

/**
 * Vue component used to cropping media (videos, images and maps)
 * to a desired aspect ratio.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/aspect-ratio
 */
var CAspectRatio = defineComponent({
  name: "CAspectRatio",
  props: {
    ratio: {
      type: [Number],
      "default": 4 / 3
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    return function () {
      return createVNode(chakra.div, mergeProps({
        "__label": "aspect-ratio",
        "position": "relative",
        "_before": {
          height: 0,
          content: "\"\"",
          display: "block",
          paddingBottom: mapResponsive(props.ratio, function (r) {
            return 1 / r * 100 + "%";
          })
        },
        "__css": {
          "& > *:not(style)": {
            overflow: "hidden",
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%"
          },
          "& > img, & > video": {
            objectFit: "cover"
          }
        }
      }, attrs), _isSlot$f(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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

function _isSlot$e(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

/**
 * Vue component used to display notifications, messages, or
 * statuses in different shapes and sizes.
 *
 * @see Docs https://vue.chakra-ui.com/docs/data-display/badge
 */
var CBadge = defineComponent({
  name: "CBadge",
  props: _extends({
    as: {
      type: [Object, String],
      "default": "div"
    }
  }, vueThemingProps),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    var themingProps = computed(function () {
      return filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig
      });
    });
    var styles = useStyleConfig("Badge", themingProps);
    return function () {
      return createVNode(chakra.div, mergeProps({
        "as": props.as,
        "__label": "badge",
        "__css": _extends({
          display: "inline-block",
          whiteSpace: "nowrap",
          verticalAlign: "middle"
        }, styles.value)
      }, attrs), _isSlot$e(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

function _isSlot$d(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

/**
 * Box is the most abstract component on top of which other chakra
 * components are built. It renders a `div` element by default.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/box
 */
var CBox = defineComponent({
  name: "CBox",
  props: {
    as: {
      type: [String, Object],
      "default": "div"
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    return function () {
      return createVNode(chakra.div, mergeProps({
        "as": props.as,
        "__label": "box"
      }, attrs), {
        "default": function _default() {
          return slots == null ? void 0 : slots["default"] == null ? void 0 : slots["default"]();
        }
      });
    };
  }
});
/**
 * As a constraint, you can't pass size related props
 * Only `size` would be allowed
 */

/**
 * CSquare is the `CBox` component implemented as a square
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/box
 */
var CSquare = defineComponent({
  name: "CSquare",
  props: {
    size: [Object, String, Number],
    centerContent: {
      type: [Boolean],
      "default": true
    }
  },
  setup: function setup(props, _ref2) {
    var slots = _ref2.slots,
        attrs = _ref2.attrs;
    var styles = computed(function () {
      return props.centerContent ? {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      } : {};
    });
    return function () {
      return createVNode(CBox, mergeProps({
        "__label": "square",
        "boxSize": props.size,
        "__css": _extends({}, styles.value, {
          flexShrink: 0,
          flexGrow: 0
        })
      }, attrs), _isSlot$d(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});
/**
 * CCircle is the `CBox` component implemented as a circle
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/box
 */

var CCircle = defineComponent({
  name: "CCircle",
  setup: function setup(_, _ref3) {
    var slots = _ref3.slots,
        attrs = _ref3.attrs;
    return function () {
      return createVNode(CSquare, mergeProps({
        "__label": "circle",
        "borderRadius": "9999px"
      }, attrs), _isSlot$d(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

function _isSlot$c(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

/**
 * Vue component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/center
 */
var CCenter = defineComponent({
  name: "CCenter",
  props: {
    as: {
      type: [String, Object],
      "default": "div"
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    return function () {
      return createVNode(chakra.div, mergeProps({
        "__label": "center",
        "__css": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, props, attrs), _isSlot$c(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

function _isSlot$b(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

/**
 * Layout component used to wrap app or website content
 *
 * It sets `margin-left` and `margin-right` to `auto`,
 * to keep its content centered.
 *
 * It also sets a default max-width of `60ch` (60 characters).
 */
var CContainer = defineComponent({
  name: "CContainer",
  props: _extends({
    as: {
      type: [Object, String],
      "default": "div"
    },
    centerContent: {
      type: [Boolean]
    }
  }, vueThemingProps),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    var themingProps = computed(function () {
      return filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig
      });
    });
    var styles = useStyleConfig("Container", themingProps);
    return function () {
      return createVNode(chakra.div, mergeProps({
        "__label": "container",
        "__css": _extends({}, styles.value, props.centerContent && {
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        })
      }, attrs), _isSlot$b(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["borderLeftWidth", "borderBottomWidth", "borderTopWidth", "borderRightWidth", "borderWidth", "borderStyle", "borderColor"];

/**
 * Layout component used to visually separate content in a list or group.
 * It display a thin horizontal or vertical line, and renders a `hr` tag.
 *
 * @see Docs https://vue.chakra-ui.com/docs/data-display/divider
 */
var CDivider = defineComponent({
  name: "CDivider",
  props: _extends({
    orientation: {
      type: [String],
      "default": "horizontal"
    }
  }, vueThemingProps),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
        _ref.attrs;
    var themingProps = computed(function () {
      return filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
        orientation: props.orientation
      });
    });
    var styles = useStyleConfig("Divider", themingProps);

    var _styles$value = styles.value,
        borderLeftWidth = _styles$value.borderLeftWidth,
        borderBottomWidth = _styles$value.borderBottomWidth,
        borderTopWidth = _styles$value.borderTopWidth,
        borderRightWidth = _styles$value.borderRightWidth,
        borderWidth = _styles$value.borderWidth,
        borderStyle = _styles$value.borderStyle,
        borderColor = _styles$value.borderColor,
        stylesRest = _objectWithoutPropertiesLoose(_styles$value, _excluded);

    var dividerStyle = computed(function () {
      var dividerStyles = {
        vertical: {
          borderLeftWidth: borderLeftWidth || borderRightWidth || borderWidth || "1px",
          height: "100%"
        },
        horizontal: {
          borderBottomWidth: borderBottomWidth || borderTopWidth || borderWidth || "1px",
          width: "100%"
        }
      };
      return dividerStyles[props.orientation];
    });
    return function () {
      return createVNode(chakra.hr, {
        "aria-orientation": props.orientation,
        "__css": _extends({}, stylesRest, {
          border: 0,
          borderColor: borderColor,
          borderStyle: borderStyle
        }, dividerStyle.value),
        "__label": "divider"
      }, {
        "default": function _default() {
          return [slots["default"] == null ? void 0 : slots["default"]()];
        }
      });
    };
  }
});

function _isSlot$a(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

/**
 * Vue component used to create grid layouts.
 *
 * It renders a `div` with `display: grid` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/grid
 */
var CGrid = defineComponent({
  name: "CGrid",
  props: {
    as: {
      type: [String, Object],
      "default": "div"
    },
    templateColumns: SNAO,
    gap: SNAO,
    rowGap: SNAO,
    columnGap: SNAO,
    autoFlow: SNAO,
    autoRows: SNAO,
    autoColumns: SNAO,
    templateRows: SNAO,
    templateAreas: SNAO,
    area: SNAO,
    column: SNAO,
    row: SNAO
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    var styles = computed(function () {
      return filterUndefined({
        display: "grid",
        gridArea: props.area,
        gridTemplateAreas: props.templateAreas,
        gridGap: props.gap,
        gridRowGap: props.rowGap,
        gridColumnGap: props.columnGap,
        gridAutoColumns: props.autoColumns,
        gridColumn: props.column,
        gridRow: props.row,
        gridAutoFlow: props.autoFlow,
        gridAutoRows: props.autoRows,
        gridTemplateRows: props.templateRows,
        gridTemplateColumns: props.templateColumns
      });
    });
    return function () {
      return createVNode(chakra.div, mergeProps({
        "as": props.as,
        "__label": "grid",
        "__css": styles.value
      }, attrs), _isSlot$a(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

function spanFn(span) {
  return mapResponsive(span, function (value) {
    return value === "auto" ? "auto" : "span " + value + "/span " + value;
  });
}

var CGridItem = defineComponent({
  name: "CGridItem",
  props: {
    as: {
      type: [String, Object],
      "default": "div"
    },
    colSpan: SNAO,
    colStart: SNAO,
    colEnd: SNAO,
    rowStart: SNAO,
    rowEnd: SNAO,
    rowSpan: SNAO
  },
  setup: function setup(props, _ref2) {
    var slots = _ref2.slots,
        attrs = _ref2.attrs;
    var styles = computed(function () {
      return filterUndefined({
        gridColumn: spanFn(props.colSpan),
        gridRow: spanFn(props.rowSpan),
        gridColumnStart: props.colStart,
        gridColumnEnd: props.colEnd,
        gridRowStart: props.rowStart,
        gridRowEnd: props.rowEnd
      });
    });
    return function () {
      return createVNode(chakra.div, mergeProps({
        "as": props.as,
        "__label": "grid__item",
        "__css": styles.value
      }, attrs), _isSlot$a(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

function _isSlot$9(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

var CHeading = defineComponent({
  name: "CHeading",
  props: _extends({
    as: {
      type: [String, Object],
      "default": "h2"
    }
  }, vueThemingProps),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    var themingProps = computed(function () {
      return filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig
      });
    });
    var styles = useStyleConfig("Heading", themingProps);
    return function () {
      return createVNode(chakra.h2, mergeProps({
        "as": props.as,
        "__label": "heading",
        "__css": styles.value
      }, attrs), _isSlot$9(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

function _isSlot$8(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

/**
 * Links are accessible elements used primarily for navigation.
 *
 * It integrates well with other routing libraries like
 * Vue Router and Nuxt.js Link.
 *
 * @example
 *
 * ```vue
 * <CLink as="router-link" to="/home">Home</CLink>
 * ```
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/link
 */
var CLink = defineComponent({
  name: "CLink",
  props: _extends({
    as: {
      type: [Object, String],
      "default": "a"
    },
    isExternal: Boolean
  }, vueThemingProps),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    var themingProps = computed(function () {
      return filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig
      });
    });
    var styles = useStyleConfig("Link", themingProps);
    return function () {
      return createVNode(chakra.a, mergeProps({
        "as": props.as,
        "__label": "link",
        "target": props.isExternal ? "_blank" : undefined,
        "rel": props.isExternal ? "noopener noreferrer" : undefined,
        "__css": styles.value
      }, attrs), _isSlot$8(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

function _isSlot$7(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

var CLinkOverlay = defineComponent({
  name: "CLinkOverlay",
  props: {
    as: {
      type: [Object, String],
      "default": "a"
    },
    isExternal: Boolean
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    return function () {
      return createVNode(chakra.div, mergeProps({
        "as": props.as,
        "__label": "linkbox__overlay",
        "rel": props.isExternal ? "noopener noreferrer" : undefined,
        "target": props.isExternal ? "_blank" : undefined,
        "__css": {
          position: "static",
          "&::before": {
            content: "''",
            cursor: "inherit",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
            width: "100%",
            height: "100%"
          }
        }
      }, attrs), _isSlot$7(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

/**
 * `LinkBox` is used to wrap content areas within a link while ensuring semantic html
 *
 * @see Docs https://vue.chakra-ui.com/docs/link-overlay
 * @see Resources https://www.sarasoueidan.com/blog/nested-links
 */
var CLinkBox = defineComponent({
  name: "CLinkBox",
  props: {
    as: {
      type: [Object, String],
      "default": "div"
    }
  },
  setup: function setup(props, _ref2) {
    var slots = _ref2.slots,
        attrs = _ref2.attrs;
    return function () {
      return createVNode(chakra.div, mergeProps({
        "as": props.as,
        "__label": "linkbox",
        "position": "relative",
        "__css": {
          /* Elevates links and abbreviations */
          "a[href]:not(.chakra-linkbox__overlay), abbr[title]": {
            position: "relative",
            zIndex: 1
          }
        }
      }, attrs), _isSlot$7(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

function _isSlot$6(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

/**
 * List is used to display list items, it renders a `<ul>` by default.
 *
 * @see Docs https://vue.chakra-ui.com/docs/data-display/list
 */
var CList = defineComponent({
  name: "CList",
  props: {
    as: {
      type: [Object, String],
      "default": "ul"
    },
    styleType: {
      type: SAO,
      "default": "none"
    },
    stylePosition: SAO,
    spacing: SNAO
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    var styles = useMultiStyleConfig("List", props);
    StylesProvider(styles);
    var selector = "& > *:not(style) ~ *:not(style)";
    var spacingStyle = computed(function () {
      var _ref2;

      return props.spacing ? (_ref2 = {}, _ref2[selector] = {
        mt: props.spacing
      }, _ref2) : {};
    });
    return function () {
      var validChildren = function validChildren() {
        return getValidChildren(slots);
      };

      return createVNode(chakra.ul, mergeProps({
        "__label": "list",
        "as": props.as,
        "listStyleType": props.styleType,
        "listStylePosition": props.stylePosition,
        "role": "list",
        "__css": _extends({}, styles.value.container, spacingStyle.value)
      }, attrs), _isSlot$6(validChildren) ? validChildren : {
        "default": function _default() {
          return [validChildren];
        }
      });
    };
  }
});
var COrderedList = defineComponent({
  name: "COrderedList",
  setup: function setup(props, _ref3) {
    var slots = _ref3.slots,
        attrs = _ref3.attrs;
    return function () {
      return (// @ts-ignore
        createVNode(CList, mergeProps({
          "styleType": "decimal",
          "marginStart": "1em"
        }, attrs), _isSlot$6(slots) ? slots : {
          "default": function _default() {
            return [slots];
          }
        })
      );
    };
  }
});
var CUnorderedList = defineComponent({
  name: "CUnorderedList",
  setup: function setup(props, _ref4) {
    var slots = _ref4.slots,
        attrs = _ref4.attrs;
    return function () {
      return (// @ts-ignore
        createVNode(CList, mergeProps({
          "styleType": "initial",
          "marginStart": "1em"
        }, attrs), _isSlot$6(slots) ? slots : {
          "default": function _default() {
            return [slots];
          }
        })
      );
    };
  }
});
var CListItem = defineComponent({
  name: "CListItem",
  setup: function setup(_, _ref5) {
    var slots = _ref5.slots,
        attrs = _ref5.attrs;
    var styles = useStyles();
    return function () {
      return createVNode(chakra.li, mergeProps({
        "__label": "list__item",
        "__css": styles.value.item
      }, attrs), _isSlot$6(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});
var CListIcon = defineComponent({
  name: "CListIcon",
  setup: function setup(_, _ref6) {
    var slots = _ref6.slots,
        attrs = _ref6.attrs;
    var styles = useStyles();
    return function () {
      return (// @ts-expect-error
        createVNode(CIcon, mergeProps({
          "role": "presentation"
        }, attrs, {
          "__css": styles.value.icon
        }), _isSlot$6(slots) ? slots : {
          "default": function _default() {
            return [slots];
          }
        })
      );
    };
  }
});

function _isSlot$5(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

/**
 * Semantic component to render a keyboard shortcut
 * within an application.
 *
 * @example
 *
 * ```jsx
 * <CKbd>⌘ + T</CKbd>
 * ```
 *
 * @see Docs https://vue.chakra-ui.com/docs/data-display/kbd
 */
var CKbd = defineComponent({
  name: "CKbd",
  props: _extends({
    as: {
      type: [String, Object],
      "default": "h2"
    }
  }, vueThemingProps),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    var themingProps = computed(function () {
      return filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig
      });
    });
    var styles = useStyleConfig("Kbd", themingProps);
    return function () {
      return createVNode(chakra.kbd, mergeProps({
        "__label": "kbd",
        "__css": _extends({
          fontFamily: "mono"
        }, styles.value)
      }, attrs), _isSlot$5(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

function _isSlot$4(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

/**
 * SimpleGrid
 *
 * Vue component make that providers a simpler interface, and
 * make its easy to create responsive grid layouts.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/simple-grid
 */
var CSimpleGrid = defineComponent({
  name: "CSimpleGrid",
  props: {
    as: {
      type: [Object, String],
      "default": "ul"
    },
    minChildWidth: SNAO,
    columns: SNAO,
    spacing: SNAO,
    spacingX: SNAO,
    spacingY: SNAO
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    var templateColumns = computed(function () {
      return props.minChildWidth ? widthToColumns(props.minChildWidth) : countToColumns(props.columns);
    });
    return function () {
      return createVNode(CGrid, mergeProps({
        "as": props.as,
        "__label": "simple-grid",
        "gap": props.spacing,
        "columnGap": props.spacingX,
        "rowGap": props.spacingY,
        "templateColumns": templateColumns.value
      }, attrs), _isSlot$4(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

function toPx(n) {
  return isNumber(n) ? n + "px" : n;
}

function widthToColumns(width) {
  return mapResponsive(width, function (value) {
    return isNull(value) ? null : "repeat(auto-fit, minmax(" + toPx(value) + ", 1fr))";
  });
}

function countToColumns(count) {
  return mapResponsive(count, function (value) {
    return isNull(value) ? null : "repeat(" + value + ", minmax(0, 1fr))";
  });
}

function _isSlot$3(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

/**
 * A flexible flex spacer that expands along the major axis of its containing flex layout.
 * It renders a `div` by default, and takes up any available space.
 *
 * @see Docs https://chakra-ui.com/docs/layout/flex#using-the-spacer
 */
var CSpacer = defineComponent({
  name: "CSpacer",
  setup: function setup(_, _ref) {
    var slots = _ref.slots;
    return function () {
      return createVNode(chakra.div, {
        "__label": "spacer",
        "baseStyle": {
          flex: 1,
          justifySelf: "stretch",
          alignSelf: "stretch"
        }
      }, _isSlot$3(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

/**
 * If we ever run into SSR issues with this, check this post to find a fix for it:
 * @see https://medium.com/@emmenko/patching-lobotomized-owl-selector-for-emotion-ssr-5a582a3c424c
 */
var selector = "& > *:not(style) ~ *:not(style)";
function getStackStyles(options) {
  var _ref;

  var spacing = options.spacing,
      direction = options.direction;
  var directionStyles = {
    column: {
      marginTop: spacing,
      marginEnd: 0,
      marginBottom: 0,
      marginStart: 0
    },
    row: {
      marginTop: 0,
      marginEnd: 0,
      marginBottom: 0,
      marginStart: spacing
    },
    "column-reverse": {
      marginTop: 0,
      marginEnd: 0,
      marginBottom: spacing,
      marginStart: 0
    },
    "row-reverse": {
      marginTop: 0,
      marginEnd: spacing,
      marginBottom: 0,
      marginStart: 0
    }
  };
  return _ref = {
    flexDirection: direction
  }, _ref[selector] = mapResponsive(direction, function (value) {
    return directionStyles[value];
  }), _ref;
}
function getDividerStyles(options) {
  var spacing = options.spacing,
      direction = options.direction;
  var dividerStyles = {
    column: {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    "column-reverse": {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    row: {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    },
    "row-reverse": {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    }
  };
  return {
    "&": mapResponsive(direction, function (value) {
      return dividerStyles[value];
    })
  };
}

function _isSlot$2(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

var CStackDivider = defineComponent({
  name: "CStackDivider",
  inheritAttrs: false,
  setup: function setup(_, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots;
    return function () {
      return createVNode(chakra.div, mergeProps({
        "__label": "stack__divider",
        "borderWidth": 0,
        "alignSelf": "stretch",
        "borderColor": "inherit",
        "width": "auto",
        "height": "auto"
      }, attrs), {
        "default": function _default() {
          return [slots == null ? void 0 : slots["default"] == null ? void 0 : slots["default"]()];
        }
      });
    };
  }
});
var CStackItem = defineComponent({
  name: "CStackItem",
  setup: function setup(_, _ref2) {
    var attrs = _ref2.attrs,
        slots = _ref2.slots;
    return function () {
      return createVNode(chakra.div, mergeProps({
        "__label": "stack__item",
        "display": "inline-block",
        "flex": "0 0 auto",
        "minWidth": "0"
      }, attrs), {
        "default": function _default() {
          return [slots == null ? void 0 : slots["default"] == null ? void 0 : slots["default"]()];
        }
      });
    };
  }
});
var stackProps = {
  as: {
    type: [Object, String],
    "default": "div"
  },
  align: SAO,
  justify: SAO,
  wrap: SAO,
  spacing: {
    type: SNAO,
    "default": "0.5rem"
  },
  direction: SAO,
  // todo: divider
  divider: [Object, Boolean],
  shouldWrapChildren: [Boolean],
  isInline: [Boolean]
};
/**
 * Stacks help you easily create flexible and automatically distributed layouts
 *
 * You can stack elements in the horizontal or vertical direction,
 * and apply a space or/and divider between each element.
 *
 * It uses `display: flex` internally and renders a `div`.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/stack
 *
 */

var CStack = defineComponent({
  name: "CStack",
  props: stackProps,
  setup: function setup(props, _ref3) {
    var slots = _ref3.slots,
        attrs = _ref3.attrs;
    var direction = computed(function () {
      var _props$direction;

      return props.isInline ? "row" : (_props$direction = props.direction) != null ? _props$direction : "column";
    });
    var styles = computed(function () {
      return getStackStyles({
        direction: direction.value,
        spacing: props.spacing
      });
    });
    var dividerStyle = computed(function () {
      return getDividerStyles({
        spacing: props.spacing,
        direction: direction.value
      });
    });
    var hasDivider = computed(function () {
      return !!props.divider;
    });
    var shouldUseChildren = computed(function () {
      return !props.shouldWrapChildren && !hasDivider.value;
    });
    return function () {
      var _ref4;

      var validChildren = getValidChildren(slots);
      var clones = shouldUseChildren.value ? validChildren : validChildren.map(function (child, index) {
        var isLast = index + 1 === validChildren.length;
        var wrappedChild = createVNode(CStackItem, {
          key: index
        }, child);

        var _child = props.shouldWrapChildren ? wrappedChild : child;

        if (!hasDivider.value) return _child; // todo: temporary divider

        var clonedDivider = createVNode(CStackDivider, {
          borderColor: "blue.200",
          __css: dividerStyle.value
        });

        var _divider = isLast ? null : clonedDivider;

        return createVNode(Fragment, {
          key: index
        }, [_child, _divider]);
      });
      return createVNode(chakra.div, {
        "__label": attrs.label ? attrs.label : "stack",
        "display": "flex",
        "alignItems": props.align,
        "justifyContent": props.justify,
        "flexDirection": styles.value.flexDirection,
        "flexWrap": props.wrap,
        "__css": hasDivider.value ? {} : (_ref4 = {}, _ref4[selector] = styles.value[selector], _ref4)
      }, {
        "default": function _default() {
          return clones;
        }
      });
    };
  }
});
/**
 * A view that arranges its children in a horizontal line.
 */

var CHStack = defineComponent({
  name: "CHStack",
  props: stackProps,
  setup: function setup(props, _ref5) {
    var attrs = _ref5.attrs,
        slots = _ref5.slots;
    return function () {
      return (// @ts-expect-error Stack typed API
        createVNode(CStack, mergeProps({
          "__label": "stack-horizontal"
        }, props, attrs, {
          "direction": "row"
        }), _isSlot$2(slots) ? slots : {
          "default": function _default() {
            return [slots];
          }
        })
      );
    };
  }
});
/**
 * A view that arranges its children in a vertical line.
 */

var CVStack = defineComponent({
  name: "CVStack",
  props: stackProps,
  setup: function setup(props, _ref6) {
    var attrs = _ref6.attrs,
        slots = _ref6.slots;
    return function () {
      return (// @ts-expect-error Stack typed API
        createVNode(CStack, mergeProps({
          "__label": "stack-vertical"
        }, props, attrs, {
          "direction": "column"
        }), _isSlot$2(slots) ? slots : {
          "default": function _default() {
            return [slots];
          }
        })
      );
    };
  }
});

function _isSlot$1(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://vue.chakra-ui.com/docs/typography/text
 */
var CText = defineComponent({
  name: "CText",
  props: _extends({
    as: {
      type: [Object, String],
      "default": "p"
    },
    align: SNAO,
    decoration: SNAO,
    casing: SNAO
  }, vueThemingProps),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    var themingProps = computed(function () {
      return filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig
      });
    });
    var styles = useStyleConfig("Text", themingProps);
    var aliasedProps = computed(function () {
      return filterUndefined({
        textAlign: props.align,
        textDecoration: props.decoration,
        textTransform: props.casing
      });
    });
    return function () {
      return createVNode(chakra.p, mergeProps({
        "__label": "text"
      }, aliasedProps.value, {
        "__css": styles.value
      }, attrs), _isSlot$1(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

var CWrapProps = {
  spacing: SNAO,
  justify: SNAO,
  align: SNAO,
  direction: SNAO,
  shouldWrapChildren: SNAO
};
/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://vue.chakra-ui.com/docs/typography/text
 */

var CWrap = defineComponent({
  props: _extends({
    as: {
      type: [Object, String],
      "default": "div"
    }
  }, CWrapProps),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    var styles = computed(function () {
      return {
        "--chakra-wrap-spacing": function chakraWrapSpacing(theme) {
          return mapResponsive(props.spacing, function (value) {
            return tokenToCSSVar("space", value)(theme);
          });
        },
        "--wrap-spacing": "calc(var(--chakra-wrap-spacing) / 2)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: props.justify,
        alignItems: props.align,
        flexDirection: props.direction,
        listStyleType: "none",
        padding: "0",
        margin: "calc(var(--wrap-spacing) * -1)",
        "& > *:not(style)": {
          margin: "var(--wrap-spacing)"
        }
      };
    });
    var childrenToRender = props.shouldWrapChildren ? getValidChildren(slots).map(function (child, index) {
      return createVNode(CWrapItem, {
        "key": index
      }, _isSlot(child) ? child : {
        "default": function _default() {
          return [child];
        }
      });
    }) : slots;
    return function () {
      return createVNode(chakra.div, mergeProps({
        "as": props.as,
        "__label": "wrap"
      }, attrs), {
        "default": function _default() {
          return createVNode(chakra.ul, {
            "__label": "wrap__list",
            "__css": styles.value
          }, _isSlot(childrenToRender) ? childrenToRender : {
            "default": function _default() {
              return [childrenToRender];
            }
          });
        }
      });
    };
  }
});
var CWrapItem = defineComponent({
  setup: function setup(_, _ref2) {
    var attrs = _ref2.attrs,
        slots = _ref2.slots;
    return function () {
      return createVNode(chakra.li, mergeProps({
        "__label": "wrap__listItem",
        "__css": {
          display: "flex",
          alignItems: "flex-start"
        }
      }, attrs), {
        "default": function _default() {
          return getValidChildren(slots);
        }
      });
    };
  }
});

export { CAspectRatio, CBadge, CBox, CCenter, CCircle, CContainer, CDivider, CGrid, CGridItem, CHStack, CHeading, CKbd, CLink, CLinkBox, CLinkOverlay, CList, CListIcon, CListItem, COrderedList, CSimpleGrid, CSpacer, CSquare, CStack, CStackDivider, CStackItem, CText, CUnorderedList, CVStack, CWrap, CWrapItem, CWrapProps };
