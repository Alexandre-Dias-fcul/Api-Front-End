import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNewAddressComponent } from './agent-new-address.component';

describe('AgentNewAddressComponent', () => {
  let component: AgentNewAddressComponent;
  let fixture: ComponentFixture<AgentNewAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentNewAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentNewAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
