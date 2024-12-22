import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./clients.component').then((m) => m.ClientsComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./lista/lista.component').then((m) => m.ListaComponent),
            },
            {
                path: 'create',
                loadComponent: () => import('./form-clients/form-clients.component').then((m) => m.FormClientsComponent),
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./form-clients/form-clients.component').then((m) => m.FormClientsComponent),
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