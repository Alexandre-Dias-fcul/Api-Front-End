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

  user: any;


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

          const userData = { ...data };

          this.user = {
            id: data.id,
            name: {
              firstName: data.name.firstName,
              middleNames: data.name.middleNames,
              lastName: data.name.lastName
            },
            isActive: data.isActive,
            gender: data.gender,
            dateOfBirth: this.toDateInputString(data.dateOfBirth),
            fotoFileName: data.photoFileName

          }
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });

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
