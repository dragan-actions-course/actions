const nextJest = require("next/jest");

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

  // 1. FIX: Use moduleNameMapper to alias 'uuid' to its CommonJS entry point.
  // This is the most reliable fix for the "Unexpected token 'export'" error.
  moduleNameMapper: {
    // When 'uuid' is imported, Jest uses its CommonJS version instead of ESM.
    '^uuid$': require.resolve('uuid'),
  },
  
  // 2. FIX: Ensure all other necessary ESM packages in node_modules are transformed.
  // This is still good practice for flagsmith-nodejs and any other future ESM dependencies.
  transformIgnorePatterns: [
    "node_modules/(?!(uuid|flagsmith-nodejs)/)"
  ],
  
  // 3. FIX: Ignore path patterns to prevent Haste module name collision errors (e.g., duplicate package.json)
  modulePathIgnorePatterns: [
    "<rootDir>/e2e/",
    "<rootDir>/src/package.json" // Critical for resolving Haste issues if you have a src/package.json
  ],
  
  // 4. FIX: Ignore specific test file patterns
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/e2e/",
    "<rootDir>/src/e2e/"
  ],
};

// module.exports is used in CommonJS instead of export default
module.exports = createJestConfig(config);
