import eslint from '@eslint/js';
import eslintCommentPlugin from '@eslint-community/eslint-plugin-eslint-comments/configs';
import stylisticPlugin from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
// eslint-disable-next-line import/no-unresolved -- For some reason, eslint doesn't like the TypeScript plugin
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

const stylisticConfig = stylisticPlugin.configs.customize({
	indent: 'tab',
	quotes: 'single',
	semi: true,
	commaDangle: 'never',
	braceStyle: '1tbs',
	jsx: true
});

export default tseslint.config(
	{
		name: 'PretendoNetwork/files',
		files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx', '**/*.mjs', '**/*.cjs', '**/*.d.ts']
	},
	{
		// https://eslint.org/docs/rules/
		name: 'PretendoNetwork/eslint-js',
		extends: [eslint.configs.recommended],
		rules: {
			'require-atomic-updates': 'off', // This rule is widely controversial and causes false positives
			'no-console': 'off',
			'prefer-const': ['error', {
				destructuring: 'all' // Only error if all destructured variables can be const
			}],
			'no-var': 'error',
			'no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^ignore' }
			],
			'one-var': ['error', 'never'],
			'curly': ['error', 'all'] // Always require curly braces
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			}
		}
	},
	{
		// https://typescript-eslint.io/rules/
		name: 'PretendoNetwork/typescript-eslint',
		extends: [tseslint.configs.recommended],
		files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^ignore' }
			],
			'@typescript-eslint/no-inferrable-types': 'off',
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-empty-object-type': ['off'],
			'@typescript-eslint/no-import-type-side-effects': 'error',
			'@typescript-eslint/consistent-type-imports': ['error', {
				fixStyle: 'separate-type-imports'
			}]
		}
	},
	{
		// https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/
		name: 'PretendoNetwork/eslint-comments',
		extends: [eslintCommentPlugin.recommended],
		rules: {
			'@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
			'@eslint-community/eslint-comments/require-description': 'error'
		}
	},
	{
		// https://eslint.style/rules
		name: 'PretendoNetwork/stylistic',
		extends: [stylisticConfig],
		rules: {
			'@stylistic/no-extra-semi': 'error',
			'@stylistic/yield-star-spacing': ['error', 'after'],
			'@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
			'@stylistic/curly-newline': ['error', {
				multiline: true,
				consistent: true
			}],
			'@stylistic/object-curly-newline': ['error', {
				multiline: true,
				consistent: true
			}],
			'@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }]
		}
	},
	{
		// https://www.npmjs.com/package/eslint-plugin-import
		name: 'PretendoNetwork/import',
		extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.warnings],
		rules: {
			'import/order': ['warn', {
				'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
				'newlines-between': 'never'
			}],
			'import/first': 'error',
			'import/consistent-type-specifier-style': ['error', 'prefer-top-level']
		},
		languageOptions: {
			ecmaVersion: 'latest' // For some reason, the recommended config sets this to 2018, reset this to the default
		},
		settings: {
			'import/extensions': ['.js', '.jsx']
		}
	},
	{
		// https://www.npmjs.com/package/eslint-plugin-import - but specifically for TypeScript
		name: 'PretendoNetwork/import-typescript',
		extends: [importPlugin.flatConfigs.typescript],
		files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json'
				},
				node: true
			}
		}
	},
	{
		// https://github.com/jsx-eslint/eslint-plugin-react
		name: 'PretendoNetwork/react-plugin',
		files: ['**/*.jsx', '**/*.tsx'],
		rules: {
			'react/jsx-uses-vars': 'error'
		},
		plugins: {
			react: reactPlugin
		}
	},
	{
		name: 'PretendoNetwork/global-cjs',
		files: ['**/*.js', '**/*.cjs'],
		languageOptions: {
			globals: {
				...globals.builtin,
				...globals.commonjs,
				...globals['shared-node-browser']
			}
		}
	},
	{
		name: 'PretendoNetwork/global-esm',
		files: ['**/*.ts', '**/*.tsx', '**/*.d.ts', '**/*.mjs'],
		languageOptions: {
			globals: {
				...globals.builtin,
				...globals['shared-node-browser']
			}
		}
	},
	{
		// https://eslint.org/docs/latest/use/configure/ignore
		name: 'PretendoNetwork/global-ignores',
		ignores: [
			'**/dist/', // Common build output directory
			'**/out/', // Common build output directory
			'**/.next/', // Next.js build output directory
			'**/.nuxt/', // Nuxt.js build output directory
			'**/*.min.js' // Minified JavaScript files
		]
	}
);
