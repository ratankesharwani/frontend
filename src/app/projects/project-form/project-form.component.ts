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
import { Router } from '@angular/router';

interface User {
  id: number;
  name: string;
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
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tech_stack: [''],
      estimated_duration: [null, [Validators.min(1)]],
      logo_path: [''],
      userId: [1],  // bind selected user id here
      milestones: this.fb.array([]),
    });

  }

  get milestones() {
    return this.formGroup.get('milestones') as FormArray;
  }

  ngOnInit() {
    this.users = [
      { id: 1, name: 'Alice Johnson' },
      { id: 2, name: 'Bob Smith' },
      { id: 3, name: 'Charlie Brown' },
    ];
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
      this.http.post(this.apiUrl, this.formGroup.value).subscribe({
        next: () => this.router.navigate(['/dashboard/projects']),
        error: (err) => console.error('Project creation failed', err)
      });
    }
  }
}
