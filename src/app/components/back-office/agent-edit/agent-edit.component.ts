import { Component } from '@angular/core';
import { AgentService } from '../../../services/back-office/agent.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { agentAll } from '../../../models/agentAll';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../services/back-office/authorization.service';


@Component({
  selector: 'app-agent-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './agent-edit.component.html',
  styleUrl: './agent-edit.component.css'
})

export class AgentEditComponent {

  agentForm: FormGroup;

  isLoaded: boolean = false; // Variável para controlar o carregamento dos dados do agente

  id: number = 0; // ID do agente, usado para determinar se é uma criação ou atualização
  // Formulário para edição do agente
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


  constructor(private fb: FormBuilder,
    private authorization: AuthorizationService,
    private agentService: AgentService,
    private route: ActivatedRoute,
    private router: Router) {

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

    if (!this.id) {
      this.router.navigate(['/login']);

      return;
    }

    agentService.getByIdWithAll(this.id).subscribe((data: agentAll) => {

      this.agent = data; // Atribui os dados do agente à variável agent

      this.isLoaded = true; // Define isLoaded como true após obter os dados
      console.log('Dados do agente obtidos:', data);
      console.log('Dados do agente:', this.agent);

      const middleNames = data.name.middleNames ? data.name.middleNames.join(' ') : '';

      this.agentForm.patchValue({

        name: {
          firstName: data.name.firstName,
          middleNames: middleNames, // Ajusta middleNames para string
          lastName: data.name.lastName
        },

        isActive: data.isActive,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        hiredDate: data.hiredDate,
        dateOfTermination: data.dateOfTermination,
        photoFileName: data.photoFileName,
        supervisorId: data.supervisorId,
        role: data.role
      });
    });

  }


  onSubmit() {

    if (this.agentForm.valid) {

      const agentData: agentAll = this.agentForm.value as agentAll; // Obtém os valores do formulário

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

      agentData.isActive = this.agentForm.get('isActive')?.value === 'true';

      agentData.id = this.id; // Define o ID do agente se estiver atualizando
      // UPDATE
      this.agentService.updateAgent(agentData).subscribe({
        next: (response) => {
          console.log('Agente atualizado com sucesso:', response);

          this.router.navigate(['/main-page/agent-list']); // Redireciona para a lista de agentes após a atualizaçã
        },
        error: (err) => {
          console.error('Erro ao atualizar agente:', err);

        }
      });

    }
  }
}