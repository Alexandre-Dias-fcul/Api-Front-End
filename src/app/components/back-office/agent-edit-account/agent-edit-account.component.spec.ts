import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentEditAccountComponent } from './agent-edit-account.component';

describe('AgentEditAccountComponent', () => {
  let component: AgentEditAccountComponent;
  let fixture: ComponentFixture<AgentEditAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentEditAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentEditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
