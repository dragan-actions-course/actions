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
  
  // 💥 FIX 1: Removed 'moduleResolution: "node"' as it's an unknown option and caused a warning.
  
  // 1. CRITICAL FIX (uuid): Map the 'uuid' package to its CommonJS file.
  // This bypasses the default package resolution logic that incorrectly chooses the ESM file (esm-browser/index.js).
  moduleNameMapper: {
    '^uuid$': 'uuid/dist/index.js',
  },
  
  // 2. CRITICAL FIX (flagsmith-nodejs and others): Ensure all necessary ESM packages are transformed.
  transformIgnorePatterns: [
    "node_modules/(?!(uuid|flagsmith-nodejs)/)"
  ],
  
  // 3. FIX: Ignore path patterns to prevent Haste module name collision errors (e.g., duplicate package.json)
  modulePathIgnorePatterns: [
    "<rootDir>/e2e/",
    "<rootDir>/src/package.json" // Critical for resolving Haste issues
  ],
  
  // 4. FIX: Ignore specific test file patterns (E2E)
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/e2e/",
    "<rootDir>/src/e2e/"
  ],
};

// Use export default when using ES Module syntax
export default createJestConfig(config);
