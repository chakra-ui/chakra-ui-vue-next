import multi from "@rollup/plugin-multi-entry"
import esbuild from "rollup-plugin-esbuild"
import kebabCase from "lodash.kebabcase"

const name = "chakra-ui-c-input"

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
        file: `./dist/chakra-ui-c-input.cjs.js`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `./dist/chakra-ui-c-input.esm.js`,
        format: "es",
        sourcemap: true,
      },
    ],
  }),
]

export default RollupConfig
