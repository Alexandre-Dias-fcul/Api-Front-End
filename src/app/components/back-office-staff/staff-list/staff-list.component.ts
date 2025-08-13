import { Component } from '@angular/core';
import { staff } from '../../../models/staff';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StaffService } from '../../../services/back-office-staff/staff.service';

@Component({
  selector: 'app-staff-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.css'
})
export class StaffListComponent {
  staffs: staff[] = [];

  constructor(
    private authorization: AuthorizationService,
    private router: Router,
    private route: ActivatedRoute,
    private staffService: StaffService
  ) {
    const role = this.authorization.getRole();

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']);

      return;
    }

    this.staffService.getAllStaff().subscribe({
      next: (data) => {
        this.staffs = data;
      },
      error: (error) => {
        console.error('Error fetching staffs:', error);
      }
    })
  }
}
