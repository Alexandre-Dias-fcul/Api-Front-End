import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/front-office/user.service';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { user } from '../../../models/user';

@Component({
  selector: 'app-user-profile',
  imports: [RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  user: user =
    {
      id: 0,
      name: {
        firstName: '',
        middleNames: [],
        lastName: ''
      },
      dateOfBirth: null,
      gender: '',
      photoFileName: '',
      isActive: true
    };

  constructor(private userService: UserService,
    private authorization: AuthorizationService
  ) {
    const role = this.authorization.getRole();

    const id = this.authorization.getId();

    if (!role || (role !== 'User') || !id) {

      return;
    }

    this.userService.getUserById(Number(id)).subscribe(
      {
        next: (data) => {

          this.user = data;

        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });

  }
}
