import { createConfig } from '@ng-rsbuild/plugin-angular';
import applyFederation from './federation.config';

const rsbuildConfig = createConfig(
  {
    browser: './src/main.ts',
  },
  {
    server: {
      port: 4200,
    },
  }
);

export default applyFederation(rsbuildConfig);
