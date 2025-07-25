import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { ListingService } from '../../../services/back-office-agent/listing.service';

@Component({
  selector: 'app-listing-self-reassign',
  imports: [RouterLink],
  templateUrl: './listing-self-reassign.component.html',
  styleUrl: './listing-self-reassign.component.css'
})
export class ListingSelfReassignComponent {

  idAgent: number;

  idListing: number;

  constructor(private route: ActivatedRoute,
    private authorization: AuthorizationService,
    private router: Router,
    private listingService: ListingService) {

    this.idAgent = Number(this.route.snapshot.paramMap.get('idAgent'));

    this.idListing = Number(this.route.snapshot.paramMap.get('idListing'));

    const role = this.authorization.getRole();

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']);

      return;
    }


  }

  reassign() {

    this.listingService.selfReassign(this.idListing).subscribe();

    this.router.navigate(['/main-page/agent-reassign/', this.idAgent]).then(() => {
      window.location.reload();
    });
  }
}
