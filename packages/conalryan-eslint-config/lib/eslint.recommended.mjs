import eslint from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import sonarjs from 'eslint-plugin-sonarjs';
import xss from 'eslint-plugin-xss';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  perfectionist.configs['recommended-alphabetical'],
  // tseslint.configs.recommended, or .strict and .stylistic for more rules
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  sonarjs.configs.recommended,
  {
    files: ['**/*.{js,ts,tsx}'],
    plugins: {
      xss,
    },
  },
];

export const reactRecommended = [
  jsxA11y.flatConfigs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'react/jsx-no-target-blank': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
