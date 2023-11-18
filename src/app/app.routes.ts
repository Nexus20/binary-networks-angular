import {Routes} from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: '/networks', pathMatch: 'full'},
    {path: 'networks', loadChildren: () => import('./networks/networks.routes')},
];
