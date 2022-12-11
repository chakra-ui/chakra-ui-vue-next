import { getCurrentInstance, computed, unref, ref, watch, watchEffect, defineComponent, mergeProps, reactive, toRefs, onErrorCaptured, h, withDirectives, createVNode, isVNode } from 'vue';
import { useMultiStyleConfig, StylesProvider, chakra, useStyles, useTheme } from '@chakra-ui/vue-system';
import { useRef, createContext } from '@chakra-ui/vue-utils';
import { CPortal } from '@chakra-ui/c-portal';
import { CAnimatePresence, CMotion, slideTransition, placementToVariant, TransitionVariants } from '@chakra-ui/c-motion';
import { CCloseButton } from '@chakra-ui/c-close-button';
import { MotionDirective, useMotions } from '@vueuse/motion';
import { useIds, useId } from '@chakra-ui/vue-composables';
import { useReturnFocusSelector, useFocusTrap } from '@chakra-ui/c-focus-lock';
import { useInertOthers } from '@chakra-ui/vue-a11y';
import { isFunction, focus } from '@chakra-ui/utils';

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
 * Modal hook to manage accessibility and state for the modal
 * dialog components
 * @param options
 * @returns
 */
function useModal(options) {
  var handleEscape = options.handleEscape,
      closeModal = options.closeModal;
  var modelValue = options.modelValue,
      id = options.id,
      closeOnOverlayClick = options.closeOnOverlayClick,
      closeOnEsc = options.closeOnEsc,
      initialFocusRef = options.initialFocusRef,
      finalFocusRef = options.finalFocusRef,
      useInert = options.useInert;
  var instance = getCurrentInstance();
  var finalFocusElement = computed(function () {
    var finalFocus;

    if (finalFocusRef) {
      var resolvedFinalFocusRef = isFunction(finalFocusRef) ? finalFocusRef() : finalFocusRef.name;

      if (typeof resolvedFinalFocusRef === "string") {
        finalFocus = document.querySelector(resolvedFinalFocusRef);
      } else {
        finalFocus = (resolvedFinalFocusRef == null ? void 0 : resolvedFinalFocusRef.$el) || resolvedFinalFocusRef;
      }
    }

    return finalFocus;
  });
  var initialFocusElement = computed(function () {
    var initialFocus;

    if (initialFocusRef != null && initialFocusRef.value) {
      var resolvedInitialFocusRef = typeof (initialFocusRef == null ? void 0 : initialFocusRef.value) === "function" ? initialFocusRef == null ? void 0 : initialFocusRef.value() : initialFocusRef == null ? void 0 : initialFocusRef.value;
      resolvedInitialFocusRef = unref(resolvedInitialFocusRef);

      if (typeof resolvedInitialFocusRef === "string") {
        initialFocus = document.querySelector(resolvedInitialFocusRef);
      } else {
        var _resolvedInitialFocus;

        initialFocus = ((_resolvedInitialFocus = resolvedInitialFocusRef) == null ? void 0 : _resolvedInitialFocus.$el) || resolvedInitialFocusRef;
      }
    }

    return initialFocus;
  }); // DOM refs

  var _useRef = useRef(),
      dialogRef = _useRef[0],
      dialogRefEl = _useRef[1];

  var _useRef2 = useRef(),
      overlayRef = _useRef2[0];
      _useRef2[1];
  /** We use this element to keep track of the currently clicked element */


  var mouseDownTarget = ref(null);
  /**
   * Creates IDs for the dialog elements
   */

  var _useIds = useIds(id == null ? void 0 : id.value, "chakra-modal", "chakra-modal--header", "chakra-modal--body"),
      dialogId = _useIds[0],
      headerId = _useIds[1],
      bodyId = _useIds[2];

  var _useReturnFocusSelect = useReturnFocusSelector(modelValue),
      lastFocusedSelector = _useReturnFocusSelect.lastFocusedSelector;

  var hasHeader = ref(false);
  var hasBody = ref(false);
  /**
   * This watcher is being used to track
   * the element refs for the dialog container
   * element.
   */

  watch(dialogRefEl, function (newVal) {
    if (!newVal) {
      setTimeout(function () {
        var lastfocusedNode = document.querySelector(lastFocusedSelector.value);

        if (finalFocusElement.value) {
          focus(finalFocusElement.value);
        } else {
          focus(lastfocusedNode);
        }
      }, 100);
    }
  });
  var containers = ref(new Set());
  watchEffect(function (onInvalidate) {
    var el;

    if (dialogRefEl.value) {
      el = dialogRefEl.value;
      containers.value.add(el);
    }

    onInvalidate(function () {
      containers.value["delete"](el);
    });
  }, {
    flush: "post"
  });
  useFocusTrap(containers, ref(true), computed(function () {
    return {
      initialFocus: initialFocusElement.value
    };
  }));
  /**
   * Dialog props
   */

  var dialogProps = computed(function () {
    return function (_ref) {
      var emit = _ref.emit;
      return {
        role: "dialog",
        ref: dialogRef,
        id: dialogId.value,
        tabIndex: -1,
        "aria-modal": true,
        "aria-labelledby": hasHeader.value ? headerId.value : null,
        "aria-describedby": hasBody.value ? bodyId.value : null,
        onClick: function onClick(event) {
          event.stopPropagation();
          emit("click", event);
        }
      };
    };
  });

  var handleOverlayClick = function handleOverlayClick(event) {
    event.stopPropagation(); // @click.self modifier

    if (event.target !== event.currentTarget) return;

    if (closeOnOverlayClick != null && closeOnOverlayClick.value) {
      closeModal();
    }
  };

  var onKeyDown = function onKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation();

      if (closeOnEsc) {
        closeModal();
      }

      handleEscape(event);
    }
  };
  /** Dialog container props */


  var dialogContainerProps = computed(function () {
    return function (_ref2) {
      var emit = _ref2.emit;
      return {
        ref: overlayRef,
        onClick: function onClick(event) {
          instance == null ? void 0 : instance.emit("update:modelValue", !modelValue.value);
          instance == null ? void 0 : instance.emit("closeModal");
          handleOverlayClick(event);
        },
        onKeydown: function onKeydown(event) {
          emit("keydown", event);
          onKeyDown(event);
        },
        onMousedown: function onMousedown(event) {
          mouseDownTarget.value = event.target;
          emit("mousedown", event);
        }
      };
    };
  });
  /**
   * `aria-hidden` attributes handling
   * @see useAriaHidden
   */

  var shouldHide = computed(function () {
    return modelValue.value && (useInert == null ? void 0 : useInert.value) || false;
  }); // useAriaHidden(dialogRefEl, shouldHide)

  useInertOthers(dialogRefEl, shouldHide);
  return {
    modelValue: modelValue,
    headerId: headerId,
    bodyId: bodyId,
    dialogRef: dialogRef,
    dialogRefEl: dialogRefEl,
    overlayRef: overlayRef,
    dialogProps: dialogProps,
    hasHeader: hasHeader,
    hasBody: hasBody,
    dialogContainerProps: dialogContainerProps
  };
}

