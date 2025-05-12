import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNewAccountComponent } from './agent-new-account.component';

describe('AgentNewAccountComponent', () => {
  let component: AgentNewAccountComponent;
  let fixture: ComponentFixture<AgentNewAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentNewAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentNewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
