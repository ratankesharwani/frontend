import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';

interface User {
  id: number;
  username: string;
}
@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIcon,
    MatOption,
    MatSelect
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  formGroup: FormGroup;
  private apiUrl = 'http://localhost:3000/projects';
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tech_stack: [''],
      estimated_duration: [null, [Validators.min(1)]],
      logo_path: [''],
      userId: [1],
      milestones: this.fb.array([]),
    });
  }

  get milestones() {
    return this.formGroup.get('milestones') as FormArray;
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/auth/users').subscribe({
      next: (res: any) => (this.users = res),
      error: (err) => console.error('Fetching users failed', err)
    });

    // Check if editing
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.http.get(`${this.apiUrl}/${projectId}`).subscribe({
        next: (project: any) => {
          // Patch form values
          this.formGroup.patchValue({
            title: project.title,
            description: project.description,
            tech_stack: (project.tech_stack || []).join(', '),
            estimated_duration: project.estimated_duration,
            logo_path: project.logo_path,
            userId: project.user?.id,
          });

          this.milestones.clear();
          (project.milestones || []).forEach((m: any) => {
            this.milestones.push(this.fb.group({
              title: [m.title],
              description: [m.description],
            }));
          });
        },
        error: (err) => console.error('Failed to load project', err)
      });
    }
  }

  addMilestone() {
    this.milestones.push(this.fb.group({
      title: [''],
      description: [''],
    }));
  }

  removeMilestone(index: number) {
    this.milestones.removeAt(index);
  }

  submit() {
    if (this.formGroup.valid) {
      const projectId = this.route.snapshot.paramMap.get('id');
      const payload = { ...this.formGroup.value };
      if (typeof payload.tech_stack === 'string') {
        payload.tech_stack = payload.tech_stack
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean);
      }

      if (projectId) {
        this.http.put(`${this.apiUrl}/${projectId}`, payload).subscribe({
          next: () => this.router.navigate(['/dashboard/projects']),
          error: (err) => console.error('Project update failed', err)
        });
      } else {
        this.http.post(this.apiUrl, payload).subscribe({
          next: () => this.router.navigate(['/dashboard/projects']),
          error: (err) => console.error('Project creation failed', err)
        });
      }
    }
  }
}
