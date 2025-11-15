import { createConfig } from '@ng-rsbuild/plugin-angular';
import { pluginSass } from '@rsbuild/plugin-sass';
import applyFederation from './federation.config';

const rsbuildConfig = createConfig(
  {
    browser: './src/main.ts',
    styles: ['./src/styles.scss'],
  },
  {
    server: {
      port: 4201,
    },
    plugins: [pluginSass()],
  }
);

export default applyFederation(rsbuildConfig);
