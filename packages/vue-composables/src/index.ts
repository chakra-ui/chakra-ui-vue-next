import { ref, onBeforeMount, onMounted, computed, watch, unref, watchEffect, inject, provide } from 'vue';
import { isString, noop, countDecimalPlaces, toPrecision, clampValue } from '@chakra-ui/utils';
import { tryOnScopeDispose, defaultWindow } from '@chakra-ui/vue-utils';

/**
 * Credit: https://github.com/reach/reach-ui/blob/develop/packages/auto-id/src/index.tsx
 *
 * Why does this hook exist?
 *   1. Accessibiliy APIs rely heavily on element IDs
 *   2. Requiring developers to put IDs on every Chakra component
 *      is cumbersome and error-prone.
 *   3. With a components model, we can generate IDs for them!
 *
 * Solutions to ID problem:
 * 1. Generate random IDs
 *    In v0.x of @chakra-ui/vue, we did this for components.
 *    Since then, we've learned some things about performance for
 *    components especially with SSR.
 *
 *    This may not be a good idea because during server rendering
 *    the IDs will be statically generated, and during client-side hydration,
 *    the IDs may not match, when booting up the Vue App. Vue will then
 *    go ahead and recreate the entire application.
 *
 * 2. Don't server render IDs. Instead patch on client `onMounted`
 *    In this approach, generated ID is an empty string on the first render.
 *    This way the client and server possess the same ID.
 *
 *    When the component is finally mounted, we patch the ID.
 *    This may cause a re-render on the client, but it shouldn't be a
 *    big problem, because:
 *
 *        1. Components using `useId` composable are small
 *        2. With solution 1, it would cause a re-render anyway.
 *        3. This patch only runs once. (Only when the `onMounted` life
 *           -cycle hook is called.)
 *
 */
var serverHandoffComplete = false;
var _id = 0;

var genId = function genId() {
  return ++_id;
};
/**
 * Generates a unique id
 *
 * @param id external ID provided by consumer/user.
 * @param prefix prefix to append before the id
 */


var useId = function useId(id, prefix) {
  var initialId = id || (serverHandoffComplete ? genId() : null);
  var uid = ref(initialId);
  onBeforeMount(function () {
    if (serverHandoffComplete === false) {
      serverHandoffComplete = true;
    }
  });
  onMounted(function () {
    if (uid.value === null) {
      uid.value = genId();
    }
  });
  return computed(function () {
    var __id__ = uid.value !== null ? uid.value.toString() : undefined;

    return prefix ? prefix + "-" + __id__ : __id__;
  });
};
/**
 * Hook to generate ids for use in compound components
 *
 * @param id the external id passed from the user
 * @param prefixes array of prefixes to use
 */

function useIds(id) {
  var __id__ = useId(id);

  for (var _len = arguments.length, prefixes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    prefixes[_key - 1] = arguments[_key];
  }

  return prefixes.map(function (prefix) {
    return computed(function () {
      return prefix + "-" + __id__.value;
    });
  });
}

/**
 * Much of this has ben adopted from the cgood folks at @vueuse/core
 */
function useEventListener() {
  var target;
  var event;
  var listener;
  var options;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (isString(args[0])) {
    event = args[0];
    listener = args[1];
    options = args[2];
    target = defaultWindow;
  } else {
    target = args[0];
    event = args[1];
    listener = args[2];
    options = args[3];
  }

  if (!target) return noop;
  var _cleanup = noop;
  var stopWatch = watch(function () {
    return unref(target);
  }, function (el) {
    _cleanup();

    if (!el) return;
    el.addEventListener(event, listener, options);

    _cleanup = function cleanup() {
      el.removeEventListener(event, listener, options);
      _cleanup = noop;
    };
  }, {
    immediate: true,
    flush: "post"
  });

  var stop = function stop() {
    stopWatch();

    _cleanup();
  };

  tryOnScopeDispose(stop);
  return stop;
}

