import { Component } from '@angular/core';
import { user } from '../../../models/user';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/front-office/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  users: user[] = [];
  errorMessage: string | null = null;

  constructor(private authorization: AuthorizationService,
    private router: Router,
    private userService: UserService
  ) {
    const role = this.authorization.getRole();

    if (!role || (role !== 'Admin')) {
      this.router.navigate(['/front-page', 'login']);
      return;
    }

    this.userService.getAllUsers().subscribe({

      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.error('Error fetching staffs:', error);
        this.errorMessage = error;
      }
    });
  }

  deleteUser(id: number) {
    if (confirm("Tem a certeza que quer apagar o user ?")) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) => {
          console.error("Error deleting user", error);
          this.errorMessage = error;
        }
      });
    }
  }
}
