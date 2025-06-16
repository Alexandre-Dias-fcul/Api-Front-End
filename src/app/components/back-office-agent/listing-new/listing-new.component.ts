import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { Router, RouterLink } from '@angular/router';
import { ListingService } from '../../../services/back-office-agent/listing.service';
import { listing } from '../../../models/listing';


@Component({
  selector: 'app-listing-new',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './listing-new.component.html',
  styleUrl: './listing-new.component.css'
})
export class ListingNewComponent {

  listingForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authorization: AuthorizationService,
    private router: Router,
    private listingService: ListingService
  ) {
    this.listingForm = this.fb.group(
      {
        type: ['', [Validators.required]],
        status: [null, [Validators.required]],
        numberOfRooms: [null],
        numberOfBathrooms: [null],
        numberOfKitchens: [null],
        price: [null, [Validators.required]],
        location: ['', [Validators.required]],
        area: [null, [Validators.required]],
        parking: [null],
        description: ['', [Validators.required]],
        mainImageFileName: [''],
        otherImagesFileNames: ['']
      }
    );

    const role = this.authorization.getRole();

    if (!role || (role !== 'Agent' && role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']);

      return;
    }

  }

  onSubmit() {
    if (this.listingForm.valid) {

      const listingData: listing = this.listingForm.value as listing;

      listingData.status = Number(this.listingForm.get('status')?.value);

      this.listingService.addListing(listingData).subscribe({
        next: (response) => {
          console.log('Listing criada com sucesso:', response);
          this.listingForm.reset();
          this.router.navigate(['/main-page/listing-list']);
        },
        error: (err) => {
          console.error('Erro ao criar listing:', err);

        }
      });
    } else {
      console.log('Formulário inválido'); // Mensagem de erro se o formulário for inválido
    }
  }
}
