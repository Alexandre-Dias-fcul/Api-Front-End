import { Component } from '@angular/core';
import { ListingService } from '../../../services/back-office-agent/listing.service';
import { listing } from '../../../models/listing';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-listings',
  imports: [CommonModule],
  templateUrl: './view-listings.component.html',
  styleUrl: './view-listings.component.css'
})
export class ViewListingsComponent {

  listings: listing[] = [];

  constructor(private listingService: ListingService) {
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
