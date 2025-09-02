import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { agentAll } from '../../../models/agentAll';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { AgentService } from '../../../services/back-office/agent.service';

@Component({
  selector: 'app-agent-edit-account',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agent-edit-account.component.html',
  styleUrl: './agent-edit-account.component.css'
})
export class AgentEditAccountComponent {

  accountForm: FormGroup;

  agent: agentAll = {
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
    role: 0,
    supervisorId: null,
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

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService,
    private authorization: AuthorizationService
  ) {
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });


    const role = this.authorization.getRole();

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']); // Redireciona para a página de login se o papel não for 'Agent' ou 'Manager'

      return;
    }

    const agentId = Number(this.route.snapshot.paramMap.get('id'));

    this.agentService.getByIdWithAll(agentId).subscribe(
      (response: agentAll) => {
        this.agent = response;

        this.accountForm.patchValue({
          email: this.agent.entityLink?.account?.email
        });
      },
      (error) => {
        console.error('Erro ao obter agente:', error);
        this.errorMessage = error;
      }
    );
  }


  onSubmit() {
    if (this.accountForm.valid) {

      const accountData = this.accountForm.value;

      this.agentService.agentUpdateAccount(accountData, this.agent.id).subscribe({
        next: () => {
          this.accountForm.reset();
          this.router.navigate(['/main-page/agent-edit', this.agent.id]);
        },
        error: (error) => {
          console.error('Erro ao editar conta:', error);
          this.errorMessage = error;
        }
      });
    }
  }

}
