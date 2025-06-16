import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListingsComponent } from './view-listings.component';

describe('ViewListingsComponent', () => {
  let component: ViewListingsComponent;
  let fixture: ComponentFixture<ViewListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewListingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
