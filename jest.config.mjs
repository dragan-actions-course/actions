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
  
  // 1. ✅ FIX: Exclude Playwright E2E files and the Haste collision path
  // 'e2e' is already ignored by 'modulePathIgnorePatterns', but adding it here is safer.
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/src/e2e/", "<rootDir>/src/package.json"],
  
  // 'modulePathIgnorePatterns' is good for component files, but 'testPathIgnorePatterns' prevents running test files.
  modulePathIgnorePatterns: ["<rootDir>/e2e/"],

  // 2. ✅ FIX: Transform ESM Dependencies (uuid/flagsmith)
  // This tells Jest to transform these specific modules which use 'export/import' syntax.
  transformIgnorePatterns: [
    // This regex tells Jest to ignore transforming everything in node_modules/ EXCEPT for 'uuid' and 'flagsmith-nodejs'
    "node_modules/(?!(uuid|flagsmith-nodejs)/)",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
