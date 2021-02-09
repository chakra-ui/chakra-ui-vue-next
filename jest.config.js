module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
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
  testURL: 'http://localhost/',
  testEnvironmentOptions: { resources: 'usable' },
  globals: {
    'ts-jest': {
      tsconfig: {
        target: 'ES2019',
      },
    },
  },
}
