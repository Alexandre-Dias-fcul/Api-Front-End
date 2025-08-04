import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentService } from '../../../services/back-office/agent.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthorizationService } from '../../../services/back-office/authorization.service';

@Component({
  selector: 'app-agent-new-account',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agent-new-account.component.html',
  styleUrl: './agent-new-account.component.css'
})
export class AgentNewAccountComponent {

  agentId: number; // Obtém o ID do agente da rota
  accountForm: FormGroup;
  continue: number; // Variável para controlar o fluxo de criação de conta

  constructor(private fb: FormBuilder,
    private authorization: AuthorizationService,
    private agentService: AgentService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.accountForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });

    this.agentId = Number(this.route.snapshot.paramMap.get('id'));

    this.continue = Number(this.route.snapshot.paramMap.get('continue'))

    const role = this.authorization.getRole();

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']); // Redireciona para a página de login se o papel não for 'Agent' ou 'Manager'

      return;
    }

  }

  onSubmit() {
    if (this.accountForm.valid) {
      const accountData = this.accountForm.value; // Substitua pelo ID do agente desejado
      this.agentService.agentAddAccount(accountData, this.agentId).subscribe(
        (response) => {
          console.log('Conta criada com sucesso:', response);
          this.router.navigate(['/main-page/agent-list']); // Redireciona para a lista de agentes após criar a conta
        },
        (error) => {
          console.error('Erro ao criar conta:', error);
        }
      );
    }
  }
}
