import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

import baseConfig from './eslint.base.mjs';
import ignores from './eslint.ignores.mjs';
import recommended from './eslint.recommended.mjs';
import typescriptConfig from './eslint.typescript.mjs';

const config = defineConfig([
  globalIgnores(['dist']),
  // 1. Ignore patterns
  ignores,
  // 2. Recommended rules
  ...recommended,
  // 3. Overrides (override recommended/default rules)
  baseConfig,
  typescriptConfig,
  // 4. Prettier last to override all other rules
  eslintConfigPrettier,
]);

export default config;
