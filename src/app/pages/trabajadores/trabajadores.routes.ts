import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./trabajadores.component').then((m) => m.TrabajadoresComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./lista/lista.component').then((m) => m.ListaComponent),
            },
            {
                path: 'create',
                loadComponent: () => import('./form-trabajadores/form-trabajadores.component').then((m) => m.FormTrabajadoresComponent),
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./form-trabajadores/form-trabajadores.component').then((m) => m.FormTrabajadoresComponent),
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