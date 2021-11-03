import { defineComponent, ref, watch, cloneVNode, createVNode, Transition, computed, mergeProps, onMounted, withDirectives } from 'vue';
import { useRef } from '@chakra-ui/vue-utils';
import { useMotion, MotionDirective, useMotions } from '@vueuse/motion';
import { warn } from '@chakra-ui/utils';
import { chakra } from '@chakra-ui/vue-system';
import { useId } from '@chakra-ui/vue-composables';

var variants = {
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
  scale: {
    initial: {
      scale: 0.8,
      opacity: 0
    },
    enter: {
      scale: 1,
      opacity: 1,
      translateY: 0
    },
    leave: {
      scale: 0.8,
      opacity: 0
    }
  }
};
var CMotion = defineComponent({
  name: 'CMotion',
  props: {
    as: {
      type: [Object, String],
      "default": 'div'
    },
    type: {
      type: String,
      "default": 'fade'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
        _ref.attrs;

    var _useRef = useRef(),
        targetRef = _useRef[0],
        targetNode = _useRef[1];

    var motionInstance = ref();
    watch(targetNode, function (node) {
      if (!node) return;
      motionInstance.value = useMotion(targetNode, variants[props.type]);
    }, {
      immediate: true,
      flush: 'post'
    });

    var onLeave = function onLeave(el, done) {
      motionInstance.value.leave(done);
    };

    return function () {
      var children = undefined;
      var vNodes = slots == null ? void 0 : slots["default"] == null ? void 0 : slots["default"]().filter(function (vnode) {
        return String(vnode.type) !== 'Symbol(Comment)';
      });
      children = vNodes != null && vNodes.length ? cloneVNode(vNodes[0], {
        ref: targetRef
      }) : vNodes;
      return createVNode(Transition, {
        "css": false,
        "mode": "out-in",
        "onLeave": onLeave
      }, {
        "default": function _default() {
          return [children];
        }
      });
    };
  }
});

var TransitionEasings = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1]
};
var TransitionDefaults = {
  enter: {
    duration: 200,
    ease: TransitionEasings.easeOut
  },
  leave: {
    duration: 100,
    ease: TransitionEasings.easeIn
  }
};
/**
 * @todo Allow users to compute and apply their own transitions
 */

var TransitionVariants = {
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
      opacity: 1,
      transition: TransitionDefaults.enter
    },
    leave: {
      opacity: 0,
      transition: TransitionDefaults.leave
    }
  },
  pushLeft: {
    initial: {
      translateX: '-30%'
    },
    enter: {
      translateX: '100%',
      transition: TransitionDefaults.enter
    },
    leave: {
      translateX: '-30%',
      transition: TransitionDefaults.leave
    }
  },
  pushRight: {
    initial: {
      translateX: '30%'
    },
    enter: {
      translateX: '-100%',
      transition: TransitionDefaults.enter
    },
    leave: {
      translateX: '30%',
      transition: TransitionDefaults.leave
    }
  },
  pushUp: {
    initial: {
      translateY: '-30%'
    },
    enter: {
      translateY: '100%',
      transition: TransitionDefaults.enter
    },
    leave: {
      translateY: '-30%',
      transition: TransitionDefaults.leave
    }
  },
  pushDown: {
    initial: {
      translateY: '30%'
    },
    enter: {
      translateY: '-100%',
      transition: TransitionDefaults.enter
    },
    leave: {
      translateY: '30%',
      transition: TransitionDefaults.leave
    }
  },
  slideLeft: {
    position: {
      left: 0,
      top: 0,
      bottom: 0,
      width: '100%'
    },
    initial: {
      translateX: '-100%',
      opacity: 0
    },
    enter: {
      translateX: '0%',
      transition: TransitionDefaults.enter,
      opacity: 1
    },
    leave: {
      translateX: '-100%',
      transition: TransitionDefaults.leave,
      opacity: 0
    }
  },
  slideRight: {
    position: {
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%'
    },
    initial: {
      translateX: '100%',
      opacity: 0
    },
    enter: {
      translateX: '0%',
      transition: TransitionDefaults.enter,
      opacity: 1
    },
    leave: {
      translateX: '100%',
      transition: TransitionDefaults.leave,
      opacity: 0
    }
  },
  slideUp: {
    position: {
      top: 0,
      left: 0,
      right: 0,
      maxWidth: '100vw'
    },
    initial: {
      translateY: '-100%',
      opacity: 0
    },
    enter: {
      translateY: '0%',
      transition: TransitionDefaults.enter,
      opacity: 1
    },
    leave: {
      translateY: '-100%',
      transition: TransitionDefaults.leave,
      opacity: 0
    }
  },
  slideDown: {
    position: {
      bottom: 0,
      left: 0,
      right: 0,
      maxWidth: '100vw'
    },
    initial: {
      translateY: '100%',
      opacity: 0
    },
    enter: {
      translateY: '0%',
      transition: TransitionDefaults.enter,
      opacity: 1
    },
    leave: {
      translateY: '100%',
      transition: TransitionDefaults.leave,
      opacity: 0
    }
  }
};

