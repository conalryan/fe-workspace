import * as tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    globals: {
      ...globals.browser,
    },
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: 2020,
    },
  },
  rules: {
    '@typescript-eslint/naming-convention': [
      'error', // Or "warn", "off"
      {
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'], // Allow camelCase for most variables, PascalCase for React components, UPPER_CASE for constants
        leadingUnderscore: 'allow', // Allow leading underscores for private variables
        selector: 'variable',
      },
      {
        format: ['camelCase', 'PascalCase'], // Allow PascalCase for React components, camelCase for others
        selector: 'function',
      },
      {
        format: ['PascalCase'],
        // prefix: ["I"], // Optional: enforce 'I' prefix for interfaces
        selector: 'interface',
      },
      {
        format: ['PascalCase'],
        selector: 'typeAlias',
      },
      {
        format: ['PascalCase'],
        selector: 'enum',
      },
      {
        format: ['PascalCase', 'UPPER_CASE'],
        selector: 'enumMember',
      },
      {
        format: ['camelCase'],
        leadingUnderscore: 'allow', // Allow leading underscores for unused parameters
        selector: 'parameter',
      },
      {
        format: ['PascalCase'],
        // prefix: ["T"], // Enforce 'T' prefix for type parameters
        selector: 'typeParameter',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
