import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { login } from '../../../models/login';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/back-office/login.service';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-user',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private authorizationService: AuthorizationService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {

      const loginData: login = this.loginForm.value as login;

      this.loginService.loginUser(loginData).subscribe({

        next: (response) => {

          console.log('Login bem-sucedido:', response);
          this.authorizationService.setToken(response);
          this.loginForm.reset();
          this.router.navigate(['/front-page', 'view-listings']);
          window.location.reload();
        },
        error: (err) => {
          console.error('Erro no login:', err);
        }
      });

    } else {
      console.log('Formulário inválido');
    }
  }

}

