import { inject, defineComponent, computed, resolveComponent, h } from 'vue';
import { css as css$1, isStyleProp } from '@chakra-ui/styled-system';
export * from '@chakra-ui/styled-system';
import _styled from '@chakra-ui/vue-styled';
import { isObject, memoizedGet, isFunction, objectFilter, get, mergeWith, filterUndefined, runIfFn } from '@chakra-ui/utils';
import { css, cx } from '@emotion/css';
export { injectGlobal, keyframes } from '@emotion/css';
import { useColorMode } from '@chakra-ui/c-color-mode';
import { extractStyleAttrs, SNAO, createContext } from '@chakra-ui/vue-utils';

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

/**
 * Carefully selected html elements for chakra components.
 * This is mostly for `chakra.[element]` syntax.
 *
 * Adapted from React package
 */
var domElements = ["a", "b", "article", "aside", "blockquote", "button", "caption", "cite", "circle", "code", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "iframe", "img", "input", "kbd", "label", "li", "mark", "main", "nav", "ol", "p", "path", "pre", "q", "rect", "s", "svg", "section", "select", "strong", "small", "span", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "tr", "ul"];

/** Provides theme object in component context */
var useTheme = function useTheme() {
  var theme = inject("$chakraTheme");
  return theme;
};
/** Single hook to provide theme and color mode values */

var useChakra = function useChakra() {
  var theme = useTheme();

  var _useColorMode = useColorMode(),
      colorMode = _useColorMode.colorMode;

  return {
    theme: theme,
    colorMode: colorMode
  };
};

var formElements = {
  input: {
    emits: ["input", "change", "onUpdate:modelValue"],
    props: {
      modelValue: [Boolean, String]
    },
    handleValueChange: function handleValueChange(props, type) {
      return function (emit) {
        return _extends({}, type === "checkbox" && {
          checked: props.modelValue // value: props.modelValue,

        }, {
          onChange: function onChange(event) {
            if (type === "checkbox") {
              emit("change", !(event == null ? void 0 : event.target).checked, event);
              emit("update:modelValue", !(event == null ? void 0 : event.target).checked, event);
              return;
            }
          },
          onInput: function onInput(event) {
            emit("input", (event == null ? void 0 : event.currentTarget).value, event);
            emit("update:modelValue", (event == null ? void 0 : event.currentTarget).value, event);
          }
        });
      };
    }
  },
  textarea: {
    emits: ["input", "change", "onUpdate:modelValue"],
    props: {
      modelValue: [Boolean, String]
    },
    handleValueChange: function handleValueChange(props, type) {
      return function (emit) {
        return {
          onInput: function onInput(event) {
            emit("input", (event == null ? void 0 : event.currentTarget).value, event);
            emit("update:modelValue", (event == null ? void 0 : event.currentTarget).value, event);
          }
        };
      };
    }
  },
  select: {
    emits: ["input", "change", "onUpdate:modelValue"],
    props: {
      modelValue: [Boolean, String]
    },
    handleValueChange: function handleValueChange(props, type) {
      return function (emit) {
        return {
          onChange: function onChange(event) {
            emit("input", (event == null ? void 0 : event.currentTarget).value, event);
            emit("update:modelValue", (event == null ? void 0 : event.currentTarget).value, event);
          }
        };
      };
    }
  }
};

var _excluded$1 = ["class", "__label"],
    _excluded2 = ["layerStyle", "baseStyle", "textStyle", "noOfLines", "isTruncated", "__css", "css", "sx", "apply", "label"],
    _excluded3 = ["theme", "css", "__css", "sx"],
    _excluded4 = ["baseStyle"],
    _excluded5 = ["layerStyle", "baseStyle", "textStyle", "noOfLines", "isTruncated", "__css", "css", "sx", "apply", "theme"];
