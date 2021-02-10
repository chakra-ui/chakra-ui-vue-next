module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!lodash.)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '@chakra-ui/vue-test-utils': '<rootDir>/packages/test-utils/src/index.ts',
  },
  snapshotSerializers: [
    '@chakra-ui/vue-test-utils/dist/cjs/snapshot-serializer.js',
  ],
  testMatch: ['**/**/*.test.(js|jsx|ts|tsx)'],
  testEnvironmentOptions: { resources: 'usable' },
  globals: {
    'ts-jest': {
      babelConfig: 'babel.config.js',
    },
  },
}
