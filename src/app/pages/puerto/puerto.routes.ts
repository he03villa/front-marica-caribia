import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./puerto.component').then((m) => m.PuertoComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./list/list.component').then((m) => m.ListComponent),
            },
            /* {
                path: 'create',
                loadComponent: () => import('./form-servicios/form-servicios.component').then((m) => m.FormServiciosComponent),
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./form-servicios/form-servicios.component').then((m) => m.FormServiciosComponent),
            }, */
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