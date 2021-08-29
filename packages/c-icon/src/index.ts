import { defineComponent, inject, computed, h } from 'vue';
import { chakra } from '@chakra-ui/vue-system';

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

var fallbackIcon = {
  path: "\n    <g stroke=\"currentColor\" strokeWidth=\"1.5\">\n      <path\n        strokeLinecap=\"round\"\n        fill=\"none\"\n        d=\"M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25\"\n      />\n      <path\n        fill=\"currentColor\"\n        strokeLinecap=\"round\"\n        d=\"M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0\"\n      />\n      <circle fill=\"none\" strokeMiterlimit=\"10\" cx=\"12\" cy=\"12\" r=\"11.25\" />\n    </g>\n  ",
  viewBox: '0 0 24 24'
};
var CIcon = defineComponent({
  props: {
    as: {
      type: [Object, String],
      "default": 'svg'
    },
    name: {
      type: [String]
    },
    size: {
      type: [String],
      "default": '1em'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    var icons = inject('$chakraIcons');
    var icon = computed(function () {
      return (icons == null ? void 0 : icons[props == null ? void 0 : props.name]) || fallbackIcon;
    });
    var vnodeProps = computed(function () {
      return {
        w: props.size,
        h: props.size,
        display: 'inline-block',
        lineHeight: '1em',
        flexShrink: 0,
        color: 'currentColor',
        innerHTML: icon.value.path,
        focusable: false,
        viewBox: icon.value.viewBox || fallbackIcon.viewBox
      };
    });
    return function () {
      return h(chakra(props.as, {
        label: 'icon'
      }), _extends({}, icon.value.attrs || {}, vnodeProps.value, attrs), slots);
    };
  }
});

export { CIcon };
