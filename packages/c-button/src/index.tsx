import { defineComponent, computed, createVNode, mergeProps, Fragment, createTextVNode, isVNode } from 'vue';
import { chakra, useStyleConfig } from '@chakra-ui/vue-system';
import { mergeWith, filterUndefined, dataAttr } from '@chakra-ui/utils';
import { vueThemingProps, createContext, getValidChildren, SNAO } from '@chakra-ui/vue-utils';
import { CIcon } from '@chakra-ui/c-icon';
import { CSpinner } from '@chakra-ui/c-spinner';

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

var props = _extends({
  isAttached: Boolean,
  isDisabled: Boolean,
  spacing: {
    type: [String, Number, Array],
    "default": 3
  }
}, vueThemingProps);

var _createContext = createContext({
  strict: false,
  name: "ButtonGroupContext"
}),
    ButtonGroupProvider = _createContext[0],
    useButtonGroup = _createContext[1];

var CButtonGroup = defineComponent({
  name: "CButtonGroup",
  props: props,
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots;
    ButtonGroupProvider( // @ts-ignore
    computed(function () {
      return {
        size: props.size,
        colorScheme: props.colorScheme,
        variant: props.variant,
        isDisabled: props.isDisabled
      };
    }));
    var styles = computed(function () {
      var groupStyles = {
        display: "inline-flex"
      };

      if (props.isAttached) {
        groupStyles = _extends({}, groupStyles, {
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
        groupStyles = _extends({}, groupStyles, {
          "& > *:not(style) ~ *:not(style)": {
            marginLeft: props.spacing
          }
        });
      }

      return groupStyles;
    });
    return function () {
      return createVNode(chakra.div, mergeProps({
        "role": "group",
        "__label": "button__group",
        "__css": styles.value
      }, attrs), {
        "default": function _default() {
          return getValidChildren(slots);
        }
      });
    };
  }
});

var defaultButtonProps = {
  as: "button",
  iconSpacing: "0.5rem"
};

var CButtonSpinner = defineComponent({
  name: "CButtonSpinner",
  props: {
    label: Boolean,
    spacing: [Number, String, Array],
    placement: String
  },
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    var marginProp = computed(function () {
      return props.placement === "start" ? "marginEnd" : "marginStart";
    });
    var spinnerStyles = computed(function () {
      var _ref2;

      return _ref2 = {
        display: "flex",
        alignItems: "center",
        position: props.label ? "relative" : "absolute"
      }, _ref2[marginProp.value] = props.label ? props.spacing || "0.5rem" : "0", _ref2;
    });
    return function () {
      return (// @ts-ignore
        createVNode(chakra.div, mergeProps({
          "__label": "button__spinner"
        }, spinnerStyles.value, attrs), {
          "default": function _default() {
            return [createVNode(CSpinner, {
              "width": "1em",
              "height": "1em"
            }, null)];
          }
        })
      );
    };
  }
});
var CButtonContent = defineComponent({
  name: "CButtonContent",
  props: {
    leftIcon: String,
    rightIcon: String,
    iconSpacing: String
  },
  setup: function setup(props, _ref3) {
    var slots = _ref3.slots;
    return function () {
      return createVNode(Fragment, null, [props.leftIcon && createVNode(CButtonIcon, {
        "icon": props.leftIcon,
        "marginEnd": props.iconSpacing
      }, null), slots == null ? void 0 : slots["default"] == null ? void 0 : slots["default"](), props.rightIcon && createVNode(CButtonIcon, {
        "icon": props.rightIcon,
        "marginStart": props.iconSpacing
      }, null)]);
    };
  }
});
/**
 * CButtonIcon
 *
 * Button icon component
 */

var CButtonIcon = defineComponent({
  name: "CButtonIcon",
  props: {
    icon: String
  },
  setup: function setup(props, _ref4) {
    var attrs = _ref4.attrs;
    return function () {
      return createVNode(CIcon, mergeProps({
        "__label": "button__icon",
        "name": props.icon
      }, attrs), null);
    };
  }
});

/**
 * CButton
 *
 * The Button component is used to trigger an action or event,
 * such as submitting a form, opening a dialog, canceling
 * an action, or performing a delete operation.
 */
