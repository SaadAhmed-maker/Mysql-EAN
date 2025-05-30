import { Component } from '@angular/core';
import { AuthService } from '../../apiServices/auth.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
 policies: any[] = [];

  constructor(private authService: AuthService) {}
   ngOnInit(): void {
    this.authService.getAllPolicies().subscribe({
      next: (res) => {
        this.policies = res.data;
      },
      error: (err) => {
        console.error('Error fetching policies', err);
      }
    });
  }
}
