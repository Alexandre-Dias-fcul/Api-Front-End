import { Component } from '@angular/core';
import { listing } from '../../../models/listing';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../../../services/back-office-agent/listing.service';
import { agent } from '../../../models/agent';
import { AgentService } from '../../../services/back-office/agent.service';

@Component({
  selector: 'app-detail-listing',
  imports: [],
  templateUrl: './detail-listing.component.html',
  styleUrl: './detail-listing.component.css'
})
export class DetailListingComponent {

  listing: listing = {
    id: 0,
    type: '',
    status: 0,
    numberOfRooms: 0,
    numberOfBathrooms: 0,
    numberOfKitchens: 0,
    price: 0,
    location: '',
    area: 0,
    parking: 0,
    description: '',
    mainImageFileName: '',
    otherImagesFileNames: '',
    agentId: 0

  };

  agent: agent =
    {
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
      isActive: true
    }

  constructor(private route: ActivatedRoute,
    private listingService: ListingService,
    private agentService: AgentService
  ) {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.listingService.getListingById(id).subscribe((response) => {

        this.listing = response;

        this.agentService.getAgentById(response.agentId).subscribe((data) => {

          this.agent = data;

        })
      });

    }



  }
}
