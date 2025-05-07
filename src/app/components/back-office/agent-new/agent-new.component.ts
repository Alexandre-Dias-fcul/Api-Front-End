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
        firstName: ['', [Validators.required]],
        middleNames: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        isActive: [true, [Validators.required]],
        dateOfBirth: [''], // Campo de data de nascimento
        hiredeDate: [''], // Campo de data de contratação
        dateOfTermination: [''],// Campo de data de demissão
        photoPhileName: [''], // Campo de nome do arquivo da foto
        supervisorId: [null], // Campo de ID do supervisor
        role: [null], // Campo de função
      });
  }

  onSubmit() {
    if (this.agentForm.valid) {
      const agentData: agent = this.agentForm.value as agent; // Obtém os valores do formulário

      this.agentService.addAgent(agentData).subscribe(
        {
          next: (response) => {
            // Exibe a resposta da API
            console.log('Agente criado com sucesso:', response);

            this.agentForm.reset();

            this.router.navigate(['/main-page/agent-list']); // Mensagem de sucesso
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
