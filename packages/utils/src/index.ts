import { isObject } from '@chakra-ui/utils';
import { isVNode, provide, inject, ref, onBeforeUpdate, unref, customRef } from 'vue';

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
function createContext(options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$strict = _options.strict,
      strict = _options$strict === void 0 ? true : _options$strict,
      _options$errorMessage = _options.errorMessage,
      errorMessage = _options$errorMessage === void 0 ? 'useContext: `context` is undefined. Seems you forgot to wrap component within the Provider' : _options$errorMessage,
      name = _options.name;
  var contextSymbol = Symbol(name + "Symbol");

  function Provider(payload) {
    provide(contextSymbol, payload);
  }

  function useContext() {
    var context = inject(contextSymbol, null);

    if (!context && strict) {
      throw new Error(errorMessage);
    }

    return context;
  }

  return [Provider, useContext];
}
/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param slots vue slots
 *
 * see https://github.com/vuejs/vue-next/blob/HEAD/packages/runtime-core/src/helpers/renderSlot.ts
 */

function getValidChildren(slots) {
  var slotArray = (slots == null ? void 0 : slots["default"] == null ? void 0 : slots["default"]()) || [];
  return slotArray.filter(function (child) {
    return isVNode(child);
  });
}

/** Checkes whether a provided object is a component */
function isObjectComponent(subject) {
  var validComponentTypes = ['function', 'object'];
  if (!validComponentTypes.includes(typeof subject)) return false; // Is sub

  if (isObject(subject)) {
    // Is object component with render function
    if (typeof (subject == null ? void 0 : subject.render) === 'function' && isVNode(subject.render())) return true; // Is object component with setup function
    else if (typeof (subject == null ? void 0 : subject.setup) === 'function') return true;
  }

  return false;
}

function orient(options) {
  var orientation = options.orientation,
      vertical = options.vertical,
      horizontal = options.horizontal;
  if (!orientation) return {};
  return orientation === 'vertical' ? vertical : horizontal;
}

/** Debounce function */
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (immediate && !timeout) func.apply(void 0, args);
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(void 0, args);
    }, wait);
  };
}

/**
 * For internal use
 *
 * Creates refs that will be bound to the template/render function.
 *
 * Why not just use the regular `ref(null)` and bind it to the element?
 *
 * 1. To avoid unwrapping template refs which maybe components. This hook will always
 *    give us the actual element being bound the the element, and not the component
 *    options.
 *
 * 2. In some cases where we need an up-to-date value of the ref node,
 *    from the consuming component, we can use this hook.
 *
 * @returns []
 */
function useRef() {
  var refEl = ref(null);
  onBeforeUpdate(function () {
    // clear refs before DOM updates
    refEl.value = null;
  });
  /**
   * Getter function to bind ref to value
   * @param el Template ref value provided by Vue
   */

  var _ref = function _ref(el) {
    var _$el;

    refEl.value = (_$el = el == null ? void 0 : el.$el) != null ? _$el : el;
  };

  return [_ref, refEl];
}
/** Vue Component HTML Element Instance */

/**
 * Unwraps element from ref
 * @param elementRef Ref of template node
 */
function unrefElement(elementRef) {
  var _$el2;

  var node = unref(elementRef);
  return (_$el2 = node == null ? void 0 : node.$el) != null ? _$el2 : node;
}
/**
 * Creates a ref whose value updates are debounced
 *
 * @example Simple example
 *
 * ```ts
 * const foo = useDebouncedRef('bar')
 * foo.value = 'baz'
 *
 * // foo.value to be updated to 'baz' after the delay of 300ms
 * ```
 *
 * @example Custom delay
 *
 * ```ts
 * const foo = useDebouncedRef('bar', 500)
 * foo.value = 'baz'
 *
 * // foo.value to be updated to 'baz' after the delay of 500ms
 * ```
 */

function useDebouncedRef(initialValue, delay, immediate) {
  if (delay === void 0) {
    delay = 300;
  }

  if (immediate === void 0) {
    immediate = false;
  }

  var state = ref(initialValue);
  var debouncedRef = customRef(function (track, trigger) {
    return {
      get: function get() {
        track();
        return state.value;
      },
      set: debounce(function (value) {
        state.value = value;
        trigger();
      }, delay, immediate)
    };
  });
  return debouncedRef;
}

/**
 * Computes the selector of an element from the DOM
 *
 * The motivation for this method is to use it in the
 * resolve the issue where DOM nodes seem to be
 * removed from the DOM during patching for reactivity.
 *
 * This was breaking the behaviour of the `useFocusLock`
 * hook.
 *
 * Adopted from stack overflow:
 * https://stackoverflow.com/questions/22515835/javascript-find-selector-of-an-element
 */
function getSelector(node) {
  var id = node.getAttribute('id');
  if (id) return '#' + id;
  var path = '';

  var _loop = function _loop() {
    var name = node.localName;
    var parent = node.parentNode;

    if (!parent) {
      path = name + ' > ' + path;
      return "continue";
    }

    if (node.getAttribute('id')) {
      path = '#' + node.getAttribute('id') + ' > ' + path;
      return "break";
    }

    var sameTagSiblings = [];
    var children = parent.childNodes;
    children = Array.prototype.slice.call(children);
    children.forEach(function (child) {
      // @ts-ignore
      if (child.localName == name) {
        sameTagSiblings.push(child);
      }
    }); // if there are more than one
    // children of that type use nth-of-type

    if (sameTagSiblings.length > 1) {
      var index = sameTagSiblings.indexOf(node);
      name += ':nth-of-type(' + (index + 1) + ')';
    }

    if (path) {
      path = name + ' > ' + path;
    } else {
      path = name;
    }

    node = parent;
  };

  while (node) {
    var _ret = _loop();

    if (_ret === "continue") continue;
    if (_ret === "break") break;
  }

  return path;
}

var vueThemingProps = {
  colorScheme: String,
  variant: String,
  size: String,
  styleConfig: String
};
var SNA = [Number, String, Array];
var SAO = [String, Array, Object];
var SNAO = [Number, String, Array, Object];

export { SAO, SNA, SNAO, createContext, debounce, getSelector, getValidChildren, isObjectComponent, orient, unrefElement, useDebouncedRef, useRef, vueThemingProps };
