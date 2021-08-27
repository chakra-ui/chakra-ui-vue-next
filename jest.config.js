module.exports = {
  transform: {
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
  snapshotSerializers: ['@chakra-ui/vue-test-utils/src/snapshot-serializer.ts'],
  testMatch: ['**/**/*.test.(js|jsx|ts|tsx)'],
}
