import { isObject, filterUndefined, canUseDOM, getAllFocusable } from '@chakra-ui/utils';
export { canUseDOM } from '@chakra-ui/utils';
import { isVNode, provide, inject, ref, onBeforeUpdate, unref, customRef, computed, getCurrentScope, onScopeDispose } from 'vue';
import camelCase$1 from 'lodash.camelcase';
import { isStyleProp } from '@chakra-ui/styled-system';
import memoize from 'lodash.memoize';

function createContext(options = {}, defaults) {
  const {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name
  } = options;
  let contextSymbol = Symbol(`${name}Symbol`);
  function Provider(payload) {
    provide(contextSymbol, payload);
  }
  function useContext(fallback = null) {
    const context = inject(contextSymbol, fallback);
    if (!context && strict) {
      throw new Error(errorMessage);
    }
    return context;
  }
  return [
    Provider,
    useContext,
    contextSymbol
  ];
}
function getValidChildren(slots) {
  var _a;
  const slotArray = ((_a = slots == null ? void 0 : slots.default) == null ? void 0 : _a.call(slots)) || [];
  return slotArray.filter((child) => {
    return isVNode(child);
  });
}
function isObjectComponent(subject) {
  const validComponentTypes = ["function", "object"];
  if (!validComponentTypes.includes(typeof subject))
    return false;
  if (isObject(subject)) {
    if (typeof (subject == null ? void 0 : subject.render) === "function" && isVNode(subject.render()))
      return true;
    else if (typeof (subject == null ? void 0 : subject.setup) === "function")
      return true;
  }
  return false;
}

function orient(options) {
  const { orientation, vertical, horizontal } = options;
  if (!orientation)
    return {};
  return orientation === "vertical" ? vertical : horizontal;
}

