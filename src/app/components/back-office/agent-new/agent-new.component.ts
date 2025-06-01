import { Component } from '@angular/core';
import { agent } from '../../../models/agent';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentService } from '../../../services/back-office/agent.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthorizationService } from '../../../services/back-office/authorization.service';

@Component({
  selector: 'app-agent-new',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agent-new.component.html',
  styleUrl: './agent-new.component.css'
})

export class AgentNewComponent {

  agentForm: FormGroup;
  responseMessage: string = ''; // Mensagem de resposta da API
  id: number | null = null; // ID do agente, usado para determinar se é uma criação ou atualização

  constructor(private fb: FormBuilder,
    private authorization: AuthorizationService,
    private agentService: AgentService,
    private router: Router,
    private route: ActivatedRoute) {

    this.agentForm = this.fb.group(
      {
        name: this.fb.group({
          firstName: ['', [Validators.required]],
          middleNames: ['', [Validators.required]], // Campo de nomes do meio
          lastName: ['', [Validators.required]],
        }),
        isActive: [true, [Validators.required]],
        gender: ['', [Validators.required]],
        dateOfBirth: [null], // Campo de data de nascimento
        hiredDate: [null], // Campo de data de contratação
        dateOfTermination: [null],// Campo de data de demissão
        photoFileName: [''], // Campo de nome do arquivo da foto
        supervisorId: [null], // Campo de ID do supervisor
        role: [null, Validators.required], // Campo de função
      });

    const role = this.authorization.getRole();

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/login']);

      return;
    }

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    // Inicializa o formulário com campos e validações


    if (this.id) {
      this.agentService.getAgentById(this.id).subscribe(agent => {
        // Ajusta middleNames para string se necessário
        const agentData = {
          ...agent,
          name: {
            ...agent.name,
            middleNames: agent.name.middleNames ? agent.name.middleNames.join(' ') : ''
          }
        };
        this.agentForm.patchValue(agentData);
      });
    }

  }

  onSubmit() {

    if (this.agentForm.valid) {

      const agentData: agent = this.agentForm.value as agent; // Obtém os valores do formulário

      agentData.role = Number(this.agentForm.get('role')?.value);

      if (agentData.supervisorId !== null) {
        agentData.supervisorId = Number(this.agentForm.get('supervisorId')?.value);
      }

      const middleNamesValue = this.agentForm.get('name.middleNames')?.value;

      if (middleNamesValue) {
        agentData.name.middleNames = middleNamesValue
          .split(' ')
          .map((name: string) => name.trim());
      }
      else {
        agentData.name.middleNames = [];
      }

      agentData.isActive = this.agentForm.get('isActive')?.value === 'true';

      console.log('Dados do agente:', agentData); // Exibe os dados do agente no console
      if (this.id) {
        agentData.id = this.id; // Define o ID do agente se estiver atualizando
        // UPDATE
        this.agentService.updateAgent(this.id, agentData).subscribe({
          next: (response) => {
            console.log('Agente atualizado com sucesso:', response);
            this.responseMessage = 'Agente atualizado com sucesso!';
            this.router.navigate(['/main-page/agent-new-account/', response.id]);
          },
          error: (err) => {
            console.error('Erro ao atualizar agente:', err);
            this.responseMessage = 'Erro ao atualizar agente. Tente novamente.';
          }
        });
      } else {
        // CREATE
        this.agentService.addAgent(agentData).subscribe({
          next: (response) => {
            console.log('Agente criado com sucesso:', response);
            this.agentForm.reset();
            this.router.navigate(['/main-page/agent-new-account/', response.id]);
          },
          error: (err) => {
            console.error('Erro ao criar agente:', err);
            this.responseMessage = 'Erro ao criar agente. Tente novamente.';
          }
        });
      }

      // Redireciona para a página de lista de agentes após a criação
    }
    else {
      console.log('Formulário inválido'); // Mensagem de erro se o formulário for inválido
    }
  }
}
