import { defineComponent, inject, computed, provide, Fragment } from 'vue';

defineComponent({
  name: "CThemeProvider",
  props: {
    value: {
      type: [Object],
      default: () => void 0
    }
  },
  setup(props, { slots }) {
    const pluginTheme = inject("$chakraTheme");
    const applicationTheme = computed(() => props.value || pluginTheme);
    provide("$chakraTheme", applicationTheme.value);
    return () => {
      var _a;
      return /* @__PURE__ */ React.createElement(Fragment, null, (_a = slots == null ? void 0 : slots.default) == null ? void 0 : _a.call(slots, { $chakraTheme: props.value }));
    };
  }
});
//# sourceMappingURL=chakra-ui-c-theme-provider.esm.js.map
