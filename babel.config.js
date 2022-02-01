const BABEL_ENV = process.env.BABEL_ENV
const isCommonJS = BABEL_ENV !== undefined && BABEL_ENV === "cjs"
const isESM = BABEL_ENV !== undefined && BABEL_ENV === "esm"

const __TEST__ = process.env.NODE_ENV === "test"

const baseConfig = function (api) {
  api.cache(true)

  const presets = [
    [
      "@babel/env",
      {
        loose: true,
        modules: isCommonJS ? "commonjs" : false,
        targets: {
          esmodules: isESM ? true : undefined,
        },
      },
    ],
    "@babel/preset-typescript",
  ]
  const plugins = ["@vue/babel-plugin-jsx"]

  return {
    presets,
    plugins,
  }
}

const testConfig = {
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: { node: "current" },
          },
        ],
      ],
      plugins: ["@vue/babel-plugin-jsx"],
    },
  },
}

module.exports = __TEST__ ? testConfig : baseConfig
