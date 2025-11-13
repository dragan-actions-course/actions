// jest.config.js

import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleResolution: 'node',

  // ✅ FIX: Ignore duplicate package.json to prevent Haste collision (from your update)
  modulePathIgnorePatterns: [
    "<rootDir>/e2e/",
    "<rootDir>/src/package.json"
  ],
  
  // ✅ FIX: Transform ESM Dependencies (uuid/flagsmith-nodejs) - KEEPING THIS IS GOOD PRACTICE
  transformIgnorePatterns: [
    "node_modules/(?!(uuid|flagsmith-nodejs)/)"
  ],
  
  // 💥 CRITICAL FIX: Direct the 'uuid' import to its CommonJS entry point
  moduleNameMapper: {
    '^uuid$': require.resolve('uuid'),
  },

  // ✅ FIX: Exclude Playwright E2E files and the Haste collision path (from your update)
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/e2e/",
    "<rootDir>/src/e2e/"
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
