import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingReassignBetweenAgentsComponent } from './listing-reassign-between-agents.component';

describe('ListingReassignBetweenAgentsComponent', () => {
  let component: ListingReassignBetweenAgentsComponent;
  let fixture: ComponentFixture<ListingReassignBetweenAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingReassignBetweenAgentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingReassignBetweenAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
