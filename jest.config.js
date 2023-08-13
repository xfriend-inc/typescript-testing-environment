const jestConfiOptional = {
  test: {},
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  transform: {},
  reporters: ['default'],
  testPathIgnorePatterns: ['build'],
  moduleNameMapper: {
    '^@helpers(.*)$': '<rootDir>/src/utils/$1',
  },
  ...jestConfiOptional[process.env.NODE_ENV || 'test'],
};