var chakraProps = {
  as: [String, Object],
  __css: Object,
  sx: Object,
  css: Object,
  noOfLines: SNAO,
  baseStyle: Object,
  isTruncated: Boolean,
  layerStyle: String,
  textStyle: String,
  apply: String,
  label: String,
  modelValue: SNAO,

  /**
   * @warning
   * @internal
   * This internal is an internal ChakraFactoryFunction prop that
   * is used to determine how events are handled on Chakra Factory
   * components.
   *
   * For example, if a factory component is considered to be raw (i.e. `__chakraIsRaw: true`),
   * then, we do not pass v-model event listeners onto the component. This means that
   * `v-model` will not work in the template context.
   *
   * You can see how this prop is used in the `c-input` component.
   *
   * THIS PROP IS A NON-DOCUMENTED PROP, AND IS ONLY TO BE USED FOR INTERNAL DEVELOPMENT.
   */
  __chakraIsRaw: Boolean
};

/**
 * Chakra factory serves as an object of chakra enabled HTML elements,
 * and also a function that can be used to enable custom component receive chakra's style props.
 * @param tag Tag or Component
 * @param options resolver options
 * 
 * How does it work?
 *
 * 1. Components returned from the chakra factory can be styled after consuming them
 *    @example
 *    ```js
 *    const Form = chakra('form') // returns a VNode you can use in the template directly
 *    ```
 * 
 * 2. Chakra components can directly be styled upon creation using the options object of type `StyleResolverProps`
 *    This resolves style object for component styles defined in the theme.
 * 
 *    Styling components using the chakra factory function can be done using the following keys from the theme:
 *    - `baseStyle`
 *    - `layerStyle`
 *    - `textStyle`
 * 
 *    @example
 *    ```js
 *    const MyCustomButton = chakra('button', {
 *     baseStyle: {
         bg: 'papayawhip,
         color: 'red.500,
         px: 4,
         py: 3
       }
 *    })
 *    ```
 *    ```html
 *    <my-custom-button>Hello Papaya Button</my-custom-button>
 *    ```
 * 
 *    See more about the style resolution in the `resolveStyles` function.
 * 
 * 3. Chakra components created and styled using the `chakra` factory can be overriden in the template by applying
 *    style properties directly
 * 
 *    @example
 *    ```html
 *    <my-custom-button bg="blue.400">
 *      Papaya button goes blue
 *    </my-custom-button>
 *    ```
 */
