import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { agentAll } from '../../../models/agentAll';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { AgentService } from '../../../services/back-office/agent.service';
import { address } from '../../../models/address';

@Component({
  selector: 'app-agent-address-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './agent-address-list.component.html',
  styleUrl: './agent-address-list.component.css'
})
export class AgentAddressListComponent {

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


  deleteAddress(address: number) {
    if (confirm('Tem a certeza que pretende apagar o endereço?')) {
      this.agentService.agentDeleteAddress(this.agent.id, address).subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting address:', error);
        }
      );
    }
  }
}
