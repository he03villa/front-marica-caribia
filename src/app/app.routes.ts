import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { noAuthGuard } from './guard/no-auth.guard';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./layout/dashboard/dashboard.component').then((m) => m.DashboardComponent),
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
        path: 'clients',
        canActivate: [authGuard],
        loadComponent: () => import('./layout/cliente-layout/cliente-layout.component').then((m) => m.ClienteLayoutComponent),
        children: [
            {
                path: 'clientes',
                loadChildren: () => import('../app/pages/clientes/clientes.routes').then((m) => m.routes)
            },
            {
                path: 'factura',
                loadChildren: () => import('../app/pages/invoice/clientes.routes').then((m) => m.routes)
            },
            {
                path: 'empleados',
                loadChildren: () => import('../app/pages/employee/employee.routes').then((m) => m.routes)
            },
            {
                path: 'entrega',
                loadComponent: () => import('./pages/lunch-delivery/lunch-delivery.component').then((m) => m.LunchDeliveryComponent)
            },
            {
                path: '',
                redirectTo: '/clients/clientes',
                pathMatch: 'full',
            }
        ]
    },
    {
        path: '',
        loadComponent: () => import('./layout/content/content.component').then((m) => m.ContentComponent),
        children: [
            {
                path: 'login',
                canActivate: [noAuthGuard],
                loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent)
            },
            {
                path: 'register',
                canActivate: [noAuthGuard],
                loadComponent: () => import('./pages/register/register.component').then((m) => m.RegisterComponent)
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
