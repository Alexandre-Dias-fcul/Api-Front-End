import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingReassignToAgentComponent } from './listing-reassign-to-agent.component';

describe('ListingReassignToAgentComponent', () => {
  let component: ListingReassignToAgentComponent;
  let fixture: ComponentFixture<ListingReassignToAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingReassignToAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingReassignToAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
