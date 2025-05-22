import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'projects',
                loadChildren: () =>
                    import('../projects/projects.routes').then((m) => m.PROJECT_ROUTES),
            },
            {
                path: 'github',
                loadChildren: () =>
                    import('../github/github.routes').then((m) => m.GITHUB_ROUTES),
            },
            {
                path: 'settings',
                loadChildren: () =>
                    import('../settings/setting.routes').then((m) => m.SETTING_ROUTES),
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('../dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
            }
        ],
    }
];