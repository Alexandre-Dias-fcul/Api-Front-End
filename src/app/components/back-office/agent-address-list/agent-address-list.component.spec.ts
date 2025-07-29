import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAddressListComponent } from './agent-address-list.component';

describe('AgentAddressListComponent', () => {
  let component: AgentAddressListComponent;
  let fixture: ComponentFixture<AgentAddressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentAddressListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
