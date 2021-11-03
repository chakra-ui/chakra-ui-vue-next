import { computed, ref, watchEffect, defineComponent, toRefs, createVNode, mergeProps, isVNode, h, createTextVNode } from 'vue';
import { useMultiStyleConfig, StylesProvider, chakra, useStyles, useStyleConfig, omitThemingProps } from '@chakra-ui/vue-system';
import { useId, useIds } from '@chakra-ui/vue-composables';
import { dataAttr, callAllHandlers, ariaAttr } from '@chakra-ui/utils';
import { createContext, vueThemingProps } from '@chakra-ui/vue-utils';
import { iconProps, CIcon } from '@chakra-ui/c-icon';

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

var _excluded$1 = ["id", "disabled", "readOnly", "required", "isRequired", "isInvalid", "isReadOnly", "isDisabled", "onFocus", "onBlur"];
function useFormControlProvider(props) {
  var idProp = props.id,
      isRequired = props.isRequired,
      isInvalid = props.isInvalid,
      isDisabled = props.isDisabled,
      isReadOnly = props.isReadOnly,
      forProp = props["for"]; // Generate all the required ids

  var id = computed(function () {
    return (idProp == null ? void 0 : idProp.value) || useId('form').value;
  });

  var _useIds = useIds(id.value, 'label', 'feedback', 'helptext'),
      labelId = _useIds[0],
      feedbackId = _useIds[1],
      helpTextId = _useIds[2];
  /**
   * Track whether the `CFormErrorMessage` has been rendered.
   * We use this to append its id the the `aria-describedby` of the `input`.
   */


  var hasFeedbackText = ref(false);
  /**
   * Track whether the `CFormHelperText` has been rendered.
   * We use this to append its id the the `aria-describedby` of the `input`.
   */

  var hasHelpText = ref(false); // Tracks whether focus is contained inside the form element

  var isFocused = ref(false);
  var helperTextProps = computed(function () {
    return {
      id: helpTextId.value
    };
  });
  var labelProps = computed(function () {
    var _forProp$value;

    return {
      "data-focus": dataAttr(isFocused.value),
      "data-disabled": dataAttr(isDisabled == null ? void 0 : isDisabled.value),
      "data-invalid": dataAttr(isInvalid == null ? void 0 : isInvalid.value),
      "data-readonly": dataAttr(isReadOnly == null ? void 0 : isReadOnly.value),
      id: labelId.value,
      "for": (_forProp$value = forProp == null ? void 0 : forProp.value) != null ? _forProp$value : id.value
    };
  });
  var errorMessageProps = computed(function () {
    return {
      id: feedbackId.value,
      'aria-live': 'polite'
    };
  });
  var rootProps = computed(function () {
    return {
      role: 'group'
    };
  });
  var requiredIndicatorProps = computed(function () {
    return {
      role: 'presentation',
      'aria-hidden': true
    };
  });
  return {
    isRequired: isRequired,
    isInvalid: isInvalid,
    isReadOnly: isReadOnly,
    isDisabled: isDisabled,
    isFocused: isFocused,
    onFocus: function onFocus() {
      isFocused.value = true;
    },
    onBlur: function onBlur() {
      isFocused.value = false;
    },
    hasFeedbackText: hasFeedbackText,
    hasHelpText: hasHelpText,
    id: id,
    labelId: labelId,
    feedbackId: feedbackId,
    helpTextId: helpTextId,
    rootProps: rootProps,
    labelProps: labelProps,
    helperTextProps: helperTextProps,
    errorMessageProps: errorMessageProps,
    requiredIndicatorProps: requiredIndicatorProps
  };
}

var _createContext = createContext({
  strict: false,
  name: 'FormControlContext'
}),
    FormControlProvider = _createContext[0],
    useFormControlContext = _createContext[1];

/**
 * Vue Composable that provides the props that should be spread on to
 * input fields (`input`, `select`, `textarea`, etc.).
 *
 * It provides a convenient way to control a form fields, validation
 * and helper text.
 */
