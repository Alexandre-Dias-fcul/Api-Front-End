import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffNewAccountComponent } from './staff-new-account.component';

describe('StaffNewAccountComponent', () => {
  let component: StaffNewAccountComponent;
  let fixture: ComponentFixture<StaffNewAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffNewAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffNewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