function useWindowEvent(type, listener, options) {
  if (typeof window === "undefined") return;
  watchEffect(function (onInvalidate) {
    window.addEventListener(type, listener, options);
    onInvalidate(function () {
      window.removeEventListener(type, listener, options);
    });
  });
}

var StackContext = Symbol("ChakraElementStackContext");
var StackMessage;

(function (StackMessage) {
  StackMessage[StackMessage["AddElement"] = 0] = "AddElement";
  StackMessage[StackMessage["RemoveElement"] = 1] = "RemoveElement";
})(StackMessage || (StackMessage = {}));

function useStackContext() {
  return inject(StackContext, function () {});
}
function useElementStack(element) {
  var notify = useStackContext();
  watchEffect(function (onInvalidate) {
    var domElement = element == null ? void 0 : element.value;
    if (!domElement) return;
    notify(StackMessage.AddElement, domElement);
    onInvalidate(function () {
      return notify(StackMessage.RemoveElement, domElement);
    });
  });
}
function useStackProvider(onUpdate) {
  var parentUpdate = useStackContext();

  function notify() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // Notify our layer
    onUpdate == null ? void 0 : onUpdate.apply(void 0, args); // Notify the parent

    parentUpdate.apply(void 0, args);
  }

  provide(StackContext, notify);
}

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function useClipboard(_ref) {
  var source = _ref.source,
      _ref$copyTimeout = _ref.copyTimeout,
      copyTimeout = _ref$copyTimeout === void 0 ? 1000 : _ref$copyTimeout,
      _ref$read = _ref.read,
      read = _ref$read === void 0 ? false : _ref$read;
  var isSupported = Boolean(navigator && "clipboard" in navigator);
  var text = ref("");
  var copied = ref(false);

  var timeout = function timeout() {
    setTimeout(function () {
      copied.value = false;
    }, copyTimeout);
  };

  var events = ["copy", "cut"];

  if (isSupported && read) {
    for (var _iterator = _createForOfIteratorHelperLoose(events), _step; !(_step = _iterator()).done;) {
      var event = _step.value;
      useEventListener(event, updateText);
    }
  }

  function updateText() {
    navigator.clipboard.readText().then(function (value) {
      text.value = value;
    });
  }

  function copy(_x) {
    return _copy.apply(this, arguments);
  }

  function _copy() {
    _copy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_value) {
      var value;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_value === void 0) {
                _value = unref(source);
              }

              value = unref(_value);

              if (!(isSupported && value != null)) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return navigator.clipboard.writeText(value);

            case 5:
              text.value = value;
              copied.value = true;
              timeout();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _copy.apply(this, arguments);
  }

  return {
    copy: copy,
    text: text,
    copied: copied
  };
}

/**
 * Handles common open, close, or toggle scenarios.
 *
 * It can be used to control feedback components such as `Modal`, `AlertDialog`, `Drawer`, etc.
 */
function useDisclosure(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      isOpenProp = _props.isOpen,
      handleClose = _props.onClose,
      handleOpen = _props.onOpen,
      idProp = _props.id,
      defaultIsOpen = _props.defaultIsOpen;
  var isOpenState = ref(defaultIsOpen || false);
  var isOpen = ref(isOpenProp !== undefined ? isOpenProp : isOpenState.value);
  var isControlled = isOpenProp !== undefined;
  var uid = useId();
  var id = computed(function () {
    return idProp != null ? idProp : "disclosure-" + uid.value;
  });

  var close = function close() {
    if (!isControlled) {
      isOpenState.value = false;
    }

    handleClose == null ? void 0 : handleClose();
  };

  var open = function open() {
    if (!isControlled) {
      isOpenState.value = true;
    }

    handleOpen == null ? void 0 : handleOpen();
  };

  var toggle = function toggle() {
    return isOpen.value ? close() : open();
  };

  var buttonProps = computed(function () {
    return {
      "aria-expanded": isOpen.value,
      "aria-controls": id.value,
      onClick: function onClick() {
        toggle();
      }
    };
  });
  var disclosureProps = computed(function () {
    return {
      hidden: !isOpen.value,
      id: id.value
    };
  });
  watchEffect(function () {
    isOpen.value = isOpenState.value;
  });
  return {
    isOpen: isOpen,
    open: open,
    close: close,
    toggle: toggle,
    isControlled: isControlled,
    buttonProps: buttonProps,
    disclosureProps: disclosureProps
  };
}

