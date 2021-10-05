module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "ts", "vue"],
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,vue}",
    "!src/main.ts",
    "!src/shims-vue.d.ts",
    "!**/node_modules/**",
  ],
  coverageReporters: ["html", "text-summary"],
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)",
  ],
};