// @ts-expect-error
var chakra = function chakra(tag, options) {
  if (options === void 0) {
    options = {};
  }

  var inputHandlers = formElements[typeof tag === "string" ? tag : ""];

  var _props = inputHandlers && inputHandlers.props || {};

  var handleValueChange = inputHandlers && inputHandlers.handleValueChange;
  return defineComponent({
    name: "chakra-factory-" + String(tag),
    inheritAttrs: false,
    props: _extends({}, chakraProps, _props),
    setup: function setup(props, _ref) {
      var slots = _ref.slots,
          emit = _ref.emit,
          attrs = _ref.attrs;
      var theme = useTheme();
      var layerStyle$ = computed(function () {
        var _options;

        return props.layerStyle || ((_options = options) == null ? void 0 : _options.layerStyle);
      });
      var textStyle$ = computed(function () {
        var _options2;

        return props.textStyle || ((_options2 = options) == null ? void 0 : _options2.textStyle);
      });
      var baseStyle$ = computed(function () {
        var _options3;

        return props.baseStyle || ((_options3 = options) == null ? void 0 : _options3.baseStyle);
      });
      var noOfLines$ = computed(function () {
        var _options4;

        return props.noOfLines || ((_options4 = options) == null ? void 0 : _options4.noOfLines);
      });
      var isTruncated$ = computed(function () {
        var _options5;

        return props.isTruncated || ((_options5 = options) == null ? void 0 : _options5.isTruncated);
      });

      var __css$ = computed(function () {
        var _options6;

        return props.__css || ((_options6 = options) == null ? void 0 : _options6.__css);
      });

      var css$ = computed(function () {
        var _options7;

        return props.css || ((_options7 = options) == null ? void 0 : _options7.css);
      });
      var sx$ = computed(function () {
        var _options8;

        return props.sx || ((_options8 = options) == null ? void 0 : _options8.sx);
      });
      var apply$ = computed(function () {
        var _options9;

        return props.apply || ((_options9 = options) == null ? void 0 : _options9.apply);
      });
      return function () {
        var inheritedClass = attrs["class"],
            __label = attrs.__label,
            rest = _objectWithoutPropertiesLoose(attrs, _excluded$1);

        var _options10 = options;
            _options10.layerStyle;
            _options10.baseStyle;
            _options10.textStyle;
            _options10.noOfLines;
            _options10.isTruncated;
            _options10.__css;
            _options10.css;
            _options10.sx;
            _options10.apply;
            var label = _options10.label,
            otherStyles = _objectWithoutPropertiesLoose(_options10, _excluded2); // Separate component style attributes from raw HTML attributes


        var _extractStyleAttrs = extractStyleAttrs(_extends({}, otherStyles, rest)),
            styles = _extractStyleAttrs.styles,
            elementAttributes = _extractStyleAttrs.attrs;

        var resolvedComponentStyles = resolveStyles(_extends({
          __css: __css$.value,
          baseStyle: baseStyle$.value,
          apply: apply$.value,
          layerStyle: layerStyle$.value,
          noOfLines: noOfLines$.value,
          isTruncated: isTruncated$.value,
          textStyle: textStyle$.value,
          sx: sx$.value,
          css: css$.value
        }, styles, {
          theme: theme
        }));
        var componentLabel = label || __label;

        var _componentName = componentLabel ? "chakra-" + componentLabel : "";

        var className = css(resolvedComponentStyles);

        var componentOrTag = props.as || tag; // if tag is not a dom element like as="div" and an object (vue component as an object) like v-bind:as="RouterLink"

        if (!isObject(componentOrTag) && !domElements.includes(componentOrTag)) {
          // it's a string like as="router-link"
          componentOrTag = resolveComponent(componentOrTag);
        }

        return h(componentOrTag || props.as, _extends({
          "class": cx(inheritedClass, _componentName, className)
        }, elementAttributes, !props.__chakraIsRaw && handleValueChange && // @ts-ignore
        handleValueChange(props, attrs.type)(emit)), slots);
      };
    }
  });
}; // return h(
//   _styled((componentOrTag as any) || props.as)({
//     ...resolvedComponentStyles,
//     ...elementAttributes,
//   }) as unknown as DefineComponent<ChakraProps>,
//   slots
// )

var toCSSObject = function toCSSObject(options) {
  return function (props) {
    var theme = props.theme,
        cssProp = props.css;
        props.__css;
        props.sx;
        var rest = _objectWithoutPropertiesLoose(props, _excluded3);

    var styleProps = objectFilter(rest, function (_, prop) {
      return isStyleProp(prop);
    });
    var finalStyles = resolveStyles(Object.assign(options, {
      theme: theme
    }, styleProps));
    var computedCSS = css$1(finalStyles)(props.theme);
    return cssProp ? [computedCSS, cssProp] : computedCSS;
  };
};
function styled(component, options) {
  var _ref2 = options != null ? options : {};
      _ref2.baseStyle;
      var styledOptions = _objectWithoutPropertiesLoose(_ref2, _excluded4);

  var styleObject = toCSSObject(options);
  return _styled(component, styledOptions)(styleObject);
}
var _chakra = styled;
domElements.forEach(function (tag) {
  chakra[tag] = chakra(tag);
});
var resolveStyles = function resolveStyles(resolvers) {
  if (resolvers === void 0) {
    resolvers = {};
  }

  var _resolvers = resolvers,
      layerStyle = _resolvers.layerStyle,
      baseStyle = _resolvers.baseStyle,
      textStyle = _resolvers.textStyle,
      noOfLines = _resolvers.noOfLines,
      isTruncated = _resolvers.isTruncated,
      __css = _resolvers.__css,
      cssProp = _resolvers.css,
      sx = _resolvers.sx,
      apply = _resolvers.apply,
      theme = _resolvers.theme,
      otherStyles = _objectWithoutPropertiesLoose(_resolvers, _excluded5);

  var _layerStyle = memoizedGet(theme, "layerStyles." + layerStyle, {});

  var _textStyle = memoizedGet(theme, "textStyles." + textStyle, {});

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

  var finalStyles = css$1(Object.assign({}, __css, baseStyle, {
    apply: apply
  }, _layerStyle, _textStyle, truncateStyle, otherStyles, sx))(theme);
  var cssObject = Object.assign(finalStyles, isFunction(cssProp) ? cssProp(theme) : cssProp);
  return cssObject;
};
domElements.forEach(function (tag) {
  chakra[tag] = chakra(tag, {});
});
domElements.forEach(function (tag) {
  _chakra[tag] = _chakra(tag, {});
});

