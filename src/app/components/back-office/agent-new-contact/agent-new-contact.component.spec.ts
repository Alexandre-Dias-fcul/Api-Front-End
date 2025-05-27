import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNewContactComponent } from './agent-new-contact.component';

describe('AgentNewContactComponent', () => {
  let component: AgentNewContactComponent;
  let fixture: ComponentFixture<AgentNewContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentNewContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentNewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
