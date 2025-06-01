import { Component } from '@angular/core';
import { AgentService } from '../../../services/back-office/agent.service';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { Router, RouterLink } from '@angular/router';
import { agentListing } from '../../../models/agentListing';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listing-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './listing-list.component.html',
  styleUrl: './listing-list.component.css'
})
export class ListingListComponent {

  agent: agentListing = {
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
    listings: []
  };
  constructor(private agentService: AgentService,
    private authorization: AuthorizationService,
    private router: Router) {
    const role = authorization.getRole();

    if (!role || role !== 'Agent') {

      this.router.navigate(['/login']);

      return;
    }

    const id = Number(authorization.getId());

    if (id) {
      this.agentService.getByIdwithListings(id).subscribe(
        {
          next: (data) => {
            this.agent = data; // Assign the fetched data to the agents array// Log the agents data to the console
          },
          error: (err) => {
            console.error('Error fetching agent:', err); // Log any errors that occur during the fetch
          }
        }
      );
    }
  }



}


