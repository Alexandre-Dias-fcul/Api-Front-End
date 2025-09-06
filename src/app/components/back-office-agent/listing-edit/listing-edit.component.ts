import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListingService } from '../../../services/back-office-agent/listing.service';
import { listing } from '../../../models/listing';

@Component({
  selector: 'app-listing-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './listing-edit.component.html',
  styleUrl: './listing-edit.component.css'
})
export class ListingEditComponent {

  listingForm: FormGroup;

  id: number = 0;

  listing: listing =
    {
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
    }

  errorMessage: string | null = null;

  constructor(private fb: FormBuilder,
    private authorization: AuthorizationService,
    private router: Router,
    private route: ActivatedRoute,
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

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.id) {
      this.router.navigate(['/main-page/listing-list']);
      return;
    }

    this.listingService.getListingById(this.id).subscribe({
      next: (data: listing) => {

        this.listing = data;

        this.listingForm.patchValue({

          type: data.type,
          status: data.status,
          numberOfRooms: data.numberOfRooms,
          numberOfBathrooms: data.numberOfKitchens,
          numberOfKitchens: data.numberOfKitchens,
          price: data.price,
          location: data.location,
          area: data.area,
          parking: data.parking,
          description: data.description,
          mainImageFileName: data.mainImageFileName,
          otherImagesFileNames: data.otherImagesFileNames
        });

      },
      error: (error) => {
        console.error('Erro ao obter Listing:', error);
        this.errorMessage = error;
      }
    });
  }

  onSubmit() {
    if (this.listingForm.valid) {
      const listingData: listing = this.listingForm.value as listing;

      listingData.status = Number(this.listingForm.get('status')?.value);

      listingData.id = this.id;

      this.listingService.updateListing(listingData).subscribe({
        next: (response) => {
          console.log('Listing atualizada com sucesso:', response);

          this.router.navigate(['/main-page/listing-list']); // Redireciona para a lista de agentes após a atualizaçã
        },
        error: (error) => {
          console.error('Erro ao atualizar listing:', error);
          this.errorMessage = error;
        }
      });
    }
    else {
      console.log('Formulário inválido.');
      this.errorMessage = 'Formulário inválido.';
    }
  }
}
