import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./clientes.component').then((m) => m.ClientesComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./lista/lista.component').then((m) => m.ListaComponent),
            },
            {
                path: 'create',
                loadComponent: () => import('./form-clientes/form-clientes.component').then((m) => m.FormClientesComponent),
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./form-clientes/form-clientes.component').then((m) => m.FormClientesComponent),
            },
            {
                path: '',
                redirectTo: '/',
                pathMatch: 'full',
            },
        ]
    },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
    },
];