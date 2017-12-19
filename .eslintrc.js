module.exports = {
  root: true,
	parserOptions: {
    parser: 'babel-eslint',
		ecmaVersion: 2017,
		sourceType: 'module',
	},
	env: {
		browser: true,
		worker: true,
	},
	extends: [
		'airbnb-base',
	],
	settings: {
		'import/resolver': 'webpack',
	},
	rules: {
    'linebreak-style': 0,
		// Own rules
    semi: ['warn', 'never'],
    // indent : spaces 2
		indent: ['warn', 2],
		'max-len': 'off',
		'no-tabs': 'off',
		'import/prefer-default-export': 'off',

		// Webpack-related
		'import/no-extraneous-dependencies': ['error', {
			devDependencies: true,
		}],

		// Minifier-related
		'no-console': 'off',
		'no-unused-vars': ['error', { args: 'none' }],
	},
}