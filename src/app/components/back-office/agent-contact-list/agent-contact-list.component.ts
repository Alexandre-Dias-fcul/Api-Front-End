import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AgentService } from '../../../services/back-office/agent.service';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { agentAll } from '../../../models/agentAll';

@Component({
  selector: 'app-agent-contact-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './agent-contact-list.component.html',
  styleUrl: './agent-contact-list.component.css'
})
export class AgentContactListComponent {


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

  constructor(
    private agentService: AgentService,
    private authorization: AuthorizationService,
    private route: ActivatedRoute,
    private router: Router) {

    const role = this.authorization.getRole();

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']);

      return;
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.agentService.getByIdWithAll(id).subscribe(
      (response: agentAll) => {
        this.agent = response;
      },
      (error) => {
        console.error('Erro ao obter agente:', error);
      }
    );
  }

  deleteContact(idContact: number) {
    if (confirm('Tem a certeza que pretende apagar o contacto?')) {
      this.agentService.agentDeleteContact(this.agent.id, idContact).subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          console.error('Erro ao apagar contacto:', error);
        }
      );
    }
  }
}
