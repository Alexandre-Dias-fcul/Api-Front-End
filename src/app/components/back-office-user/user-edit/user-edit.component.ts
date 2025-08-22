import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userAll } from '../../../models/userAll';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  imports: [],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {

  userForm: FormGroup;

  id: number;

  userAll: userAll = {
    id: 0,
    name: {
      firstName: '',
      middleNames: [],
      lastName: ''
    },
    isActive: true,
    gender: '',
    dateOfBirth: null,
    photoFileName: '',
    entityLink: {
      id: 0,
      entityType: 0,
      entityId: 0,
      addresses: [],
      contacts: [],
      account: {
        email: '',
        password: ''
      }
    }
  };

  constructor(private fb: FormBuilder,
    private authorization: AuthorizationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.userForm = this.fb.group({
      name: this.fb.group({
        firstName: ['', [Validators.required]],
        middleNames: [''],
        lastName: ['', [Validators.required]]
      }),
      isActive: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: [null],
      photoFileName: ['']
    });

    const role = this.authorization.getRole();

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (!role || (role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']);
      return;
    }

    if (!this.id) {
      this.router.navigate(['/front-page', 'login']);

      return;
    }

  }
}
