import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingSelfReassignComponent } from './listing-self-reassign.component';

describe('ListingSelfReassignComponent', () => {
  let component: ListingSelfReassignComponent;
  let fixture: ComponentFixture<ListingSelfReassignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingSelfReassignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingSelfReassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
