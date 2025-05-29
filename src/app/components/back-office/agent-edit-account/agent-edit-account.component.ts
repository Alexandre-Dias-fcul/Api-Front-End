import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agent-edit-account',
  imports: [],
  templateUrl: './agent-edit-account.component.html',
  styleUrl: './agent-edit-account.component.css'
})
export class AgentEditAccountComponent {

  id; number = 0; // ID do agente, usado para determinar se é uma criação ou atualização
  constructor(private route: ActivatedRoute) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
}
