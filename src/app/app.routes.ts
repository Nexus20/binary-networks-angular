import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'networks', loadChildren: () => import('./networks/networks.routes')},
];
