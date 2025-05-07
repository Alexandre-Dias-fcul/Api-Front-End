import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { agent } from '../../../models/agent';
import { AgentService } from '../../../services/back-office/agent.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './agent-list.component.html',
  styleUrl: './agent-list.component.css'
})
export class AgentListComponent {

  agents: agent[] = []; // Array to hold agent data

  constructor(private agentService: AgentService) {

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