var TransitionEasings = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1]
};
var TransitionDefaults = {
  enter: {
    duration: 100,
    ease: TransitionEasings.easeOut
  },
  leave: {
    duration: 200,
    ease: TransitionEasings.easeIn
  }
};
var dialogMotionPresets = {
  slideInBottom: {
    initial: {
      opacity: 0,
      translateY: 10
    },
    enter: {
      opacity: 1,
      translateY: 0
    },
    leave: {
      opacity: 0,
      translateY: 10
    }
  },
  slideInRight: {
    initial: {
      opacity: 0,
      translateX: 10
    },
    enter: {
      opacity: 1,
      translateX: 0
    },
    leave: {
      opacity: 0,
      translateX: 10
    }
  },
  scale: {
    initial: {
      scale: 0.95,
      opacity: 0
    },
    enter: {
      scale: 1,
      transition: TransitionDefaults.enter,
      opacity: 1
    },
    leave: {
      scale: 0.95,
      transition: TransitionDefaults.leave,
      opacity: 0
    }
  },
  fade: {
    initial: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    }
  },
  none: {}
};

var _createContext$1 = createContext({
  strict: true,
  name: "ModalContext",
  errorMessage: "useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<CModal />`"
}),
    ModalContextProvider = _createContext$1[0],
    useModalContext = _createContext$1[1];
