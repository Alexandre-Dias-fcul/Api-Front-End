import { Component } from '@angular/core';
import { AgentService } from '../../../services/back-office/agent.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { agentAll } from '../../../models/agentAll';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { agent } from '../../../models/agent';
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

  errorMessage: string | null = null;


  constructor(private fb: FormBuilder,
    private authorization: AuthorizationService,
    private agentService: AgentService,
    private route: ActivatedRoute,
    private router: Router) {

    this.agentForm = this.fb.group(
      {
        name: this.fb.group({
          firstName: ['', [Validators.required]],
          middleNames: [''], // Campo de nomes do meio
          lastName: ['', [Validators.required]],
        }),
        isActive: [true, [Validators.required]],
        gender: ['', [Validators.required]],
        dateOfBirth: [null], // Campo de data de nascimento
        hiredDate: [null], // Campo de data de contratação
        dateOfTermination: [null],// Campo de data de demissão
        photoFileName: [''], // Campo de nome do arquivo da foto
        supervisorEmail: '', // Campo de ID do supervisor
        role: [null, Validators.required], // Campo de função
      });

    const role = this.authorization.getRole();

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']); // Redireciona para a página de login se o papel não for 'Manager', 'Broker' ou 'Admin'

      return;
    }

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.id) {
      this.router.navigate(['/front-page', 'login']); // Redireciona para a página de login se o ID não for válido

      return;
    }

    this.agentService.getByIdWithAll(this.id).subscribe({
      next: (data) => {

        this.agent = data; // Atribui os dados do agente à variável agent

        this.isLoaded = true; // Define isLoaded como true após obter os dados

        const middleNames = data.name.middleNames ? data.name.middleNames.join(' ') : '';

        if (this.agent.supervisorId != null) {
          this.agentService.getByIdWithAll(this.agent.supervisorId).subscribe({
            next: (supervisor: agentAll) => {
              const supervisorEmail = supervisor.entityLink?.account?.email || '';
              this.agentForm.patchValue({ supervisorEmail });
            }, error: (error) => {
              console.error('Erro ao obter supervisor', error);
              this.errorMessage = error;
            }
          });
        } else {
          this.agentForm.patchValue({ supervisorEmail: '' });
        }

        this.agentForm.patchValue({
          name: {
            firstName: data.name.firstName,
            middleNames: middleNames,
            lastName: data.name.lastName
          },
          isActive: data.isActive,
          gender: data.gender,
          dateOfBirth: this.toDateInputString(data.dateOfBirth),
          hiredDate: this.toDateInputString(data.hiredDate),
          dateOfTermination: this.toDateInputString(data.dateOfTermination),
          photoFileName: data.photoFileName,
          role: data.role
        });
      }, error: (error) => {
        console.error('Erro ao obter Agent', error);
        this.errorMessage = error;
      }
    });

  }


  onSubmit() {

    if (this.agentForm.valid) {

      const agentData: agent = {
        id: 0,
        name: {
          firstName: '',
          middleNames: [],
          lastName: ''
        },
        isActive: false,
        gender: '',
        dateOfBirth: null,
        hiredDate: null,
        dateOfTermination: null,
        photoFileName: '',
        role: 0,
        supervisorId: null,

      } as agent;

      agentData.name.firstName = this.agentForm.get('name.firstName')?.value;

      const middleNamesValue = this.agentForm.get('name.middleNames')?.value;

      if (middleNamesValue) {
        agentData.name.middleNames = middleNamesValue
          .split(' ')
          .map((name: string) => name.trim());
      }
      else {
        agentData.name.middleNames = [];
      }

      agentData.name.lastName = this.agentForm.get('name.lastName')?.value;

      agentData.isActive = this.agentForm.get('isActive')?.value === 'true';
      agentData.gender = this.agentForm.get('gender')?.value;
      agentData.dateOfBirth = this.agentForm.get('dateOfBirth')?.value;
      agentData.hiredDate = this.agentForm.get('hiredDate')?.value;
      agentData.dateOfTermination = this.agentForm.get('dateOfTermination')?.value;
      agentData.photoFileName = this.agentForm.get('photoFileName')?.value;
      agentData.role = Number(this.agentForm.get('role')?.value);

      agentData.id = this.id;

      const supervisorEmail = this.agentForm.get('supervisorEmail')?.value;

      if (supervisorEmail === null || supervisorEmail === undefined || supervisorEmail === '') {
        this.saveAgent(agentData);
      }
      else {
        this.agentService.getAgentByEmail(supervisorEmail).subscribe(
          {
            next: (response) => {
              agentData.supervisorId = response.id;

              this.saveAgent(agentData);
            },
            error: (error) => {
              console.error('Erro ao buscar agent:', error);
              this.errorMessage = error;
            }
          }
        )
      }
    }
  }

  private saveAgent(agentData: agent) {
    this.agentService.updateAgent(agentData).subscribe({
      next: (response) => {
        this.agentForm.reset();
        this.router.navigate(['/main-page/agent-list']); // Redireciona para a lista de agentes após a atualizaçã
      },
      error: (error) => {
        console.error('Erro ao atualizar agente:', error);
        this.errorMessage = error

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
