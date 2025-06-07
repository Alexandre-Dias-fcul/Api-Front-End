import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentReassignComponent } from './agent-reassign.component';

describe('AgentReassignComponent', () => {
  let component: AgentReassignComponent;
  let fixture: ComponentFixture<AgentReassignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentReassignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentReassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
