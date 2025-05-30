import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../apiServices/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrl: './registeration.component.scss'
})
export class RegisterationComponent {
   policyForm!: FormGroup; // use definite assignment or initialize in ngOnInit
    login: boolean = false;
constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

   ngOnInit(): void {
    this.policyForm = this.fb.group({
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      sumAssured: ['', [Validators.required, Validators.min(1)]],
      modalPremium: ['', [Validators.required, Validators.min(1)]],
      premiumFrequency: ['', Validators.required],
      pt: ['', Validators.required],
      ppt: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.policyForm.invalid) {
      Swal.fire('Error', 'Please fill all required fields correctly.', 'error');
      return;
    }

    const formData = this.policyForm.value;

    this.authService.createPolicy(formData).subscribe({
      next: (res: any) => {
        Swal.fire('Success', res.message || 'Policy submitted', 'success');
        this.policyForm.reset();
        this.router.navigate(['/summary']); // Navigate to summary page after successful submission
      },
      error: (err) => {
        Swal.fire('Error', err.error?.message || 'Server error', 'error');
      }
    });
  }
}




