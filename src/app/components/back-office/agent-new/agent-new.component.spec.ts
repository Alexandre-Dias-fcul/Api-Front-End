import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNewComponent } from './agent-new.component';

describe('AgentNewComponent', () => {
  let component: AgentNewComponent;
  let fixture: ComponentFixture<AgentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