var modalProps = {
  modelValue: {
    type: Boolean,
    "default": false
  },
  id: String,
  closeOnOverlayClick: {
    type: Boolean,
    "default": true
  },
  closeOnEsc: {
    type: Boolean,
    "default": true
  },
  useInert: {
    type: Boolean,
    "default": true
  },
  autoFocus: {
    type: Boolean,
    "default": true
  },
  trapFocus: {
    type: Boolean,
    "default": true
  },
  initialFocusRef: [String, Object, Function],
  finalFocusRef: [String, Object, Function],
  returnFocusOnClose: {
    type: Boolean,
    "default": true
  },
  blockScrollOnMount: {
    type: Boolean,
    "default": true
  },
  allowPinchZoom: Boolean,
  preserveScrollBarGap: Boolean,
  scrollBehaviour: {
    type: String,
    "default": "outside"
  },
  motionPreset: {
    type: String,
    "default": "scale"
  },
  "onUpdate:modelValue": {
    type: Function
  },
  label: {
    type: String,
    "default": "modal"
  }
};
var CModal = defineComponent({
  name: "CModal",
  props: modalProps,
  emits: ["update:modelValue", "escape", "closeModal"],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs,
        emit = _ref.emit;

    var closeModal = function closeModal() {
      emit("closeModal", false);
      emit("update:modelValue", false);
    };

    var handleEscape = function handleEscape(event) {
      emit("escape", event);
      emit("closeModal", false);
    };

    var mergedProps = computed(function () {
      return mergeProps(props, attrs);
    });
    var styles = useMultiStyleConfig("Modal", mergedProps);
    var modalOptions = reactive(_extends({}, toRefs(reactive(props)), {
      closeModal: closeModal,
      handleEscape: handleEscape
    })); // @ts-expect-error

    var modal = useModal(modalOptions);
    ModalContextProvider(computed(function () {
      return _extends({}, modal, toRefs(reactive(props)), {
        closeModal: closeModal
      });
    }));
    onErrorCaptured(function (error, target) {
      console.error("ChakraModalCapturedError", error, target);
    });
    StylesProvider(styles);
    return function () {
      return h(CPortal, {
        label: props.label
      }, function () {
        return [// props.modelValue && h(chakra('span'), () => slots?.default?.()),
        h(CAnimatePresence, {
          type: props.motionPreset
        }, function () {
          return [props.modelValue && h(chakra("span"), function () {
            return slots == null ? void 0 : slots["default"] == null ? void 0 : slots["default"]();
          })];
        })];
      });
    };
  }
});

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */
var CModalContent = defineComponent({
  name: "CModalContent",
  inheritAttrs: false,
  emits: ["click", "mousedown", "keydown"],
  setup: function setup(_, _ref2) {
    var attrs = _ref2.attrs,
        slots = _ref2.slots,
        emit = _ref2.emit;

    var _unref = unref(useModalContext()),
        dialogContainerProps = _unref.dialogContainerProps,
        dialogProps = _unref.dialogProps,
        blockScrollOnMount = _unref.blockScrollOnMount,
        modelValue = _unref.modelValue,
        motionPreset = _unref.motionPreset;

    var styles = useStyles();
    var transitionId = useId("modal-content");
    /** Handles exit transition */

    var leave = function leave(done) {
      var motions = useMotions();
      var instance = motions[transitionId.value];
      instance == null ? void 0 : instance.leave(function () {
        done();
      });
    };

    watch(modelValue, function (newVal) {
      if (!newVal) {
        leave(function () {
          return null;
        });
      }
    }); // Scroll lock

    watchEffect(function (onInvalidate) {
      if (!blockScrollOnMount.value) return;
      if (modelValue.value !== true) return;
      var overflow = document.documentElement.style.overflow;
      var paddingRight = document.documentElement.style.paddingRight;
      var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.paddingRight = scrollbarWidth + "px";
      onInvalidate(function () {
        document.documentElement.style.overflow = overflow;
        document.documentElement.style.paddingRight = paddingRight;
      });
    });
    var dialogContainerStyles = computed(function () {
      return _extends({
        display: "flex",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0
      }, styles.value.dialogContainer);
    });
    var dialogStyles = computed(function () {
      return _extends({
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
        outline: 0
      }, styles.value.dialog);
    });
    return function () {
      return h(chakra("div", {
        label: "modal__content-container",
        __css: dialogContainerStyles.value
      }), dialogContainerProps.value({
        emit: emit
      }), function () {
        return [modelValue.value && withDirectives(h(chakra("section", {
          __css: dialogStyles.value,
          label: "modal__content"
        }), _extends({}, dialogProps.value({
          emit: emit
        }), attrs), slots), [[MotionDirective(dialogMotionPresets[motionPreset == null ? void 0 : motionPreset.value]), transitionId.value]])];
      });
    };
  }
});
/**
 * CModalOverlay renders a backdrop behind the modal. It is
 * also used as a wrapper for the modal content for better positioning.
 *
 * @see Docs https://next.chakra-ui.com/docs/overlay/modal
 */

