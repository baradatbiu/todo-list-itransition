module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "ts", "vue"],
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "^@.+.svg$": "<rootDir>/__mocks__/svgMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: ["src/components/**/*.vue", "src/utils/**/*.ts"],
  coverageReporters: ["html", "text-summary"],
};
