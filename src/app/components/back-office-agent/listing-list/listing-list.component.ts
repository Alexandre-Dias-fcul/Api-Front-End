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

  role: string | null = null;

  errorMessage: string | null = null;

  constructor(private listingService: ListingService,
    private authorization: AuthorizationService,
    private router: Router) {

    this.role = this.authorization.getRole();

    if (!this.role || (this.role !== 'Agent' && this.role !== 'Manager' && this.role !== 'Broker'
      && this.role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']);

      return;
    }

    this.id = Number(authorization.getId());

    if (!this.id) {
      this.router.navigate(['/front-page', 'login']);

      return;
    }


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

  deleteList(id: number) {
    if (confirm("Tem a certeza que quer apagar este imóvel?")) {
      this.listingService.deleteListing(id).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) => {
          console.error('Error deleting listing:', error);
          this.errorMessage = error;
        }
      });
    }
  }


}


