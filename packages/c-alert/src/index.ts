import { defineComponent, computed, createVNode, mergeProps, isVNode, Fragment } from 'vue';
import { createStylesContext, useMultiStyleConfig, chakra } from '@chakra-ui/vue-system';
import { createContext, getValidChildren } from '@chakra-ui/vue-utils';
import { createIconComponent } from '@chakra-ui/c-icon';

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

var CInfoIcon = createIconComponent("info");
var CCheckIcon = createIconComponent("check-circle");
var CWarningIcon = createIconComponent("warning-alt");
var CErrorIcon = createIconComponent("warning");

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

var STATUSES = {
  info: {
    colorScheme: "blue",
    icon: CInfoIcon
  },
  success: {
    colorScheme: "green",
    icon: CCheckIcon
  },
  warning: {
    colorScheme: "orange",
    icon: CWarningIcon
  },
  error: {
    colorScheme: "red",
    icon: CErrorIcon
  },
  loading: {
    icon: CInfoIcon,
    colorScheme: "blue"
  }
};

var _createStylesContext = createStylesContext("Alert"),
    StylesProvider = _createStylesContext[0],
    useStyles = _createStylesContext[1];

var _createContext = createContext({
  name: "AlertContext",
  errorMessage: "useAlertContext: `context` is undefined. Seems you forgot to wrap alert components in `<c-alert />`"
}),
    AlertProvider = _createContext[0],
    useAlertContext = _createContext[1];
/**
 * CAlert component
 *
 * This is the container component for all Alert components.
 * It also provides state and context to it's compound components
 */


var CAlert = defineComponent({
  name: "CAlert",
  props: {
    as: {
      type: [String, Object],
      "default": "div"
    },
    status: {
      type: [String],
      "default": "info"
    },
    colorScheme: {
      type: [String]
    },
    styleConfig: {
      type: [Object]
    },
    variant: {
      type: [String],
      "default": "solid"
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    var colorScheme = computed(function () {
      var _STATUSES$props$statu;

      return props.colorScheme || ((_STATUSES$props$statu = STATUSES[props == null ? void 0 : props.status]) == null ? void 0 : _STATUSES$props$statu.colorScheme);
    });
    var themingProps = computed(function () {
      return {
        colorScheme: colorScheme.value,
        variant: props.variant
      };
    });
    AlertProvider({
      status: computed(function () {
        return props.status;
      })
    });
    var styles = useMultiStyleConfig("Alert", themingProps);
    StylesProvider(styles);
    var alertStyles = computed(function () {
      return _extends({
        width: "100%",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden"
      }, styles.value.container);
    });
    return function () {
      return createVNode(chakra.div, mergeProps({
        "role": "alert",
        "__label": "alert",
        "__css": alertStyles.value
      }, attrs), {
        "default": function _default() {
          return getValidChildren(slots);
        }
      });
    };
  }
});
/**
 * CAlertTitle component
 *
 * The title component for alerts
 */

var CAlertTitle = defineComponent({
  name: "CAlertTitle",
  setup: function setup(_, _ref2) {
    var attrs = _ref2.attrs,
        slots = _ref2.slots;
    var styles = useStyles();
    return function () {
      return createVNode(chakra.div, mergeProps({
        "__label": "alert__title",
        "__css": styles.value.title
      }, attrs), _isSlot(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});
/**«
 * CAlertDescription component
 *
 * The description component for alerts
 */

var CAlertDescription = defineComponent({
  name: "CAlertDescription",
  setup: function setup(_, _ref3) {
    var attrs = _ref3.attrs,
        slots = _ref3.slots;
    var styles = useStyles();
    return function () {
      return createVNode(chakra.div, mergeProps({
        "__label": "alert__description",
        "__css": styles.value.description
      }, attrs), {
        "default": function _default() {
          return getValidChildren(slots);
        }
      });
    };
  }
});
/**
 * CAlertIcon component
 *
 * The Icon component for alerts
 */

var CAlertIcon = defineComponent({
  name: "CAlertIcon",
  setup: function setup(_, _ref4) {
    var attrs = _ref4.attrs,
        slots = _ref4.slots;
    var styles = useStyles();

    var _useAlertContext = useAlertContext(),
        status = _useAlertContext.status;

    var BaseIcon = STATUSES[status.value].icon;
    var css = computed(function () {
      return status.value === "loading" ? styles.value.spinner : styles.value.icon;
    });
    return function () {
      var validChildren = getValidChildren(slots);
      return createVNode(chakra.span, mergeProps({
        "display": "inherit",
        "__label": "alert__icon"
      }, attrs, {
        "__css": css.value
      }), {
        "default": function _default() {
          return createVNode(Fragment, null, [validChildren.length ? slots : createVNode(BaseIcon, {
            "h": "100%",
            "w": "100%"
          }, null)]);
        }
      }); // return <icon {...styles.value.icon} {...attrs}></icon>
    };
  }
});

export { CAlert, CAlertDescription, CAlertIcon, CAlertTitle };