var _createContext = createContext({
  name: "StylesContext",
  errorMessage: "useStyles: `styles` is undefined. Seems you forgot to provide `StylesProvider(...)` "
}),
    StylesProvider = _createContext[0],
    useStyles = _createContext[1];
var createStylesContext = function createStylesContext(componentName) {
  return createContext({
    name: componentName + "StylesContext",
    errorMessage: "useStyles: \"styles\" is undefined. Seems you forgot to wrap the components in \"<" + componentName + " />\" "
  });
};

var _excluded = ["styleConfig"];
function useStyleConfig(themeKey, themingProps, options) {
  if (options === void 0) {
    options = {};
  }

  return computed(function () {
    var _styleConfig$defaultP, _styleConfig$baseStyl, _styleConfig$variants, _styleConfig$variants2, _styleConfig$sizes$me, _styleConfig$sizes;

    var _ref = themingProps.value || themingProps,
        styleConfigProp = _ref.styleConfig,
        rest = _objectWithoutPropertiesLoose(_ref, _excluded);

    var _useChakra = useChakra(),
        theme = _useChakra.theme,
        colorMode = _useChakra.colorMode;

    var themeStyleConfig = get(theme, "components." + themeKey);
    var styleConfig = styleConfigProp || themeStyleConfig;
    var mergedProps = mergeWith({
      theme: theme,
      colorMode: colorMode.value
    }, (_styleConfig$defaultP = styleConfig == null ? void 0 : styleConfig.defaultProps) != null ? _styleConfig$defaultP : {}, filterUndefined(rest));
    var baseStyles = runIfFn((_styleConfig$baseStyl = styleConfig == null ? void 0 : styleConfig.baseStyle) != null ? _styleConfig$baseStyl : {}, mergedProps);
    var variants = runIfFn((_styleConfig$variants = styleConfig == null ? void 0 : (_styleConfig$variants2 = styleConfig.variants) == null ? void 0 : _styleConfig$variants2[mergedProps.variant]) != null ? _styleConfig$variants : {}, mergedProps);
    var sizes = runIfFn((_styleConfig$sizes$me = styleConfig == null ? void 0 : (_styleConfig$sizes = styleConfig.sizes) == null ? void 0 : _styleConfig$sizes[mergedProps.size]) != null ? _styleConfig$sizes$me : {}, mergedProps);
    var styles = mergeWith({}, baseStyles, sizes, variants);

    if (options.isMultiPart && styleConfig != null && styleConfig.parts) {
      var _styleConfig$parts;

      styleConfig == null ? void 0 : (_styleConfig$parts = styleConfig.parts) == null ? void 0 : _styleConfig$parts.forEach(function (part) {
        var _styles$part;

        styles[part] = (_styles$part = styles[part]) != null ? _styles$part : {};
      });
    }

    return styles;
  });
}
function useMultiStyleConfig(themeKey, themingProps) {
  return useStyleConfig(themeKey, themingProps, {
    isMultiPart: true
  });
}

export { StylesProvider, _chakra, chakra, createStylesContext, domElements, resolveStyles, styled, toCSSObject, useChakra, useMultiStyleConfig, useStyleConfig, useStyles, useTheme };
