import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChip, MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatChip,
    RouterModule
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  displayedColumns = ['title', 'description', 'tech_stack', 'milestones', 'user', 'actions'];
  dataSource :any[] = []
  private apiUrl = 'http://localhost:3000/projects';

  constructor(private router: Router, private location: Location, private fb: FormBuilder,
    private http: HttpClient) { }

  goToNewProject() {
    this.router.navigate(['/dashboard/projects/new']);
  }

  ngOnInit() {
    this.http.get(this.apiUrl).subscribe({
      next: (res: any) => (this.dataSource = res),
      error: (err) => console.error('Fetching users failed', err)
    });
  }

  goBack() {
    this.location.back();
  }

  updateProject($event:any){

  }

  removeProject($event:any){

  }
}
