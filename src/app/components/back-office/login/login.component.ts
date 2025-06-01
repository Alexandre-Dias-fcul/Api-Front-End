import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/back-office/login.service';
import { login } from '../../../models/login';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../../services/back-office/authorization.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  responseMessage: string = ''; // Mensagem de resposta da API

  constructor(private fb: FormBuilder, private authorizationService: AuthorizationService,
    private loginService: LoginService, private router: Router) {
    // Inicializa o formulário com campos e validações
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo de email com validação
      password: ['', [Validators.required, Validators.minLength(6)]] // Campo de senha com validação
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: login = this.loginForm.value as login; // Obtém os valores do formulário
      this.loginService.loginEmployee(loginData).subscribe({
        next: (response) => {
          this.responseMessage = response; // Exibe a resposta da API
          console.log('Login bem-sucedido:', response);
          this.authorizationService.setToken(response); // Armazena o token de autenticação
          this.loginForm.reset(); // Reseta o formulário após o login

          const role = this.authorizationService.getRole();

          if (role === 'Manager' || role === 'Broker' || role === 'Admin') {
            this.router.navigate(['/main-page/agent-list']);
          }
          else if (role === 'Agent') {
            this.router.navigate(['/main-page/listing-list']);
          }
          else if (role == 'Staff') {

          }
          else {

          }
          // Redireciona para a página principal após o login
        },
        error: (err) => {
          console.error('Erro no login:', err);
          this.responseMessage = 'Erro ao realizar login. Tente novamente.';
        }
      });

    }
    else {
      console.log('Formulário inválido');
    }
  }
}
