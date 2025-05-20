import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';

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
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
formGroup: FormGroup;
private apiUrl = 'http://localhost:3000/projects';

  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
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
