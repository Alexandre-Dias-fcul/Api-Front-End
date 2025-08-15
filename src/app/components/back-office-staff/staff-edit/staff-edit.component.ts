import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StaffService } from '../../../services/back-office-staff/staff.service';
import { staffAll } from '../../../models/staffAll';
import { first } from 'rxjs';

@Component({
  selector: 'app-staff-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './staff-edit.component.html',
  styleUrl: './staff-edit.component.css'
})
export class StaffEditComponent {


  staffForm: FormGroup;

  id: number = 0;

  staff: staffAll =
    {
      id: 0,
      name: {
        firstName: '',
        middleNames: [],
        lastName: ''
      },
      dateOfBirth: null,
      gender: '',
      hiredDate: null,
      dateOfTermination: null,
      photoFileName: '',
      isActive: true,
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

  constructor(private authorization: AuthorizationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private staffService: StaffService) {

    this.staffForm = this.fb.group({
      name: this.fb.group({
        firstName: ['', [Validators.required]],
        middleNames: [''],
        lastName: ['', [Validators.required]]
      }),
      isActive: [true, [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: [null],
      hiredDate: [null],
      dateOfTermination: [null],
      photoFileName: ['']
    });

    const role = this.authorization.getRole();

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {
      this.router.navigate(['/front-page', 'login']);

      return;

    }

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.id) {
      this.router.navigate(['/front-page', 'login']);

      return;
    }

    this.staffService.getByIdWithAll(this.id).subscribe((data) => {

      this.staff = data;

      const middleNames = data.name.middleNames ? data.name.middleNames.join('') : '';

      this.staffForm.patchValue({
        name:
        {
          firstName: data.name.firstName,
          middleNames: middleNames,
          lastName: data.name.middleNames
        },
        isActive: data.isActive,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        hiredDate: data.hiredDate,
        dataOftermination: data.dateOfTermination,
        photoFileName: data.photoFileName

      })
    })
  }

  onSubmit() {

  }
}
