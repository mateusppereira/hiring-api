/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],

    // A preset that is used as a base for Jest's configuration
    preset: 'ts-jest',

    // A list of paths to directories that Jest should use to search for files in
    roots: ['<rootDir>/tests'],

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // A map from regular expressions to paths to transformers
    transform: {
        '.+\\.ts$': 'ts-jest',
    },
};
