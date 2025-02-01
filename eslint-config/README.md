# @pretendonetwork/eslint-config

[![NPM Version](https://img.shields.io/npm/v/%40pretendonetwork%2Feslint-config)](https://www.npmjs.com/package/@pretendonetwork/eslint-config)

This package provides Pretendo Network's ESLint configuration as an extensible shared config.

## Troubleshooting

There are some common issues that you may encounter when implementing this configuration. This section will describe how to properly deal with them.

> [!IMPORTANT]
> Don't just disable rules because they are annoying. If you find a rule annoying, it is likely because it is pointing out a problem in your code. Instead, try to understand why the rule is being triggered and fix the underlying issue.
>
> If you believe a rule should be adjusted, please open an issue on this repository.
>
> When disabling a rule, always add a comment explaining why it is disabled using the "-- COMMENT" after the disable directive (There is a lint rule that enforces this).

### `no-unused-vars` is throwing errors for functions

If your function is used in a file as a global function, but ESLint is still throwing an error, you can disable the rule for that specific line and **add a comment to explain where it's used**.

```typescript
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- DESCRIBE WHERE THE FUNCTION IS USED
```

### `no-undef` is throwing errors for global variables

For global variables that are defined in other files or are provided by the environment, you can disable the rule for that specific line and **add a comment to explain where it's defined**.

```typescript
/* global VARIABLE_NAME -- DESCRIBE WHERE IT COMES FROM */
```

## Plugins and Configurations

- [eslint](https://eslint.org/docs/rules/)
- [typescript-eslint](https://typescript-eslint.io/rules/)
- [eslint-plugin-eslint-comments](https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/)
- [stylistic](https://eslint.style/rules)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)

> [!NOTE]
> This does not include an exhaustive list of all rules, please refer to the links above for more information.
>
> We use the following symbols to denote the status of a rule:
>
> - ❌ - Rule is disabled (enabled by default, but we disable it)
> - 📜 - Rule is overridden (enabled by default, but we configure it)
> - ✅ - Rule is enabled (disabled by default, but we enable it)

### eslint and typescript-eslint

The recommended presets for [eslint](https://eslint.org/docs/latest/rules/) and [typescript-eslint](https://typescript-eslint.io/rules/) are included in this configuration.

These presets provide a base set of rules for JavaScript and TypeScript projects which are commonly accepted as best practices.

#### Presets included

- `@eslint/js` - `recommended`
- `typescript-eslint` - `recommended`

#### Changes to the default configuration

**eslint**

- ❌ - `require-atomic-updates`: This rule often causes false positives
- ❌ - `no-console`: We often don't use a logger in our projects, so this rule is disabled
- 📜 - `no-unused-vars`: This is configured to allow using \_ prefix to ignore the error for unused vars - we usually need to keep method parameters for future use
- ✅ - `prefer-const`: We prefer `const` over `let` for variables that are not reassigned
- ✅ - `no-var`: We disallow the use of `var` in favor of `let` and `const`
- ✅ - `curly`: Force braces around all control statements

**typescript-eslint**

- ❌ - `@typescript-eslint/no-inferrable-types`: Allow specifying types when it improves readability
- ❌ - `@typescript-eslint/no-explicit-any`: Allow using `any` when it is necessary
- ❌ - `@typescript-eslint/no-empty-object-type`: Allow using empty object types
- 📜 - `@typescript-eslint/no-unused-vars`: This is configured to allow using \_ prefix to ignore the error for unused vars - we usually need to keep method parameters for future use
- ✅ - `@typescript-eslint/explicit-function-return-type`: Require explicit return types on functions
- ✅ - `@typescript-eslint/no-import-type-side-effects`: Force top-level type imports so verbatimModuleSyntax can fully erase the imports
- ✅ - `@typescript-eslint/consistent-type-imports`: Require consistent import styles for types with a top-level type import

### eslint-plugin-eslint-comments

This plugin enforces rules around eslint directive comments namely enforcing comments and forcing eslint-disable comments to have a matching eslint-enable comment.

#### Presets included

- `@eslint-community/eslint-comments/recommended`

#### Changes to the default configuration

- 📜 - `@eslint-community/eslint-comments/disable-enable-pair`: Allows disabling rules for a whole file without a matching enable directive
- ✅ - `@eslint-community/eslint-comments/require-description`: Requires a description for eslint-disable comments

### Stylistic

[ESLint Stylistic](https://eslint.style/) rules are included in this configuration to enforce a consistent code style across all projects.

#### Base configuration

- Tabs for indentation
- Single quotes
- Semicolons
- No trailing commas
- If quotes are needed around object keys, forces quotes around all keys
- Forces trailing commas in multi-line object literals and arrays
- [1tbs brace style](https://eslint.style/rules/default/brace-style#_1tbs)

#### Changes to the default configuration

- 📜 - `@stylistic/yield-star-spacing`: Change the `*` to be joined with `yield` like `yield*`
- 📜 - `@stylistic/operator-linebreak`: Ensures linebreaks are _after_ the operator, but in ternaries they are _before_
- 📜 - `@stylistic/brace-style`: Disable brackets being on the same line
- ✅ - `@stylistic/no-extra-semi`: Disallow unnecessary semicolons
- ✅ - `@stylistic/curly-newline`: Enforce consistent line breaks inside braces
- ✅ - `@stylistic/object-curly-newline`: Enforce consistent line breaks inside braces

### eslint-plugin-import

#### Presets included

- `recommended`
- `warnings`

#### Changes to the default configuration

- ✅ - `import/order`: Enforce a consistent order for imports
  - The order goes as follows:
  1. Node.js built-in modules
  2. External modules
  3. Internal modules
  4. Parent modules
  5. Sibling modules
  6. Index modules
  7. Type Imports (TypeScript only)
  8. Everything else
  - No empty lines between groups
- ✅ - `import/first`: Ensure all imports are at the top of the file
- ✅ - `import/consistent-type-specifier-style`: Enforce top-level type imports instead of inline type imports

### Global Ignores

- `**/dist/**`: Ignore build directories
- `**/out/**`: Ignore build directories
- `**/.next/**`: Ignore Next.js build directories
- `**/.nuxt/**`: Ignore Nuxt.js build directories
- `**/*.min.js`: Ignore minified JavaScript files
