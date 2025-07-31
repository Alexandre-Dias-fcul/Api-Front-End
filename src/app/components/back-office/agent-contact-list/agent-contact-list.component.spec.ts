import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentContactListComponent } from './agent-contact-list.component';

describe('AgentContactListComponent', () => {
  let component: AgentContactListComponent;
  let fixture: ComponentFixture<AgentContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentContactListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
