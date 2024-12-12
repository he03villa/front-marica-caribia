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
                path: 'usuarios',
                loadChildren: () => import('../app/pages/usuarios/usuario.routes').then((m) => m.routes)
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
        loadComponent: () => import('./pages/content/content.component').then((m) => m.ContentComponent),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent)
            },
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full',
            },
            {
                path: '**',
                redirectTo: '/login',
                pathMatch: 'full',
            }
        ]
    },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full',
    },
];
