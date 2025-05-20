import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  // form = this.fb.group({
  //   username: ['', Validators.required],
  //   password: ['', Validators.required],
  // });

   form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  onSubmit() {
    if (this.form.valid) {
      this.auth
        .register(this.form.value.username!, this.form.value.password!)
        .subscribe(() => {
          this.router.navigate(['/auth/login']);
        });
    }
  }
}
