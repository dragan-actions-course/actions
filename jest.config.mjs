import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  
  // Set resolution to 'node' to help Jest prioritize CommonJS modules
  moduleResolution: 'node',
  
  // 1. CRITICAL FIX: Ensure ESM packages (uuid, flagsmith-nodejs) are transformed by Babel/Jest.
  // We rely on this heavily now that we cannot use require.resolve().
  transformIgnorePatterns: [
    "node_modules/(?!(uuid|flagsmith-nodejs)/)"
  ],
  
  // 2. FIX: Ignore path patterns to prevent Haste module name collision errors (e.g., duplicate package.json)
  modulePathIgnorePatterns: [
    "<rootDir>/e2e/",
    "<rootDir>/src/package.json" // Critical for resolving Haste issues
  ],
  
  // 3. FIX: Ignore specific test file patterns (E2E)
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/e2e/",
    "<rootDir>/src/e2e/"
  ],
};

// Use export default when using ES Module syntax
export default createJestConfig(config);
