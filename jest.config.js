/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  rootDir: "spec/",
  moduleDirectories: ["node_modules", "spec", "src"]
};

module.exports = config;
