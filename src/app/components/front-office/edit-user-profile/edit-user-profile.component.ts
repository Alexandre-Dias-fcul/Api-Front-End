import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/front-office/user.service';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { user } from '../../../models/user';

@Component({
  selector: 'app-edit-user-profile',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.css'
})
export class EditUserProfileComponent {

  userForm: FormGroup;
  id: number;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private authorization: AuthorizationService,
    private router: Router
  ) {

    this.userForm = this.fb.group({
      name: this.fb.group({
        firstName: ['', [Validators.required]],
        middleNames: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      }),
      dateOfBirth: [null],
      gender: [''],
      isActive: [null, [Validators.required]],
      photoFileName: ['']
    });

    const role = this.authorization.getRole();

    this.id = Number(this.authorization.getId());

    if (!role || (role !== 'User') || !this.id) {

      this.router.navigate(['/front-page', 'login-user']);
      return;

    }


    this.userService.getUserById(this.id).subscribe(
      {
        next: (data) => {

          this.userForm.patchValue({

            name: {
              firstName: data.name.firstName,
              middleNames: data.name.middleNames ? data.name.middleNames.join(' ') : '',
              lastName: data.name.lastName
            },

            isActive: data.isActive,
            gender: data.gender,
            dateOfBirth: this.toDateInputString(data.dateOfBirth),
            photoFileName: data.photoFileName,

          });

        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });
  }

  onSubmit() {

    if (this.userForm.valid) {

      const userData: user = {
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

      userData.name.firstName = this.userForm.get('name.firstName')?.value;
      const middleNamesValue = this.userForm.get('name.middleNames')?.value;

      if (middleNamesValue) {
        userData.name.middleNames = middleNamesValue
          .split(' ')
          .map((name: string) => name.trim());
      }
      else {
        userData.name.middleNames = [];
      }

      userData.name.lastName = this.userForm.get('name.lastName')?.value;
      userData.dateOfBirth = this.userForm.get('dateOfBirth')?.value;
      userData.gender = this.userForm.get('gender')?.value;
      userData.isActive = this.userForm.get('isActive')?.value === 'true';
      userData.photoFileName = this.userForm.get('photoFileName')?.value;

      userData.id = this.id;

      this.userService.updateUser(userData).subscribe({

        next: (response) => {
          console.log('User atualizado com sucesso:', response);

          this.router.navigate(['/front-page', 'user-profile']);
        }
        ,
        error: (err) => {
          console.error('Erro ao atualizar user:', err);

        }
      })
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