function useFormControl(props) {
  var _useFormControlProps = useFormControlProps(props),
      isDisabled = _useFormControlProps.isDisabled,
      isInvalid = _useFormControlProps.isInvalid,
      isReadOnly = _useFormControlProps.isReadOnly,
      isRequired = _useFormControlProps.isRequired,
      id = _useFormControlProps.id,
      ariaDescribedBy = _useFormControlProps["aria-describedby"],
      onBlur = _useFormControlProps.onBlur,
      onFocus = _useFormControlProps.onFocus;

  var formControlProps = computed(function () {
    return {
      id: id == null ? void 0 : id.value,
      "aria-describedby": ariaDescribedBy.value,
      onBlur: onBlur,
      onFocus: onFocus,
      disabled: isDisabled == null ? void 0 : isDisabled.value,
      readOnly: isReadOnly == null ? void 0 : isReadOnly.value,
      required: isRequired == null ? void 0 : isRequired.value,
      "aria-invalid": ariaAttr(isInvalid == null ? void 0 : isInvalid.value),
      "aria-required": ariaAttr(isRequired == null ? void 0 : isRequired.value),
      "aria-readonly": ariaAttr(isReadOnly == null ? void 0 : isReadOnly.value)
    };
  });
  return formControlProps;
}
function useFormControlProps(props) {
  var _props$ariaDescribed, _props$ariaDescribed2, _ref, _field$value4, _ref2, _field$value5, _ref3, _field$value6, _field$value7, _field$value8, _field$value9;

  var field = useFormControlContext();

  var id = props.id,
      disabled = props.disabled,
      readOnly = props.readOnly,
      required = props.required,
      isRequired = props.isRequired,
      isInvalid = props.isInvalid,
      isReadOnly = props.isReadOnly,
      isDisabled = props.isDisabled,
      onFocus = props.onFocus,
      onBlur = props.onBlur,
      rest = _objectWithoutPropertiesLoose(props, _excluded$1);

  var labelIds = ref((_props$ariaDescribed = props["aria-describedby"]) != null && _props$ariaDescribed['value'] ? [(_props$ariaDescribed2 = props["aria-describedby"]) == null ? void 0 : _props$ariaDescribed2['value']] : []);
  watchEffect(function () {
    var _field$value, _field$value$isInvali, _field$value3, _field$value3$hasHelp;

    // Error message must be described first in all scenarios.
    if (field != null && field.value.hasFeedbackText.value && field != null && (_field$value = field.value) != null && (_field$value$isInvali = _field$value.isInvalid) != null && _field$value$isInvali.value) {
      var _field$value2, _field$value2$feedbac;

      labelIds.value.push(field == null ? void 0 : (_field$value2 = field.value) == null ? void 0 : (_field$value2$feedbac = _field$value2.feedbackId) == null ? void 0 : _field$value2$feedbac.value);
    }

    if (field != null && (_field$value3 = field.value) != null && (_field$value3$hasHelp = _field$value3.hasHelpText) != null && _field$value3$hasHelp.value) {
      labelIds.value.push(field.value.helpTextId.value);
    }
  });
  return _extends({}, rest, {
    "aria-describedby": computed(function () {
      return labelIds.value.join(" ") || undefined;
    }),
    id: id != null ? id : field == null ? void 0 : field.value.id,
    isDisabled: (_ref = disabled != null ? disabled : isDisabled) != null ? _ref : field == null ? void 0 : (_field$value4 = field.value) == null ? void 0 : _field$value4.isDisabled,
    isReadOnly: (_ref2 = readOnly != null ? readOnly : isReadOnly) != null ? _ref2 : field == null ? void 0 : (_field$value5 = field.value) == null ? void 0 : _field$value5.isReadOnly,
    isRequired: (_ref3 = required != null ? required : isRequired) != null ? _ref3 : field == null ? void 0 : (_field$value6 = field.value) == null ? void 0 : _field$value6.isRequired,
    isInvalid: isInvalid != null ? isInvalid : field == null ? void 0 : (_field$value7 = field.value) == null ? void 0 : _field$value7.isInvalid,
    onFocus: callAllHandlers(field == null ? void 0 : (_field$value8 = field.value) == null ? void 0 : _field$value8.onFocus, onFocus == null ? void 0 : onFocus.value),
    onBlur: callAllHandlers(field == null ? void 0 : (_field$value9 = field.value) == null ? void 0 : _field$value9.onBlur, onBlur == null ? void 0 : onBlur.value)
  });
}

var _excluded = ["as"],
    _excluded2 = ["rootProps"];
/**
 * `CFormControl` provides context such as
 * `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 */

