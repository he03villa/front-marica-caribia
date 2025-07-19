import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./invoice.component').then((m) => m.InvoiceComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./lista/lista.component').then((m) => m.ListaComponent),
            },
            {
                path: 'create',
                loadComponent: () => import('./form-invoice/form-invoice.component').then((m) => m.FormInvoiceComponent),
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./form-invoice/form-invoice.component').then((m) => m.FormInvoiceComponent),
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