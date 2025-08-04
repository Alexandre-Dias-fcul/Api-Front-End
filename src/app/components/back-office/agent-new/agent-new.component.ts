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
        isActive: [null, [Validators.required]],
        gender: ['', [Validators.required]],
        dateOfBirth: [null], // Campo de data de nascimento
        hiredDate: [null], // Campo de data de contratação
        dateOfTermination: [null],// Campo de data de demissão
        photoFileName: [''], // Campo de nome do arquivo da foto
        supervisorEmail: [null], // Campo de ID do supervisor
        role: [null, Validators.required], // Campo de função
      });

    const role = this.authorization.getRole();

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']); // Redireciona para a página de login se o papel não for 'Manager', 'Broker' ou 'Admin'

      return;
    }

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    // Inicializa o formulário com campos e validações
    if (this.id) {
      this.agentService.getAgentById(this.id).subscribe(agent => {
        // Ajusta middleNames para string se necessário
        // 1. Copie o objeto agent
        const agentData = { ...agent };

        // 2. Copie o objeto name
        agentData.name = { ...agent.name };

        // 3. Transforme middleNames de array para string (ou vazio se não existir)
        const middleNamesString = Array.isArray(agent.name.middleNames) && agent.name.middleNames.length > 0
          ? agent.name.middleNames.join(' ')
          : '';

        if (agent.supervisorId != null) {
          this.agentService.getByIdWithAll(agent.supervisorId).subscribe((supervisor) => {

            this.agentForm.patchValue({
              name: {
                firstName: agentData.name.firstName,
                lastName: agentData.name.lastName,
                // middleNames já foi transformado em string acima
                middleNames: middleNamesString
              },
              isActive: agentData.isActive,
              gender: agentData.gender,
              dateOfBirth: this.toDateInputString(agentData.dateOfBirth),
              hiredDate: this.toDateInputString(agentData.hiredDate),
              dateOfTermination: this.toDateInputString(agentData.dateOfTermination),
              photoFileName: agentData.photoFileName,
              role: agentData.role,
              supervisorEmail: supervisor.entityLink?.account?.email || null,

            });
          });
        } else {

          this.agentForm.patchValue({
            name: {
              firstName: agentData.name.firstName,
              lastName: agentData.name.lastName,
              // middleNames já foi transformado em string acima
              middleNames: middleNamesString
            },
            isActive: agentData.isActive,
            gender: agentData.gender,
            dateOfBirth: this.toDateInputString(agentData.dateOfBirth),
            hiredDate: this.toDateInputString(agentData.hiredDate),
            dateOfTermination: this.toDateInputString(agentData.dateOfTermination),
            photoFileName: agentData.photoFileName,
            role: agentData.role,
            supervisorEmail: null,

          });
        }
      });
    }

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
            error: (err) => {
              console.error('Erro ao buscar agent:', err);
            }
          }
        )

      }

    }
    else {
      console.log('Formulário inválido');
    }
  }

  private saveAgent(agentData: agent) {
    if (this.id) {
      agentData.id = this.id;
      // UPDATE
      this.agentService.updateAgent(agentData).subscribe({
        next: (response) => {
          console.log('Agente atualizado com sucesso:', response);
          this.responseMessage = 'Agente atualizado com sucesso!';
          this.router.navigate(['/main-page/agent-new-account/', response.id, 1]);
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
          this.router.navigate(['/main-page/agent-new-account/', response.id, 1]);
        },
        error: (err) => {
          console.error('Erro ao criar agente:', err);
          this.responseMessage = 'Erro ao criar agente. Tente novamente.';
        }
      });
    }

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