var CButton = defineComponent({
  name: "CButton",
  props: _extends({
    isLoading: {
      type: Boolean
    },
    isDisabled: {
      type: Boolean
    },
    isActive: {
      type: Boolean
    },
    loadingText: {
      type: String
    },
    isFullWidth: {
      type: Boolean
    },
    type: {
      type: String
    },
    leftIcon: {
      type: String
    },
    rightIcon: {
      type: String
    },
    iconSpacing: {
      type: SNAO
    },
    spinnerPlacement: {
      type: String,
      "default": "start"
    }
  }, vueThemingProps),
  setup: function setup(_props, _ref5) {
    var attrs = _ref5.attrs,
        slots = _ref5.slots;
    var props = computed(function () {
      return mergeWith({}, defaultButtonProps, _props, attrs);
    });
    var themingProps = computed(function () {
      return filterUndefined({
        colorScheme: props.value.colorScheme,
        variant: props.value.variant,
        size: props.value.size,
        styleConfig: props.value.styleConfig
      });
    });
    var group = useButtonGroup();
    var styles = useStyleConfig("Button", computed(function () {
      return _extends({}, group == null ? void 0 : group.value, themingProps.value);
    }));

    var _focus = computed(function () {
      var _styles$value$_focus, _styles$value;

      return mergeWith({}, (_styles$value$_focus = (_styles$value = styles.value) == null ? void 0 : _styles$value["_focus"]) != null ? _styles$value$_focus : {}, {
        zIndex: 1
      });
    });

    var buttonStyles = computed(function () {
      return _extends({
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
        width: props.value.isFullWidth ? "100%" : "auto"
      }, styles.value, !!(group != null && group.value) && {
        _focus: _focus.value
      });
    });
    return function () {
      return createVNode(chakra.button, mergeProps({
        "as": props.value.as,
        "label": "button"
      }, (props.value.isDisabled || props.value.isLoading) && {
        disabled: props.value.isDisabled || props.value.isLoading
      }, {
        "type": props.value.as === "button" ? undefined : props.value.type,
        "data-active": dataAttr(props.value.isActive),
        "data-loading": dataAttr(props.value.isLoading),
        "__css": buttonStyles.value
      }, attrs), {
        "default": function _default() {
          return createVNode(Fragment, null, [props.value.isLoading && props.value.spinnerPlacement === "start" && createVNode(CButtonSpinner, {
            "placement": "start",
            "spacing": props.value.iconSpacing,
            "__label": "button-spinner__start",
            "label": props.value.loadingText,
            "__css": {
              fontSize: "1em",
              lineHeight: "normal"
            }
          }, null), props.value.isLoading ? props.value.loadingText || createVNode(chakra.span, {
            "opacity": 0
          }, {
            "default": function _default() {
              return [createVNode(CButtonContent, {
                "leftIcon": props.value.leftIcon,
                "rightIcon": props.value.rightIcon,
                "iconSpacing": props.value.iconSpacing
              }, {
                "default": function _default() {
                  return [slots == null ? void 0 : slots["default"] == null ? void 0 : slots["default"]()];
                }
              })];
            }
          }) : createVNode(CButtonContent, {
            "leftIcon": props.value.leftIcon,
            "rightIcon": props.value.rightIcon,
            "iconSpacing": props.value.iconSpacing
          }, {
            "default": function _default() {
              return getValidChildren(slots);
            }
          }), props.value.isLoading && props.value.spinnerPlacement === "end" && createVNode(CButtonSpinner, {
            "placement": "end",
            "spacing": props.value.iconSpacing,
            "__label": "button-spinner__end",
            "label": props.value.loadingText,
            "__css": {
              fontSize: "1em",
              lineHeight: "normal"
            }
          }, null)]);
        }
      });
    };
  }
});

var IconButtonProps = {
  // ...BUTTON_PROPS,
  icon: String,
  isRound: Boolean,
  ariaLabel: {
    type: String,
    required: true
  }
};

/**
 * CIconButton
 *
 * IconButton composes the Button component except that it renders only an icon.
 */
var CIconButton = defineComponent({
  name: "CIconButton",
  props: IconButtonProps,
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;

    if (!props.ariaLabel) {
      console.error("chakra-ui: The `aria-label` prop is required for the <c-icon-button />");
    }

    return function () {
      return createVNode(CButton, mergeProps({
        "padding": "0",
        "rounded": props.isRound ? "rounded" : "md",
        "aria-label": props.ariaLabel
      }, attrs), {
        "default": function _default() {
          return [createVNode(CIcon, {
            "aria-hidden": true,
            "focusable": 0,
            "name": props.icon
          }, null)];
        }
      });
    };
  }
});
var Foo = defineComponent(function (props, _ref2) {
  var slots = _ref2.slots;
  return function () {
    return createVNode("div", null, [createVNode("span", {
      "data-foo": true
    }, [createTextVNode("Hello")]), slots]);
  };
});

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}
defineComponent(function (_, _ref) {
  var slots = _ref.slots;
  return function () {
    return createVNode(Foo, null, _isSlot(slots) ? slots : {
      "default": function _default() {
        return [slots];
      }
    });
  };
});

export { CButton, CButtonGroup, CIconButton, Foo };
