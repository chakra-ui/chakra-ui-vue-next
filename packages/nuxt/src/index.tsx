import { defineComponent, h } from 'vue';

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
defineComponent({
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  render() {
    return h(this == null ? void 0 : this.as, __spreadValues(__spreadValues({}, this.$props), this.$attrs), this.$slots.default);
  }
});
//# sourceMappingURL=chakra-ui-nuxt-next.esm.js.map
