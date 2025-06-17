import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { user } from '../../../models/user';
import { UserService } from '../../../services/front-office/user.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  passwordMatchValidator: any;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router) {
    this.registerForm = this.fb.group({
      name: this.fb.group({
        firstName: ['', Validators.required],
        middleNames: [''],
        lastName: ['', Validators.required],
      }),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit() {

    if (this.registerForm.valid) {

      const userData: user = {
        id: 0,
        name: {
          firstName: this.registerForm.value.name.firstName,
          middleNames: this.registerForm.value.name.middleNames.split(',').map((name: string) => name.trim()),
          lastName: this.registerForm.value.name.lastName
        },

        gender: '',
        dateOfBirth: null,
        photoFileName: '',
        isActive: true

      } as user;

      const accountData = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.userService.addUser(userData).subscribe({
        next: (userResponse) => {
          this.userService.userAddAccount(accountData, userResponse.id).subscribe({
            next: (accountResponse) => {
              console.log('Usuário registrado com sucesso:', accountResponse);

              this.router.navigate(['/front-page', 'login-user']);  // Redireciona para a página de login após o registro
              // Redirecionar ou exibir mensagem de sucesso
            },
            error: (error) => {
              console.error('Erro ao adicionar conta ao usuário:', error);
            }
          });
        },
        error: (error) => {
          console.error('Erro ao registrar usuário:', error);
        }
      });

    } else {
      console.log('Formulário de registro inválido');
    }
  }
}
