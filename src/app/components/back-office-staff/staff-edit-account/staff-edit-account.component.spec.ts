import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffEditAccountComponent } from './staff-edit-account.component';

describe('StaffEditAccountComponent', () => {
  let component: StaffEditAccountComponent;
  let fixture: ComponentFixture<StaffEditAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffEditAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffEditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
