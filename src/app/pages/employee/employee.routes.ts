import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./employee.component').then((m) => m.EmployeeComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./lista/lista.component').then((m) => m.ListaComponent),
            },
            {
                path: 'create',
                loadComponent: () => import('./form-employee/form-employee.component').then((m) => m.FormEmployeeComponent),
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./form-employee/form-employee.component').then((m) => m.FormEmployeeComponent),
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