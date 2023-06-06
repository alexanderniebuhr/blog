// module.exports = {
// 	parser: '@typescript-eslint/parser',
// 	extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
// 	plugins: ['@typescript-eslint', 'prettier'],
// 	rules: {
// 		'@typescript-eslint/ban-ts-comment': 'off',
// 		'@typescript-eslint/camelcase': 'off',
// 		'@typescript-eslint/explicit-module-boundary-types': 'off',
// 		'@typescript-eslint/no-empty-function': 'off',
// 		'@typescript-eslint/no-explicit-any': 'off',
// 		'@typescript-eslint/no-non-null-assertion': 'off',
// 		'@typescript-eslint/no-unused-vars': 'off',
// 		'@typescript-eslint/no-use-before-define': 'off',
// 		'@typescript-eslint/no-var-requires': 'off',
// 		'@typescript-eslint/no-this-alias': 'off',
// 		'no-console': 'warn',
// 		'prefer-const': 'off',
// 		'no-shadow': 'off',
// 		'@typescript-eslint/no-shadow': ['error'],
// 		// 'prettier/prettier': 'error',
// 	},
// 	overrides: [
// 		{
// 			files: ['*.astro'],
// 			parser: 'astro-eslint-parser',
// 			parserOptions: {
// 				parser: '@typescript-eslint/parser',
// 			},
// 		},
// 	],
// }

module.exports = {
	root: true,
	overrides: [
		{
			// Define the configuration for `.astro` file.
			files: ['*.astro'],
			// Allows Astro components to be parsed.
			parser: 'astro-eslint-parser',
			// Parse the script in `.astro` as TypeScript by adding the following configuration.
			// It's the setting you need when using TypeScript.
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
			},
			extends: [
				'eslint:recommended',
				'plugin:astro/recommended',
				'plugin:astro/jsx-a11y-strict',
			],
			rules: {
				// override/add rules settings here, such as:
				// "astro/no-set-html-directive": "error"
			},
		},
		{
			files: ['*.ts'],
			plugins: ['@typescript-eslint'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: true,
				//     project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
				tsconfigRootDir: __dirname,
			},
			extends: [
				'eslint:recommended',
				'plugin:@typescript-eslint/strict-type-checked',
				'plugin:@typescript-eslint/stylistic-type-checked',
			],
			rules: {
				'@typescript-eslint/no-unused-vars': ['error', {
					argsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
				}],
				'@typescript-eslint/no-non-null-assertion': 'off',
			},
		},
	],
}
