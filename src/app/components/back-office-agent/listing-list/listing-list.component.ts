import { Component } from '@angular/core';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { listing } from '../../../models/listing';
import { ListingService } from '../../../services/back-office-agent/listing.service';


@Component({
  selector: 'app-listing-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './listing-list.component.html',
  styleUrl: './listing-list.component.css'
})
export class ListingListComponent {

  listings: listing[] = [];

  id: number = 0;

  constructor(private listingService: ListingService,
    private authorization: AuthorizationService,
    private router: Router) {

    const role = authorization.getRole();

    if (!role || (role !== 'Agent' && role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/login']);

      return;
    }

    this.id = Number(authorization.getId());

    if (!this.id) {
      this.router.navigate(['/login'])

      return;
    }


    this.listingService.getAllListings().subscribe(
      {
        next: (data) => {
          this.listings = data;
        },
        error: (err) => {
          console.error('Error fetching listings:', err);
        }
      }
    );

  }



}


