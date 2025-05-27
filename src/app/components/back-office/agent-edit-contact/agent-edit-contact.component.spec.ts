import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentEditContactComponent } from './agent-edit-contact.component';

describe('AgentEditContactComponent', () => {
  let component: AgentEditContactComponent;
  let fixture: ComponentFixture<AgentEditContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentEditContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentEditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
