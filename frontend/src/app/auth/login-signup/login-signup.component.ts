import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../apiServices/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent implements OnInit {
  /** Holds the whole form */
  myForm!: FormGroup;
  login: boolean = false;
  formType: string = 'Login'; // Default to signup
  accountNotifier: string = 'Create an account';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}
  // constructor(private fb: FormBuilder,private authService: AuthService) {}

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
  if (this.login) {
    console.log('Signup form submitted', this.myForm.value);
    
    this.authService.signup(email, password).subscribe({
    next: (res:any) => {
      if(res?.status === 'success') {
        localStorage.setItem('token', res?.token);
        Swal.fire({
   icon: 'success',
   title: 'Login Successful',
   text: 'Welcome back!'
 });
        console.log('Login successful', res);
        // Navigate to dashboard or store token
        this.router.navigate(['/registration']);
      }
    },
    error: (err:any) => {
      Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: err?.error?.message || 'Something went wrong!',
});
      console.error('Login failed', err);
      // Show error to user
    }
  });
} else {
  console.log('Login form submitted', this.myForm.value);
  
  this.authService.login(email, password).subscribe({
    next: (res:any) => {
      if(res?.status === 'success') {
        Swal.fire({
   icon: 'success',
   title: 'Login Successful',
   text: 'Welcome back!'
 });
        console.log('Login successful', res);
        // Navigate to dashboard or store token
        this.router.navigate(['/registration']);
      }
    },
    error: (err:any) => {
      Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: err?.error?.message || 'Something went wrong!',
});
      console.error('Login failed', err);
      // Show error to user
    }
  });

}
  }

  loginFunc(){
    this.login = !this.login;
    this.myForm.reset();
   
    
if(this.login == true) {
  this.accountNotifier = 'Already have an account? Login';
  this.formType = 'Sign Up';
}
if(this.login == false) {
this.accountNotifier = 'Don\'t have an account? Signup';
 this.formType = 'Login';
}
// console.log(num);

  }
}
