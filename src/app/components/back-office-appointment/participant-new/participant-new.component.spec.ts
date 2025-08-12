import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantNewComponent } from './participant-new.component';

describe('ParticipantNewComponent', () => {
  let component: ParticipantNewComponent;
  let fixture: ComponentFixture<ParticipantNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
