import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./factura.component').then((m) => m.FacturaComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./lista/lista.component').then((m) => m.ListaComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('./form-factura/form-factura.component').then((m) => m.FormFacturaComponent)
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./form-factura/form-factura.component').then((m) => m.FormFacturaComponent)
            }
        ]
    }
];