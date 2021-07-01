module.exports = {
  transform: {
    // '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(ts|tsx)$': [
      'esbuild-jest',
      {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        sourcemap: true,
        target: 'es2020',
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!@popperjs/.*|lodash.)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '@chakra-ui/vue-test-utils': '<rootDir>/packages/test-utils/src/index.ts',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  snapshotSerializers: [
    '@chakra-ui/vue-test-utils/dist/cjs/snapshot-serializer.js',
  ],
  testMatch: ['**/**/*.test.(js|jsx|ts|tsx)'],
  // globals: {
  //   'ts-jest': {
  //     tsconfig: 'tsconfig.test.json',
  //     babelConfig: {
  //       plugins: ['@vue/babel-plugin-jsx'],
  //     },
  //   },
  // },
}
