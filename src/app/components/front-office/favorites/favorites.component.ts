import { Component } from '@angular/core';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { Router } from '@angular/router';
import { FavoriteService } from '../../../services/front-office/favorite.service';
import { CommonModule } from '@angular/common';
import { listing } from '../../../models/listing';
import { ListingService } from '../../../services/back-office-agent/listing.service';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {

  favoriteListings: Array<any>[] = [];

  constructor(private authorization: AuthorizationService,
    private router: Router,
    private favorite: FavoriteService,
    private listingService: ListingService
  ) {
    const role = this.authorization.getRole();

    if (!role || (role !== 'User')) {
      this.router.navigate(['front-page', 'login-user']);

      return;
    }

    this.favorite.getAllFavorites().subscribe((response) => {

      const favorites = response;

      favorites.forEach(favorite => {

        this.listingService.getListingById(favorite.listingId).subscribe((data) => {
          this.favoriteListings.push([data, favorite]);
        });
      })



    });
  }

  deleteFavorite(id: number) {
    this.favorite.deleteFavorite(id).subscribe(() => {

      window.location.reload();
    });
  }
}
