import { Component } from '@angular/core';
import { ListingService } from '../../../services/back-office-agent/listing.service';
import { listing } from '../../../models/listing';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-view-listings',
  imports: [CommonModule, RouterLink],
  templateUrl: './view-listings.component.html',
  styleUrl: './view-listings.component.css'
})
export class ViewListingsComponent {

  listings: listing[] = [];

  errorMessage: string | null = null;

  constructor(private listingService: ListingService) {
    this.listingService.getAllListings().subscribe(
      {
        next: (data) => {
          this.listings = data;
        },
        error: (error) => {
          console.error('Error fetching listings:', error);
          this.errorMessage = error;
        }
      }
    );
  }
}
