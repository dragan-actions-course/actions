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
  
  // FIX 1: Exclude E2E directories from Jest, especially the one inside 'src'
  // (Assuming you previously had this, keeping it for robustness)
  modulePathIgnorePatterns: ["<rootDir>/e2e/", "<rootDir>/src/e2e/"],

  // FIX 2: Instruct Jest to transform specific node_modules packages (ESM)
  // This resolves the "SyntaxError: Unexpected token 'export'" from 'uuid'
  // and other similar packages like 'flagsmith-nodejs'.
  transformIgnorePatterns: [
    "/node_modules/(?!(uuid|flagsmith-nodejs)/)",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