var CModalOverlay = defineComponent({
  name: "CModalOverlay",
  setup: function setup(_, _ref3) {
    var attrs = _ref3.attrs;
    var styles = useStyles();
    var overlayStyle = computed(function () {
      return _extends({
        pos: "fixed",
        left: "0",
        top: "0",
        w: "100vw",
        h: "100vh"
      }, styles.value.overlay);
    });
    return function () {
      return h(CMotion, {
        type: "fade"
      }, function () {
        return [h(chakra("div", {
          label: "modal__overlay",
          __css: overlayStyle.value
        }), attrs)];
      });
    };
  }
});
/**
 * CModalHeader
 *
 * Component that houses the title of the modal.
 *
 * @see Docs https://next.vue.chakra-ui.com/docs/components/modal
 */

var CModalHeader = defineComponent({
  name: "CModalHeader",
  setup: function setup(_, _ref4) {
    var attrs = _ref4.attrs,
        slots = _ref4.slots;

    var _unref2 = unref(useModalContext()),
        hasHeader = _unref2.hasHeader,
        headerId = _unref2.headerId;

    var styles = useStyles();
    var headerStyles = computed(function () {
      return _extends({
        flex: 0
      }, styles.value.header);
    });

    var _useRef = useRef(),
        headerRef = _useRef[0],
        headerEl = _useRef[1];

    watch(headerEl, function (el) {
      hasHeader.value = !!el;
    });
    return function () {
      return h(chakra("header", {
        label: "modal__header",
        __css: headerStyles.value
      }), _extends({}, attrs, {
        ref: headerRef,
        id: headerId.value
      }), slots);
    };
  }
});
/**
 * CModalBody
 *
 * Component that houses the body of the modal.
 *
 * @see Docs https://next.vue.chakra-ui.com/docs/components/modal
 */

var CModalBody = defineComponent({
  name: "CModalBody",
  setup: function setup(_, _ref5) {
    var slots = _ref5.slots,
        attrs = _ref5.attrs;

    var _unref3 = unref(useModalContext()),
        bodyId = _unref3.bodyId,
        hasBody = _unref3.hasBody;

    var styles = useStyles();

    var _useRef2 = useRef(),
        bodyRef = _useRef2[0],
        bodyEl = _useRef2[1];
    /**
     * Used to bind the `aria-descibedby` attribute
     */


    watch(bodyEl, function (el) {
      hasBody.value = !!el;
    });
    return function () {
      return h(chakra("div", {
        label: "modal__body",
        __css: styles.value.body
      }), _extends({
        id: bodyId.value
      }, attrs, {
        ref: bodyRef
      }), slots);
    };
  }
});
/**
 * CModalFooter
 *
 * Component that houses the footer of the modal.
 *
 * @see Docs https://next.vue.chakra-ui.com/docs/components/modal
 */