/** Determines the direction of a given transition */
function slideTransition(options) {
  var _options$direction;

  var side = (_options$direction = options == null ? void 0 : options.direction) != null ? _options$direction : 'right';

  switch (side) {
    case 'right':
      return TransitionVariants.slideRight;

    case 'left':
      return TransitionVariants.slideLeft;

    case 'bottom':
      return TransitionVariants.slideDown;

    case 'top':
      return TransitionVariants.slideUp;

    default:
      return TransitionVariants.slideRight;
  }
}
/** Converts the placement to a transition variant */

function placementToVariant(placement) {
  switch (placement) {
    case 'right':
      return 'slideRight';

    case 'left':
      return 'slideLeft';

    case 'bottom':
      return 'slideDown';

    case 'top':
      return 'slideUp';

    default:
      return 'slideRight';
  }
}

/**
 * @todo Add usePrefersReducedMotion hook to disable animations in the browser
 */

var CAnimatePresence = defineComponent({
  name: 'CAnimatePresence',
  props: {
    as: {
      type: [Object, String],
      "default": 'div'
    },
    type: {
      type: String,
      "default": 'fade'
    },
    variant: Object
  },
  emits: ['leave', 'beforeLeave'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs,
        emit = _ref.emit;

    var _useRef = useRef(),
        targetRef = _useRef[0],
        targetNode = _useRef[1];

    var motionInstance = ref();
    /**
     * If user provides the "variant" prop, we prefer it over the type prop.
     */

    warn({
      condition: !props.variant && !TransitionVariants[props.type],
      message: 'The animate presence component expects either the "variant" or a value for "type" that is an existing preset' + 'Please check to make sure that these values are correct.'
    });
    var variant = computed(function () {
      return props.variant || TransitionVariants[props.type];
    });
    watch(targetNode, function (node) {
      if (!node) return;
      motionInstance.value = useMotion(targetNode, variant.value);
    }, {
      immediate: true,
      flush: 'post'
    });

    var onLeave = function onLeave(el, done) {
      motionInstance.value.leave(done);
      emit('leave', el, done);
    };

    var onBeforeLeave = function onBeforeLeave(el, done) {
      emit('beforeLeave', el, done);
    };

    return function () {
      var children = undefined;
      var vNodes = slots == null ? void 0 : slots["default"] == null ? void 0 : slots["default"]().filter(function (vnode) {
        return String(vnode.type) !== 'Symbol(Comment)';
      });
      children = vNodes != null && vNodes.length ? cloneVNode(vNodes[0], {
        ref: targetRef
      }) : vNodes;
      return createVNode(Transition, mergeProps({
        "css": false,
        "mode": "out-in",
        "onLeave": onLeave,
        "onBeforeLeave": onBeforeLeave
      }, attrs), {
        "default": function _default() {
          return [children];
        }
      });
    };
  }
});

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

/**
 * CCollapse
 *
 * It renders a `span` when it matches the current link. Otherwise,
 * it renders an anchor tag.
 */
