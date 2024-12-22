import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./lanchas.component').then((m) => m.LanchasComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./lista/lista.component').then((m) => m.ListaComponent),
            },
            {
                path: 'create',
                loadComponent: () => import('./form-lancha/form-lancha.component').then((m) => m.FormLanchaComponent),
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./form-lancha/form-lancha.component').then((m) => m.FormLanchaComponent),
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