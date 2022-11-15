module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
