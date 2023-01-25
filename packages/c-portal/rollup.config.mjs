import multi from "@rollup/plugin-multi-entry"
import esbuild from "rollup-plugin-esbuild"
import kebabCase from "lodash.kebabcase"

const name = "chakra-ui-c-portal"

const bundle = (config) => ({
  ...config,
  input: ["src/**/*.tsx", "src/**/*.ts"],
  external: (id) => !/^[./]/.test(id),
})

/**
 * @type {import('rollup').RollupOptions[]}
 */
const RollupConfig = [
  bundle({
    plugins: [multi(), esbuild()],
    output: [
      {
        file: `./dist/chakra-ui-c-portal.cjs.js`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `./dist/chakra-ui-c-portal.esm.js`,
        format: "es",
        sourcemap: true,
      },
    ],
  }),
]

export default RollupConfig