var CCollapse = defineComponent({
  name: 'CCollapse',
  props: {
    isOpen: {
      type: Boolean,
      "default": true
    },
    animateOpacity: {
      type: Boolean,
      "default": true
    },
    startingHeight: {
      type: Number,
      "default": 0
    },
    endingHeight: {
      type: [String, Number],
      "default": 'auto'
    },
    unmountOnExit: {
      type: Boolean,
      "default": true
    }
  },
  emits: ['entered', 'left'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs,
        emit = _ref.emit;

    var _useRef = useRef(),
        targetRef = _useRef[0],
        targetNode = _useRef[1];

    var transitionId = useId('collapse-transition');
    var preTransitionHeight = ref(0);
    var collapsedHeight = computed(function () {
      return preTransitionHeight.value || props.endingHeight;
    });
    var variant = computed(function () {
      return {
        leave: _extends({
          overflow: 'hidden',
          height: props.startingHeight
        }, props.animateOpacity && {
          opacity: 0
        }, {
          transition: {
            duration: 200,
            ease: TransitionEasings.easeInOut
          }
        }),
        enter: _extends({
          overflow: 'hidden',
          height: collapsedHeight.value
        }, props.animateOpacity && {
          opacity: 1
        }, {
          transition: {
            duration: 300,
            ease: TransitionEasings.easeInOut
          }
        }),
        initial: _extends({
          overflow: 'hidden',
          height: props.startingHeight
        }, props.animateOpacity && {
          opacity: 0
        }, {
          transition: {
            duration: 200,
            ease: TransitionEasings.easeInOut
          }
        })
      };
    });
    warn({
      condition: Boolean(props.startingHeight > 0 && props.unmountOnExit),
      message: "\"startingHeight\" and \"unmountOnExit\" props are mutually exclusive. You can't use them together"
    });
    /** Handles exit transition */

    var leave = function leave(done) {
      var el = targetNode.value;

      var _getComputedStyle = getComputedStyle(el);
          _getComputedStyle.height;

      requestAnimationFrame(function () {
        var motions = useMotions();
        var instance = motions[transitionId.value];
        instance == null ? void 0 : instance.leave(done);
      });
    };
    /** Handles enter transition */


    var enter = function enter(done) {
      var el = targetNode.value;

      if (el) {
        var _instance$apply;

        el.style.visibility = 'hidden'; // @ts-ignore

        el.style.height = props.endingHeight;

        var _getComputedStyle2 = getComputedStyle(el),
            height = _getComputedStyle2.height; // @ts-ignore


        el.style.height = props.startingHeight;
        el.style.visibility = 'visible';
        var motions = useMotions();
        var instance = motions[transitionId.value];
        instance == null ? void 0 : (_instance$apply = instance.apply(_extends({}, variant.value.enter, {
          height: parseFloat(height)
        }))) == null ? void 0 : _instance$apply.then(done);
      }
    };

    watch(function () {
      return props.isOpen;
    }, function (newVal) {
      if (!newVal && targetNode.value) {
        leave(onDoneLeft);
      } else {
        enter(onDoneEnter);
      }
    });

    var onDoneEnter = function onDoneEnter() {
      emit('entered');
    };

    var onDoneLeft = function onDoneLeft() {
      emit('left');
    };
    /**
     * We first invoke
     * the transition to make sure it's registered
     * inside the `useMotion` plugin.
     * 
     * Visually this does nothing, but it applies
     * the transition and stores it so we can access
     * it using the `useMotions` hook.
     */


    onMounted(function () {
      if (props.isOpen) {
        enter(function () {
          return null;
        });
      } else {
        leave(function () {
          return null;
        });
      }
    });
    return function () {
      var children = slots == null ? void 0 : slots["default"] == null ? void 0 : slots["default"]().filter(function (vnode) {
        return String(vnode.type) !== 'Symbol(Comment)';
      });
      return withDirectives(createVNode(chakra.div, mergeProps(attrs, {
        "ref": targetRef
      }), {
        "default": function _default() {
          return children;
        }
      }), [[MotionDirective(variant.value), transitionId.value]]);
    };
  }
});

export { CAnimatePresence, CCollapse, CMotion, TransitionDefaults, TransitionEasings, TransitionVariants, placementToVariant, slideTransition, variants };
