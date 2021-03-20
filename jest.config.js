module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest/dist',
  },
  transformIgnorePatterns: ['/node_modules/(?!@popperjs/.*|lodash.)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '@chakra-ui/vue-test-utils': '<rootDir>/packages/test-utils/src/index.ts',
  },
  snapshotSerializers: [
    '@chakra-ui/vue-test-utils/dist/cjs/snapshot-serializer.js',
  ],
  testMatch: ['**/**/*.test.(js|jsx|ts|tsx)'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}
