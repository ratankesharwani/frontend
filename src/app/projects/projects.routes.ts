import { Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';

export const PROJECT_ROUTES: Routes = [
    { path: '', component: ProjectListComponent },
    { path: 'new', component: ProjectFormComponent },
];