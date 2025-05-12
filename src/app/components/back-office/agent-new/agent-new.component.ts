import { Component } from '@angular/core';
import { agent } from '../../../models/agent';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentService } from '../../../services/back-office/agent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-new',
  imports: [ReactiveFormsModule],
  templateUrl: './agent-new.component.html',
  styleUrl: './agent-new.component.css'
})

export class AgentNewComponent {

  agentForm: FormGroup;
  responseMessage: string = ''; // Mensagem de resposta da API

  constructor(private fb: FormBuilder,
    private agentService: AgentService,
    private router: Router) {
    // Inicializa o formulário com campos e validações
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

      console.log('Dados do agente:', agentData); // Exibe os dados do agente no console
      this.agentService.addAgent(agentData).subscribe(
        {
          next: (response) => {
            // Exibe a resposta da API
            console.log('Agente criado com sucesso:', response);

            this.agentForm.reset();

            this.router.navigate(['/main-page/agent-new-account/', response.id]); // Mensagem de sucesso
          },
          error: (err) => {
            console.error('Erro ao criar agente:', err); // Mensagem de erro
            this.responseMessage = 'Erro ao criar agente. Tente novamente.';
          }
        }
      );

      // Redireciona para a página de lista de agentes após a criação
    }
    else {
      console.log('Formulário inválido'); // Mensagem de erro se o formulário for inválido
    }
  }
}
