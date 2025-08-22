import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewAccountComponent } from './user-new-account.component';

describe('UserNewAccountComponent', () => {
  let component: UserNewAccountComponent;
  let fixture: ComponentFixture<UserNewAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserNewAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
