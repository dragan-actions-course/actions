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

  // ✅ FIX: Exclude Playwright E2E files and the Haste collision path
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/e2e/",
    "<rootDir>/src/e2e/"
  ],

  // ✅ FIX: Ignore duplicate package.json to prevent Haste collision
  modulePathIgnorePatterns: [
    "<rootDir>/e2e/",
    "<rootDir>/src/package.json" // This is critical for the Haste error
  ],

  // ✅ FIX: Force 'uuid' to use its CommonJS (CJS) entry point to bypass the 'esm-browser'
  // package that causes the 'Unexpected token export' error.
  moduleNameMapper: {
    '^uuid$': '<rootDir>/node_modules/uuid/dist/cjs/index.js',
    // We keep this mapping to guarantee the CJS version of UUID is used.
  },

  // ✅ FIX: Transform problematic ESM dependencies (uuid/flagsmith-nodejs)
  // This rule is still necessary to ensure 'flagsmith-nodejs' and any internal dependencies
  // are processed by Babel.
  transformIgnorePatterns: [
    "node_modules/(?!(uuid|flagsmith-nodejs)/)"
  ],
};

// createJestConfig is exported exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
