module.exports = {
  moduleNameMapper: {
    '^components(.*)': '<rootDir>/components$1',
    '^hooks(.*)': '<rootDir>/hooks$1',
    '^pages(.*)': '<rootDir>/pages$1',
    '^utils(.*)': '<rootDir>/utils$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.fttemplates/',
    '<rootDir>/node_modules/',
    '<rootDir/notionql-api/',
  ],
};