function debounce(func, wait, immediate) {
  let timeout;
  return (...args) => {
    if (immediate && !timeout)
      func(...args);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

function useRef() {
  const refEl = ref(null);
  onBeforeUpdate(() => {
    refEl.value = null;
  });
  const _ref = (el) => {
    var _a;
    refEl.value = (_a = el == null ? void 0 : el.$el) != null ? _a : el;
  };
  return [_ref, refEl];
}
function unrefElement(elementRef) {
  var _a;
  const node = unref(elementRef);
  return (_a = node == null ? void 0 : node.$el) != null ? _a : node;
}
function useDebouncedRef(initialValue, delay = 300, immediate = false) {
  const state = ref(initialValue);
  const debouncedRef = customRef((track, trigger) => ({
    get() {
      track();
      return state.value;
    },
    set: debounce((value) => {
      state.value = value;
      trigger();
    }, delay, immediate)
  }));
  return debouncedRef;
}
function contains(containers, element) {
  for (let container of containers) {
    if (container.contains(element))
      return true;
  }
  return false;
}

function getSelector(node) {
  const id = node.getAttribute("id");
  if (id)
    return "#" + id;
  let path = "";
  while (node) {
    let name = node.localName;
    const parent = node.parentNode;
    if (!parent) {
      path = name + " > " + path;
      continue;
    }
    if (node.getAttribute("id")) {
      path = "#" + node.getAttribute("id") + " > " + path;
      break;
    }
    const sameTagSiblings = [];
    let children = parent.childNodes;
    children = Array.prototype.slice.call(children);
    children.forEach((child) => {
      if (child.localName == name) {
        sameTagSiblings.push(child);
      }
    });
    if (sameTagSiblings.length > 1) {
      const index = sameTagSiblings.indexOf(node);
      name += ":nth-of-type(" + (index + 1) + ")";
    }
    if (path) {
      path = name + " > " + path;
    } else {
      path = name;
    }
    node = parent;
  }
  return path;
}

const vueThemingProps = {
  colorScheme: String,
  variant: String,
  size: String,
  styleConfig: String
};
const SNA = [Number, String, Array];
const SAO = [String, Array, Object];
const SNAO = [Number, String, Array, Object];
const useThemingProps = (props) => computed(() => filterUndefined({
  colorScheme: props.colorScheme,
  variant: props.variant,
  size: props.size,
  styleConfig: props.styleConfig
}));

function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

const defaultWindow = canUseDOM() ? window : null;

function match(value, lookup, ...args) {
  if (value in lookup) {
    let returnValue = lookup[value];
    return typeof returnValue === "function" ? returnValue(...args) : returnValue;
  }
  let error = new Error(`Tried to handle "${value}" but there is no handler defined. Only defined handlers are: ${Object.keys(lookup).map((key) => `"${key}"`).join(", ")}.`);
  if (Error.captureStackTrace)
    Error.captureStackTrace(error, match);
  throw error;
}

var Keys;
(function(Keys2) {
  Keys2["Space"] = " ";
  Keys2["Enter"] = "Enter";
  Keys2["Escape"] = "Escape";
  Keys2["Backspace"] = "Backspace";
  Keys2["ArrowLeft"] = "ArrowLeft";
  Keys2["ArrowUp"] = "ArrowUp";
  Keys2["ArrowRight"] = "ArrowRight";
  Keys2["ArrowDown"] = "ArrowDown";
  Keys2["Home"] = "Home";
  Keys2["End"] = "End";
  Keys2["PageUp"] = "PageUp";
  Keys2["PageDown"] = "PageDown";
  Keys2["Tab"] = "Tab";
})(Keys || (Keys = {}));

var Focus;
(function(Focus2) {
  Focus2[Focus2["First"] = 1] = "First";
  Focus2[Focus2["Previous"] = 2] = "Previous";
  Focus2[Focus2["Next"] = 4] = "Next";
  Focus2[Focus2["Last"] = 8] = "Last";
  Focus2[Focus2["WrapAround"] = 16] = "WrapAround";
  Focus2[Focus2["NoScroll"] = 32] = "NoScroll";
})(Focus || (Focus = {}));
var FocusResult;
(function(FocusResult2) {
  FocusResult2[FocusResult2["Error"] = 0] = "Error";
  FocusResult2[FocusResult2["Overflow"] = 1] = "Overflow";
  FocusResult2[FocusResult2["Success"] = 2] = "Success";
  FocusResult2[FocusResult2["Underflow"] = 3] = "Underflow";
})(FocusResult || (FocusResult = {}));
var Direction;
(function(Direction2) {
  Direction2[Direction2["Previous"] = -1] = "Previous";
  Direction2[Direction2["Next"] = 1] = "Next";
})(Direction || (Direction = {}));
function focusElement(element) {
  element == null ? void 0 : element.focus({ preventScroll: true });
}
function focusIn(container, focus) {
  let elements = Array.isArray(container) ? container.slice().sort((a, z) => {
    let position = a.compareDocumentPosition(z);
    if (position & Node.DOCUMENT_POSITION_FOLLOWING)
      return -1;
    if (position & Node.DOCUMENT_POSITION_PRECEDING)
      return 1;
    return 0;
  }) : (() => {
    const focusables = getAllFocusable(container).filter((el) => el !== container);
    return focusables;
  })();
  let active = document.activeElement;
  let direction = (() => {
    if (focus & (1 | 4))
      return 1;
    if (focus & (2 | 8))
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })();
  let startIndex = (() => {
    if (focus & 1)
      return 0;
    if (focus & 2)
      return Math.max(0, elements.indexOf(active)) - 1;
    if (focus & 4)
      return Math.max(0, elements.indexOf(active)) + 1;
    if (focus & 8)
      return elements.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })();
  let focusOptions = focus & 32 ? { preventScroll: true } : {};
  let offset = 0;
  let total = elements.length;
  let next = void 0;
  do {
    if (offset >= total || offset + total <= 0)
      return 0;
    let nextIdx = startIndex + offset;
    if (focus & 16) {
      nextIdx = (nextIdx + total) % total;
    } else {
      if (nextIdx < 0)
        return 3;
      if (nextIdx >= total)
        return 1;
    }
    next = elements[nextIdx];
    next == null ? void 0 : next.focus(focusOptions);
    offset += direction;
  } while (next !== document.activeElement);
  if (!next.hasAttribute("tabindex"))
    next.setAttribute("tabindex", "0");
  return 2;
}

const camelCaseCache = {};
const _isStyledProp = memoize((attr) => isStyleProp(attr));
const extractStyleAttrs = (styleProps) => {
  const styles = {};
  const attrs = {};
  for (const prop in styleProps) {
    let _attr;
    if (camelCaseCache[prop]) {
      _attr = camelCaseCache[prop];
    } else {
      _attr = `${prop.startsWith("_") ? "_" : ""}${camelCase$1(prop)}`;
      camelCaseCache[prop] = _attr;
    }
    if (_isStyledProp(_attr)) {
      styles[_attr] = styleProps[prop];
    } else if (_isStyledProp(prop)) {
      styles[_attr] = styleProps[prop];
    } else {
      attrs[prop] = styleProps[prop];
    }
  }
  return {
    styles,
    attrs
  };
};

function genId(size = 3) {
  let uuid = "";
  const dictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < size; i++) {
    uuid += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
  }
  if (process.env.NODE_ENV === "test")
    return "EMPTY_STRING";
  return uuid;
}

const camelCase = memoize((key) => camelCase$1(key));

export { Focus, FocusResult, Keys, SAO, SNA, SNAO, camelCase, contains, createContext, debounce, defaultWindow, extractStyleAttrs, focusElement, focusIn, genId, getSelector, getValidChildren, isObjectComponent, match, orient, tryOnScopeDispose, unrefElement, useDebouncedRef, useRef, useThemingProps, vueThemingProps };
//# sourceMappingURL=chakra-ui-vue-utils.esm.js.map