var CModalFooter = defineComponent({
  name: "CModalFooter",
  setup: function setup(_, _ref6) {
    var slots = _ref6.slots,
        attrs = _ref6.attrs;
    var styles = useStyles();
    var footerStyles = computed(function () {
      return _extends({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end"
      }, styles.value.footer);
    });
    return function () {
      return h(chakra("div", {
        label: "modal__body",
        __css: footerStyles.value
      }), attrs, slots);
    };
  }
});
/**
 * CModalCloseButton
 *
 * Used to close the modal. It internally invokes the `closeModal` event,
 * but also emits the `@click` event to the user.
 *
 * @see Docs https://next.vue.chakra-ui.com/docs/components/modal
 */

var CModalCloseButton = defineComponent({
  name: "CModalCloseButton",
  emits: ["click"],
  setup: function setup(_, _ref7) {
    var attrs = _ref7.attrs,
        emit = _ref7.emit;

    var _unref4 = unref(useModalContext()),
        closeModal = _unref4.closeModal;

    var styles = useStyles();
    return function () {
      return h(chakra(CCloseButton, {
        label: "modal__close-button",
        __css: styles.value.closeButton
      }), _extends({}, attrs, {
        onClick: function onClick(e) {
          closeModal();
          emit("click", e);
        }
      }));
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

var _excluded$1 = ["modelValue", "onUpdate:modelValue"];

function _isSlot$1(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

var _createContext = createContext(),
    CDrawerContextProvider = _createContext[0],
    useDrawerContext = _createContext[1];

var CDrawer = defineComponent({
  name: "CDrawer",
  props: _extends({}, modalProps, {
    placement: {
      type: String,
      "default": "right"
    },
    isFullHeight: Boolean
  }),
  emits: ["update:modelValue", "close", "escape"],
  setup: function setup(props, _ref) {
    var _theme$components;

    var slots = _ref.slots,
        attrs = _ref.attrs,
        emit = _ref.emit;
    var isOpen = computed(function () {
      return props.modelValue;
    });

    var handleUpdateModelValue = function handleUpdateModelValue(val) {
      emit("update:modelValue", val);
    };

    var context = computed(function () {
      return {
        placement: props.placement,
        motionPreset: "scale"
      };
    });
    var theme = useTheme();
    var drawerStyleConfig = (_theme$components = theme.components) == null ? void 0 : _theme$components.Drawer;
    CDrawerContextProvider(context);
    return function () {
      props.modelValue;
          props["onUpdate:modelValue"];
          var rest = _objectWithoutPropertiesLoose(props, _excluded$1);

      return createVNode(CModal, mergeProps(rest, attrs, {
        "modelValue": isOpen.value,
        "onUpdate:modelValue": handleUpdateModelValue,
        "label": "drawer",
        "styleConfig": drawerStyleConfig
      }), _isSlot$1(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});
var CDrawerContent = defineComponent({
  name: "CDrawerContent",
  inheritAttrs: false,
  emits: ["click", "mousedown", "keydown"],
  setup: function setup(_, _ref2) {
    var attrs = _ref2.attrs,
        slots = _ref2.slots,
        emit = _ref2.emit;

    var _unref = unref(useModalContext()),
        rawDialogContainerProps = _unref.dialogContainerProps,
        rawDialogProps = _unref.dialogProps,
        modelValue = _unref.modelValue,
        blockScrollOnMount = _unref.blockScrollOnMount;

    var transitionId = useId("drawer-transition");
    var containerProps = computed(function () {
      return rawDialogContainerProps.value({
        emit: emit
      });
    });
    var dialogProps = computed(function () {
      return rawDialogProps.value({
        emit: emit
      });
    });

    var _unref2 = unref(useDrawerContext()),
        placement = _unref2.placement; // Styles


    var styles = useStyles();
    var dialogContainerStyles = computed(function () {
      return _extends({
        display: "flex",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0
      }, styles.value.dialogContainer);
    });
    var dialogStyles = computed(function () {
      return _extends({
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
        outline: 0
      }, styles.value.dialog);
    }); // Scroll lock

    watchEffect(function (onInvalidate) {
      if (!blockScrollOnMount.value) return;
      if (modelValue.value !== true) return;
      var overflow = document.documentElement.style.overflow;
      var paddingRight = document.documentElement.style.paddingRight;
      var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.paddingRight = scrollbarWidth + "px";
      onInvalidate(function () {
        document.documentElement.style.overflow = overflow;
        document.documentElement.style.paddingRight = paddingRight;
      });
    });
    /** Handles exit transition */

    var leave = function leave(done) {
      var motions = useMotions();
      var instance = motions[transitionId.value];
      instance == null ? void 0 : instance.leave(function () {
        done();
      });
    };

    watch(modelValue, function (newVal) {
      if (!newVal) {
        leave(function () {
          return null;
        });
      }
    });
    var transitionStyles = computed(function () {
      var transitionStyles = slideTransition({
        direction: placement
      });
      var result = Object.assign({
        position: "fixed"
      }, transitionStyles.position);
      return result;
    });
    var transitionVariant = computed(function () {
      return placementToVariant(placement);
    });
    return function () {
      return createVNode(chakra.div, mergeProps(containerProps.value, {
        "__label": "modal__content-container",
        "__css": dialogContainerStyles.value
      }), {
        "default": function _default() {
          return [modelValue.value && withDirectives(createVNode(chakra.section, mergeProps(dialogProps.value, {
            "style": transitionStyles.value,
            "__css": dialogStyles.value
          }, attrs), _isSlot$1(slots) ? slots : {
            "default": function _default() {
              return [slots];
            }
          }), [[MotionDirective(TransitionVariants[transitionVariant.value]), transitionId.value]])];
        }
      });
    };
  }
});

var _excluded = ["modelValue", "onUpdate:modelValue"];

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}

/**
 * CAlertDialog
 * Data wrapper for the alert dialog component
 */
var CAlertDialog = defineComponent({
  name: "CAlertDialog",
  props: _extends({}, modalProps, {
    leastDestructiveRef: [Function, String]
  }),
  emits: ["update:modelValue", "close", "escape"],
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots,
        emit = _ref.emit;
    var isOpen = computed(function () {
      return props.modelValue;
    });

    var handleUpdateModelValue = function handleUpdateModelValue(val) {
      emit("update:modelValue", val);
    };

    return function () {
      props.modelValue;
          props["onUpdate:modelValue"];
          var rest = _objectWithoutPropertiesLoose(props, _excluded);

      return createVNode(CModal, mergeProps(rest, attrs, {
        "modelValue": isOpen.value,
        "onUpdate:modelValue": handleUpdateModelValue,
        "label": "alertdialog",
        "initialFocusRef": props.leastDestructiveRef
      }), _isSlot(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});
/**
 * CAlertDialogContent
 * Wrapper for the alert dialog content
 */

var CAlertDialogContent = defineComponent({
  name: "CAlertDialogContent",
  inheritAttrs: false,
  setup: function setup(_, _ref2) {
    var attrs = _ref2.attrs,
        slots = _ref2.slots;
    return function () {
      return createVNode(CModalContent, mergeProps(attrs, {
        "role": "alertdialog"
      }), _isSlot(slots) ? slots : {
        "default": function _default() {
          return [slots];
        }
      });
    };
  }
});

export { CAlertDialog, CModalBody as CAlertDialogBody, CModalCloseButton as CAlertDialogCloseButton, CAlertDialogContent, CModalFooter as CAlertDialogFooter, CModalHeader as CAlertDialogHeader, CModalOverlay as CAlertDialogOverlay, CDrawer, CModalBody as CDrawerBody, CModalCloseButton as CDrawerCloseButton, CDrawerContent, CModalFooter as CDrawerFooter, CModalHeader as CDrawerHeader, CModalOverlay as CDrawerOverlay, CModal, CModalBody, CModalCloseButton, CModalContent, CModalFooter, CModalHeader, CModalOverlay, ModalContextProvider, modalProps, useModalContext };
