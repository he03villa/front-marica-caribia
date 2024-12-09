import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        children: [
            {
                path: 'boleta-servicio',
                loadChildren: () => import('../app/pages/boleta-servicio/boleta-servicio.routes').then((m) => m.routes)
            },
            {
                path: '',
                redirectTo: '/dashboard/boleta-servicio',
                pathMatch: 'full',
            }
        ]
    },
    {
        path: '',
        redirectTo: '/dashboard/boleta-servicio',
        pathMatch: 'full',
    },
];
