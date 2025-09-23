import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/back-office/login.service';
import { login } from '../../../models/login';
import { Router, RouterLink } from '@angular/router';
import { AuthorizationService } from '../../../services/back-office/authorization.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private loginService: LoginService,
    private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: login = this.loginForm.value as login;
      this.loginService.loginEmployee(loginData).subscribe({
        next: (response) => {

          this.authorizationService.setToken(response);
          this.loginForm.reset();

          const role = this.authorizationService.getRole();

          if (role === 'Manager' || role === 'Broker' || role === 'Admin') {
            this.router.navigate(['/main-page/agent-list']);
          }
          else if (role === 'Agent') {
            this.router.navigate(['/main-page/listing-list']);
          }
          else if (role == 'Staff') {
            this.router.navigate(['/main-page/appointment-list'])
          }


        },
        error: (error) => {
          console.error('Erro no login:', error);
          this.errorMessage = error;
        }
      });

    }
    else {
      console.log('Formulário inválido.');
      this.errorMessage = 'Formulário inválido.';
    }
  }
}
