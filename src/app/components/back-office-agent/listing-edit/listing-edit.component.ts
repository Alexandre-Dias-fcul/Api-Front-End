import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listing-edit',
  imports: [],
  templateUrl: './listing-edit.component.html',
  styleUrl: './listing-edit.component.css'
})
export class ListingEditComponent {

  listingForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
  }
}
