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
        ],
    },
];