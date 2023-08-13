const jestConfiOptional = {
  'test-unit': require('./.jest/unit.config'),
  'test-int': require('./.jest/int.config'),
  test: {},
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  transform: {},
  reporters: ['default'],
  coverageProvider: 'v8',
  coverageReporters: ['text', 'text-summary', 'lcov'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  testPathIgnorePatterns: ['build'],
  moduleNameMapper: {
    '^@helpers(.*)$': '<rootDir>/src/utils/$1',
  },
  ...jestConfiOptional[process.env.NODE_ENV || 'test'],
};
