module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": [
      "esbuild-jest",
      {
        jsxFactory: "h",
        jsxFragment: "Fragment",
        sourcemap: true,
        target: "es2020",
      },
    ],
  },
  setupFiles: ["./jest.setup.ts"],
  transformIgnorePatterns: [
    "/node_modules/(?!@popperjs/.*|lodash.|!.pnpm/@popperjs)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "@chakra-ui/vue-test-utils": "<rootDir>/packages/test-utils",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  snapshotSerializers: [
    "<rootDir>/packages/test-utils/src/snapshot-serializer.ts",
  ],
  testMatch: ["**/**/*.test.(js|jsx|ts|tsx)"],
}