function _isSlot$1(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

var formControlProps = {
  isRequired: Boolean,
  isDisabled: Boolean,
  isInvalid: Boolean,
  isReadOnly: Boolean,
  label: String,
  id: String
};
var CFormControl = defineComponent({
  props: _extends({
    as: {
      type: [Object, String],
      "default": 'div'
    }
  }, formControlProps),
  setup: function setup(_props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;

    var _toRefs = toRefs(_props),
        as = _toRefs.as,
        props = _objectWithoutPropertiesLoose(_toRefs, _excluded);

    var ownProps = computed(function () {
      return props;
    });
    var styles = useMultiStyleConfig('Form', props);

    var _useFormControlProvid = useFormControlProvider(ownProps.value),
        rootProps = _useFormControlProvid.rootProps,
        _context = _objectWithoutPropertiesLoose(_useFormControlProvid, _excluded2);

    var context = computed(function () {
      return _context;
    });
    FormControlProvider(context);
    StylesProvider(styles);
    return function () {
      return createVNode(chakra.div, mergeProps({
        "as": as.value
      }, rootProps.value, {
        "__css": styles.value.container,
        "__label": "form"
      }, attrs), _isSlot$1(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

/**
 * CFormHelperText
 *
 * Assistive component that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided.
 */
var CFormHelperText = defineComponent(function (props, _ref2) {
  _ref2.attrs;
      var slots = _ref2.slots;
  var field = useFormControlContext();
  var styles = useStyles();

  var handleVNodeMounted = function handleVNodeMounted() {
    field.value.hasHelpText.value = true;
  };

  return function () {
    return createVNode(chakra.div, mergeProps({
      "__label": "form__helper-text",
      "onVnodeBeforeMount": handleVNodeMounted
    }, field.value.helperTextProps.value, {
      "__css": styles.value.helperText
    }), _isSlot$1(slots) ? slots : {
      "default": function _default() {
        return [slots];
      }
    });
  };
});

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

var CFormErrorMessage = defineComponent({
  name: 'CFormErrorMessage',
  props: _extends({}, vueThemingProps),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    var styles = useMultiStyleConfig('FormError', props);
    var field = useFormControlContext();
    StylesProvider(styles);

    var handleBeforeVNodeMounted = function handleBeforeVNodeMounted() {
      field.value.hasFeedbackText.value = true;
    };

    return function () {
      var _field$value, _field$value$isInvali;

      if (!(field != null && (_field$value = field.value) != null && (_field$value$isInvali = _field$value.isInvalid) != null && _field$value$isInvali.value)) return null;
      return createVNode(chakra.div, mergeProps({
        "__label": "form__error-message",
        "onVnodeBeforeMount": handleBeforeVNodeMounted,
        "__css": _extends({
          display: 'flex',
          alignItems: 'center'
        }, styles.value.text)
      }, attrs), _isSlot(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});
/**
 * Used as the visual indicator that a field is invalid or
 * a field has incorrect values.
 */

var CFormErrorIcon = defineComponent({
  name: 'CFormErrorIcon',
  props: iconProps,
  setup: function setup(props, _ref2) {
    var attrs = _ref2.attrs;
    var styles = useStyles();
    var field = useFormControlContext();
    return function () {
      var _field$value2, _field$value2$isInval;

      if (!(field != null && (_field$value2 = field.value) != null && (_field$value2$isInval = _field$value2.isInvalid) != null && _field$value2$isInval.value)) return null;
      return (// @ts-ignore
        createVNode(CIcon, mergeProps({
          "aria-hidden": true,
          "__css": styles.value.icon,
          "class": "chakra-form__error-icon"
        }, props, attrs, {
          "name": "__error_icon"
        }), null)
      );
    };
  }
});

var CFormLabel = defineComponent({
  name: 'CFormLabel',
  props: vueThemingProps,
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots;
    var styles = useStyleConfig("FormLabel", props);

    omitThemingProps(props);

    var field = useFormControlContext();
    var requiredIndicator = computed(function () {
      if (slots.indicator) {
        return slots.indicator == null ? void 0 : slots.indicator();
      } else {
        return h(CRequiredIndicator);
      }
    });
    return function () {
      var _field$value, _field$value2, _field$value2$isRequi;

      return createVNode(chakra.label, mergeProps({
        "__label": "form__label",
        "__css": _extends({
          display: 'block',
          textAlign: 'start'
        }, styles.value)
      }, field == null ? void 0 : (_field$value = field.value) == null ? void 0 : _field$value.labelProps.value, attrs), {
        "default": function _default() {
          return [slots == null ? void 0 : slots["default"] == null ? void 0 : slots["default"](), field != null && (_field$value2 = field.value) != null && (_field$value2$isRequi = _field$value2.isRequired) != null && _field$value2$isRequi.value ? requiredIndicator.value : null];
        }
      });
    };
  }
});

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
var CRequiredIndicator = defineComponent({
  name: 'CRequiredIndicator',
  setup: function setup(_, _ref2) {
    var _field$value3, _field$value3$isRequi;

    var attrs = _ref2.attrs;
    var field = useFormControlContext();
    var styles = useStyles();
    if (!(field != null && (_field$value3 = field.value) != null && (_field$value3$isRequi = _field$value3.isRequired) != null && _field$value3$isRequi.value)) return null;
    return function () {
      var _field$value4;

      return createVNode(chakra.span, mergeProps(field == null ? void 0 : (_field$value4 = field.value) == null ? void 0 : _field$value4.requiredIndicatorProps.value, {
        "__css": styles.value.requiredIndicator,
        "__label": "form__required-indicator"
      }, attrs), {
        "default": function _default() {
          return [createTextVNode("*")];
        }
      });
    };
  }
});

export { CFormControl, CFormErrorIcon, CFormErrorMessage, CFormHelperText, CFormLabel, CRequiredIndicator, FormControlProvider, formControlProps, useFormControl, useFormControlContext, useFormControlProps, useFormControlProvider };
