import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentService } from '../../../services/back-office/agent.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agent-new-account',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agent-new-account.component.html',
  styleUrl: './agent-new-account.component.css'
})
export class AgentNewAccountComponent {

  accountForm: FormGroup;

  constructor(private fb: FormBuilder,
    private agentService: AgentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.accountForm = this.fb.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const accountData = this.accountForm.value;
      const agentId = Number(this.route.snapshot.paramMap.get('id')); // Substitua pelo ID do agente desejado
      this.agentService.agentAddAccount(accountData, agentId).subscribe(
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
