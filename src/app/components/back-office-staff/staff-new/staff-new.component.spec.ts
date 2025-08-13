import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffNewComponent } from './staff-new.component';

describe('StaffNewComponent', () => {
  let component: StaffNewComponent;
  let fixture: ComponentFixture<StaffNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
