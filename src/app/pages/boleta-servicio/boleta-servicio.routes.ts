import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./boleta-servicio.component').then((m) => m.BoletaServicioComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./lista/lista.component').then((m) => m.ListaComponent),
            },
            {
                path: 'create',
                loadComponent: () => import('./form-boleta-servicio/form-boleta-servicio.component').then((m) => m.FormBoletaServicioComponent),
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./form-boleta-servicio/form-boleta-servicio.component').then((m) => m.FormBoletaServicioComponent),
            },
            {
                path: '',
                redirectTo: '/',
                pathMatch: 'full',
            }
        ]
    },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
    },
];