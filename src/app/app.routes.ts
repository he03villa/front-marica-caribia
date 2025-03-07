import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { noAuthGuard } from './guard/no-auth.guard';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        canActivate: [authGuard],
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
                path: 'lanchas',
                loadChildren: () => import('../app/pages/lanchas/lanchas.routes').then((m) => m.routes)
            },
            {
                path: 'clientes',
                loadChildren: () => import('../app/pages/clients/clients.routes').then((m) => m.routes)
            },
            {
                path: 'moto-naves',
                loadChildren: () => import('../app/pages/moto-naves/moto-naves.routes').then((m) => m.routes)
            },
            {
                path: 'trabajadores',
                loadChildren: () => import('../app/pages/trabajadores/trabajadores.routes').then((m) => m.routes)
            },
            {
                path: 'factura',
                loadChildren: () => import('../app/pages/factura/factura.routes').then((m) => m.routes)
            },
            {
                path: 'servicios',
                loadChildren: () => import('../app/pages/servicios/servicios.routes').then((m) => m.routes)
            },
            {
                path: 'puerto',
                loadChildren: () => import('../app/pages/puerto/puerto.routes').then((m) => m.routes)
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
                canActivate: [noAuthGuard],
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
