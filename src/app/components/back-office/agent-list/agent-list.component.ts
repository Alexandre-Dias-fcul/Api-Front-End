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
  id: number;
  errorMessage: string | null = null;

  constructor(private agentService: AgentService,
    private authorization: AuthorizationService,
    private router: Router) {

    const role = this.authorization.getRole();

    this.id = Number(this.authorization.getId());

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']);

      return;
    }

    if (!this.id) {

      this.router.navigate(['/front-page', 'login']);

      return;
    }

    this.agentService.getAllAgents().subscribe({

      next: (data) => {
        this.agents = data; // Assign the fetched data to the agents array// Log the agents data to the console
      },
      error: (error) => {
        console.error('Error fetching agents:', error); // Log any errors that occur during the fetch
        this.errorMessage = error;
      }
    }

    ); // Fetch all agents on component initialization
  }

  deleteAgent(id: number) {
    if (confirm("Tem a certeza que quer apagar este agent ?")) {
      this.agentService.deleteAgent(id).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) => {
          console.error("Erro deleting agent.");
          this.errorMessage = error;
        }
      });
    }
  }
}