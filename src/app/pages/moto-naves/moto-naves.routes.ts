import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./moto-naves.component').then((m) => m.MotoNavesComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./lista/lista.component').then((m) => m.ListaComponent),
            },
            {
                path: 'create',
                loadComponent: () => import('./form-moto-naves/form-moto-naves.component').then((m) => m.FormMotoNavesComponent),
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./form-moto-naves/form-moto-naves.component').then((m) => m.FormMotoNavesComponent),
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