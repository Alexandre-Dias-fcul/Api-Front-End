import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AgentService } from '../../../services/back-office/agent.service';
import { AuthorizationService } from '../../../services/back-office/authorization.service';

@Component({
  selector: 'app-agent-new-address',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agent-new-address.component.html',
  styleUrl: './agent-new-address.component.css'
})
export class AgentNewAddressComponent {

  agentId: number;
  addressForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authorization: AuthorizationService,
    private agentService: AgentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.addressForm = this.fb.group({
      street: [''],
      city: [''],
      country: [''],
      postalCode: ['']
    });

    this.agentId = Number(this.route.snapshot.paramMap.get('id'));

    const role = this.authorization.getRole();

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']); // Redireciona para a página de login se o papel não for 'Agent' ou 'Manager'

      return;
    }

  }

  onSubmit() {
    if (this.addressForm.valid) {
      const addressData = this.addressForm.value;

      this.agentService.agentAddAddress(addressData, this.agentId).subscribe(
        (response) => {
          console.log('Endereço adicionado com sucesso:', response);
          this.router.navigate(['/main-page/agent-edit', this.agentId]); // Redireciona para a lista de agentes após adicionar o endereço
        },
        (error) => {
          console.error('Erro ao adicionar endereço:', error);
        }
      );
    }
  }
}
