import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { agent } from '../../../models/agent';
import { AgentService } from '../../../services/back-office/agent.service';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../../services/back-office/authorization.service';

@Component({
  selector: 'app-agent-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './agent-list.component.html',
  styleUrl: './agent-list.component.css'
})
export class AgentListComponent {

  agents: agent[] = []; // Array to hold agent data

  constructor(private agentService: AgentService,
    private authorization: AuthorizationService,
    private router: Router) {

    const role = this.authorization.getRole();

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/login']);

      return;// Redireciona para a página de login se o papel não for 'Agent' ou 'Manager'
    }


    this.agentService.getAllAgents().subscribe({

      next: (data) => {
        this.agents = data; // Assign the fetched data to the agents array// Log the agents data to the console
      },
      error: (err) => {
        console.error('Error fetching agents:', err); // Log any errors that occur during the fetch
      }
    }

    ); // Fetch all agents on component initialization
  }

}