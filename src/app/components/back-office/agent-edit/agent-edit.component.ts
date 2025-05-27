import { Component } from '@angular/core';
import { AgentService } from '../../../services/back-office/agent.service';
import { ActivatedRoute } from '@angular/router';
import { agentAll } from '../../../models/agentAll';

@Component({
  selector: 'app-agent-edit',
  imports: [],
  templateUrl: './agent-edit.component.html',
  styleUrl: './agent-edit.component.css'
})
export class AgentEditComponent {

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
    address: [],
    contact: [],
    account: {
      email: '',
      password: ''
    }
  }


  constructor(agentService: AgentService, route: ActivatedRoute) {

    const id = Number(route.snapshot.paramMap.get('id'));

    if (id !== null && id != undefined) {

      agentService.getByIdWithAll(id).subscribe((data: agentAll) => {
        this.agent = data;
        console.log(this.agent);
      });
    }


  }

}
