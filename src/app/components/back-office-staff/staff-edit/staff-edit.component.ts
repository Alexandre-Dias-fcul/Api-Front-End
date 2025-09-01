import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StaffService } from '../../../services/back-office-staff/staff.service';
import { staffAll } from '../../../models/staffAll';
import { staff } from '../../../models/staff';

@Component({
  selector: 'app-staff-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './staff-edit.component.html',
  styleUrl: './staff-edit.component.css'
})
export class StaffEditComponent {


  staffForm: FormGroup;

  id: number;

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

  errorMessage: string | null = null;

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
      isActive: [null, [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: [null],
      hiredDate: [null],
      dateOfTermination: [null],
      photoFileName: ['']
    });

    const role = this.authorization.getRole();

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {
      this.router.navigate(['/front-page', 'login']);

      return;

    }

    if (!this.id) {
      this.router.navigate(['/front-page', 'login']);

      return;
    }

    this.staffService.getByIdWithAll(this.id).subscribe(
      {
        next: (data) => {

          this.staff = data;

          this.staffForm.patchValue({
            name:
            {
              firstName: data.name.firstName,
              middleNames: Array.isArray(data.name.middleNames) &&
                data.name.middleNames.length > 0 ? data.name.middleNames.join(' ') : '',
              lastName: data.name.lastName
            },
            isActive: data.isActive,
            gender: data.gender,
            dateOfBirth: this.toDateInputString(data.dateOfBirth),
            hiredDate: this.toDateInputString(data.hiredDate),
            dateOfTermination: this.toDateInputString(data.dateOfTermination),
            photoFileName: data.photoFileName

          })
        },
        error: (error) => {
          console.error('Erro ao obter staff:', error);
          this.errorMessage = error;
        }
      })
  }

  onSubmit() {

    if (this.staffForm.valid) {
      const staffData: staff =
      {
        id: this.id,
        name: {
          firstName: this.staffForm.get('name.firstName')?.value,
          middleNames: this.staffForm.get('name.middleNames')?.value ? this.staffForm.get('name.middleNames')?.value.split(' ') : [],
          lastName: this.staffForm.get('name.lastName')?.value,
        },
        isActive: this.staffForm.get('isActive')?.value === 'true',
        gender: this.staffForm.get('gender')?.value,
        dateOfBirth: this.staffForm.get('dateOfBirth')?.value,
        hiredDate: this.staffForm.get('hiredDate')?.value,
        dateOfTermination: this.staffForm.get('dateOfTermination')?.value,
        photoFileName: this.staffForm.get('photoFileName')?.value,

      }

      this.staffService.updateStaff(staffData).subscribe({
        next: () => {
          this.staffForm.reset();
          this.router.navigate(['/main-page', 'staff-list']);
        },
        error: (error) => {
          console.error('Erro ao alterar Administrativo:', error);
          this.errorMessage = error;
        }
      })
    }
    else {
      console.error("Formulário inválido");
    }
  }

  private toDateInputString(date: Date | string | null | undefined): string | null {
    // Caso seja null, undefined ou string vazia
    if (!date) return null;

    // Se já estiver no formato YYYY-MM-DD, retorna direto
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }

    // Tenta converter para Date
    const d = typeof date === 'string' ? new Date(date) : date;

    // Verifica se a data é válida
    if (!(d instanceof Date) || isNaN(d.getTime())) {
      return null;
    }

    // Formata para YYYY-MM-DD (formato aceito por inputs type="date")
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
