import { u as useNuxtApp } from '../server.mjs';

function useHead(input, options) {
  return useNuxtApp()._useHead(input, options);
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

export { _export_sfc as _, useHead as u };
//# sourceMappingURL=_plugin-vue_export-helper.71b45679.mjs.map
