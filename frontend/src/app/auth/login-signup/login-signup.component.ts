import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../apiServices/auth.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent implements OnInit {
  /** Holds the whole form */
  myForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService) {}

  ngOnInit(): void {
    this.setForm();
  }

  /** Initialise the form with controls + validators */
  private setForm(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /** Runs when <form> is submitted */
 onSubmit() {
    if (this.myForm.invalid) return;

    const { email, password } = this.myForm.value;

    this.authService.signup(email, password).subscribe({
      next: (res) => {
        console.log('Login successful', res);
        // Navigate to dashboard or store token
      },
      error: (err) => {
        console.error('Login failed', err);
        // Show error to user
      }
    });
  }
}
