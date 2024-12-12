import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./usuarios.component').then((m) => m.UsuariosComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./lista/lista.component').then((m) => m.ListaComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('./form-usuario/form-usuario.component').then((m) => m.FormUsuarioComponent)
            },
            {
                path: '',
                redirectTo: '',
                pathMatch: 'full',
            }
        ]
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    }
];