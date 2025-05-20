import { Routes } from '@angular/router';
import { GithubListComponent } from './github-list/github-list.component';

export const GITHUB_ROUTES: Routes = [
    { path: '', component: GithubListComponent },
];