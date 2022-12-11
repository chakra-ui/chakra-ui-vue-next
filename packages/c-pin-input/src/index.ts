import { computed, watch, defineComponent, createVNode, mergeProps, h } from 'vue';
import { createStylesContext, useStyleConfig, chakra } from '@chakra-ui/vue-system';
import { createContext, vueThemingProps, getValidChildren } from '@chakra-ui/vue-utils';
import { CInput } from '@chakra-ui/c-input';
import { machine, connect } from '@zag-js/pin-input';
import { useMachine, normalizeProps } from '@zag-js/vue';

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

var usePinInputMachine = function usePinInputMachine(params, emit) {
  var _useMachine = useMachine(machine({
    id: params.id,
    value: params.modelValue || params.value,
    placeholder: params.placeholder,
    type: params.type,
    otp: params.otp,
    mask: params.mask,
    blurOnComplete: params.blurOnComplete,
    onChange: function onChange(value) {
      emit("change", value);
      emit("update:modelValue", value);
    },
    onComplete: function onComplete(_ref) {
      var value = _ref.value,
          valueAsString = _ref.valueAsString;
      emit("complete", {
        value: value,
        valueAsString: valueAsString
      });
    },
    onInvalid: function onInvalid(details) {
      emit("invalid", details);
    }
  })),
      state = _useMachine[0],
      send = _useMachine[1];

  var api = computed(function () {
    return connect(state.value, send, normalizeProps);
  });
  watch(function () {
    return params.modelValue;
  }, function (value) {
    api.value.setValue(Array.from(value));
  });
  return api;
};

var _createStylesContext = createStylesContext("CPinInput"),
    StylesProvider = _createStylesContext[0],
    useStyles = _createStylesContext[1];

var _createContext = createContext(),
    PinInputProvider = _createContext[0],
    usePinInput = _createContext[1];
var CPinInputProps = _extends({
  value: {
    type: Object,
    "default": []
  },
  modelValue: {
    type: Object,
    "default": false
  },
  id: {
    type: String,
    "default": "0"
  },
  placeholder: {
    type: String,
    "default": "o"
  },
  type: {
    type: String,
    "default": "numeric"
  },
  otp: {
    type: Boolean,
    "default": false
  },
  mask: {
    type: Boolean,
    "default": false
  },
  blurOnComplete: {
    type: Boolean,
    "default": false
  },
  dir: {
    type: String,
    "default": "ltr"
  },
  spacing: {
    type: [String, Number],
    "default": "0.75"
  }
}, vueThemingProps);
var CPinInput = defineComponent({
  name: "CPinInput",
  props: CPinInputProps,
  emits: ["change", "invalid", "complete", "update:modelValue"],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs,
        emit = _ref.emit;
    var styles = useStyleConfig("PinInput", props);
    var inputStyles = computed(function () {
      return _extends({}, styles.value, {
        mx: props.spacing
      });
    });
    StylesProvider(inputStyles);
    var api = usePinInputMachine(props, emit);
    PinInputProvider(api);
    return function () {
      return createVNode(chakra.div, mergeProps({
        "__label": "pin-input"
      }, api.value.rootProps, attrs), {
        "default": function _default() {
          return getValidChildren(slots).map(function (child, index) {
            return child.type.name === "CPinInputField" ? h(child, {
              index: index
            }) : child;
          });
        }
      });
    };
  }
});
var CPinInputField = defineComponent({
  name: "CPinInputField",
  props: {
    index: {
      type: Number,
      "default": 0
    }
  },
  setup: function setup(props, _ref2) {
    var attrs = _ref2.attrs;
    var styles = useStyles();
    var api = usePinInput();
    return function () {
      return createVNode(CInput, mergeProps({
        "__label": "pin-input-field",
        "__css": styles.value
      }, api.value.getInputProps({
        index: props.index
      }), attrs), null);
    };
  }
});
var CPinInputClearButton = defineComponent({
  name: "CPinInputClearButton",
  setup: function setup(_, _ref3) {
    var slots = _ref3.slots,
        attrs = _ref3.attrs;
    var api = usePinInput();
    return function () {
      return createVNode(chakra.button, mergeProps({
        "__label": "pin-input-clear-button",
        "onClick": function onClick() {
          return api.value.clearValue();
        }
      }, attrs), {
        "default": function _default() {
          return getValidChildren(slots);
        }
      });
    };
  }
});

export { CPinInput, CPinInputClearButton, CPinInputField, CPinInputProps, PinInputProvider, usePinInput };
