import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: 'remote',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './App',
      }).then((m) => m.AppComponent),
  },
];