/**
 * Composable providing step functionality
 */
function useCounter(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      precisionProp = _props.precision,
      _props$defaultValue = _props.defaultValue,
      defaultValue = _props$defaultValue === void 0 ? 0 : _props$defaultValue,
      _props$step = _props.step,
      stepProp = _props$step === void 0 ? 1 : _props$step,
      _props$min = _props.min,
      min = _props$min === void 0 ? Number.MIN_SAFE_INTEGER : _props$min,
      _props$max = _props.max,
      max = _props$max === void 0 ? Number.MAX_SAFE_INTEGER : _props$max,
      _props$keepWithinRang = _props.keepWithinRange,
      keepWithinRange = _props$keepWithinRang === void 0 ? true : _props$keepWithinRang;
  var valueState = ref(function () {
    var _cast;

    if (defaultValue == null) return "";
    return (_cast = cast(defaultValue, stepProp, precisionProp)) != null ? _cast : "";
  }());
  var decimalPlaces = ref(0);
  var precision;

  var update = function update(next) {
    if (next === valueState.value) return;
    valueState.value = toPrecision(parse(next), precision).toString();
  };

  var clamp = function clamp(value) {
    var nextValue = value;

    if (keepWithinRange) {
      nextValue = clampValue(nextValue, min, max);
    }

    return toPrecision(nextValue, precision);
  };

  var increment = function increment(step) {
    if (step === void 0) {
      step = stepProp;
    }

    var next;
    /**
     * Let's follow the native browser behavior for
     * scenarios where the input starts empty ("")
     */

    if (valueState.value === "") {
      /**
       * If `min` is set, native input, starts at the `min`.
       * Else, it starts at `step`
       */
      next = parse(step);
    } else {
      next = parse(valueState.value) + step;
    }

    next = clamp(next);
    update(next);
  };

  var decrement = function decrement(step) {
    if (step === void 0) {
      step = stepProp;
    }

    var next; // Follow native implementation

    if (valueState.value === "") {
      next = parse(-step);
    } else {
      next = parse(valueState.value) - step;
    }

    next = clamp(next);
    update(next);
  };

  var isOutOfRange = ref(false);
  var valueAsNumber = ref(0);
  watchEffect(function () {
    decimalPlaces.value = getDecimalPlaces(parse(valueState.value), stepProp);
    precision = precisionProp != null ? precisionProp : decimalPlaces.value;
    valueAsNumber.value = parse(valueState.value);
    isOutOfRange.value = valueAsNumber.value > max || valueAsNumber.value < min;
  });
  return {
    decrement: decrement,
    increment: increment,
    update: update,
    valueAsNumber: valueAsNumber,
    isOutOfRange: isOutOfRange,
    value: valueState
  };
}

function parse(value) {
  return parseFloat(value.toString().replace(/[^\w.-]+/g, ""));
}

function getDecimalPlaces(value, step) {
  return Math.max(countDecimalPlaces(step), countDecimalPlaces(value));
}

function cast(value, step, precision) {
  var parsedValue = parse(value);
  if (Number.isNaN(parsedValue)) return undefined;
  var decimalPlaces = getDecimalPlaces(parsedValue, step);
  return toPrecision(parsedValue, precision != null ? precision : decimalPlaces);
}

export { StackMessage, useClipboard, useCounter, useDisclosure, useElementStack, useEventListener, useId, useIds, useStackContext, useStackProvider, useWindowEvent };
