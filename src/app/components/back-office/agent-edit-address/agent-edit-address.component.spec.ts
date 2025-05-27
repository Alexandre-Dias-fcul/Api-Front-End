import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentEditAddressComponent } from './agent-edit-address.component';

describe('AgentEditAddressComponent', () => {
  let component: AgentEditAddressComponent;
  let fixture: ComponentFixture<AgentEditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentEditAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
