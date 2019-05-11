module.exports = {
  // preset: "jest",
  // testEnvironment: "node",
  // roots: ["<rootDir>/src"],
  modulePathIgnorePatterns: ["<rootDir>/src/test-utils"],
  globalSetup: "./src/test-utils/globalSetup.js",
  globalTeardown: "./src/test-utils/globalTeardown.js"
};
