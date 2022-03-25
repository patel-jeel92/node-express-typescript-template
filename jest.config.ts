/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testEnvironmentOptions: {
		NODE_ENV: 'test',
	},
	setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
	collectCoverage: true,
	coverageReporters: ['lcov'],
	coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.ts', 'tests', 'dist'],
	testPathIgnorePatterns: ['node_modules', 'dist'],
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
};
