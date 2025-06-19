import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/front-office/user.service';
import { AuthorizationService } from '../../../services/back-office/authorization.service';

@Component({
  selector: 'app-edit-user-profile',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.css'
})
export class EditUserProfileComponent {

  userForm: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private authorization: AuthorizationService
  ) {
    this.userForm = this.fb.group({
      name: this.fb.group({
        firstName: ['', [Validators.required]],
        middleNames: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      }),
      dateOfBirth: [null],
      gender: ['', [Validators.required]],
      isActive: [null, [Validators.required]],
      photoFileName: ['']
    })

    const id = this.authorization.getId();


  }

  onSubmit() {

  }
}
