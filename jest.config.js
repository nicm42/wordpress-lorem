module.exports = {
  //setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/index.tsx'],
};
