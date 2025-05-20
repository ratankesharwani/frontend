import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatCardModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
displayedColumns: string[] = ['title', 'description'];
  dataSource = [
    { title: 'Portfolio Site', description: 'Personal developer dashboard' },
    { title: 'Analytics Dashboard', description: 'Admin charts and insights' },
  ];

  constructor(private router: Router) {}

  goToNewProject() {
    this.router.navigate(['/dashboard/projects/new']);
  }
}
