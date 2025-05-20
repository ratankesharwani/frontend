import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./auth/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    },
];