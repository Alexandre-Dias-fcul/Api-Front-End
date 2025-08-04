import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { agentAll } from '../../../models/agentAll';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AgentService } from '../../../services/back-office/agent.service';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { contact } from '../../../models/contact';

@Component({
  selector: 'app-agent-edit-contact',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agent-edit-contact.component.html',
  styleUrl: './agent-edit-contact.component.css'
})
export class AgentEditContactComponent {

  contactForm: FormGroup;
  contactId: number;

  agent: agentAll = {
    id: 0,
    name: {
      firstName: '',
      middleNames: [],
      lastName: ''
    },
    dateOfBirth: null,
    gender: '',
    hiredDate: null,
    dateOfTermination: null,
    photoFileName: '',
    role: 0,
    supervisorId: null,
    isActive: true,
    entityLink: {
      id: 0,
      entityType: 0,
      entityId: 0,
      addresses: [],
      contacts: [],
      account: {
        email: '',
        password: ''
      }
    }
  };

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService,
    private authorization: AuthorizationService
  ) {

    this.contactForm = this.fb.group({
      contactType: ['', [Validators.required]],
      value: ['', [Validators.required]]
    });

    const agentId = Number(this.route.snapshot.paramMap.get('idAgent'));

    this.contactId = Number(this.route.snapshot.paramMap.get('idContact'));

    const role = this.authorization.getRole();

    if (!role || (role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']); // Redireciona para a página de login se o papel não for 'Agent' ou 'Manager'

      return;
    }

    this.agentService.getByIdWithAll(agentId).subscribe(
      (response: agentAll) => {
        this.agent = response;
        const contact = this.agent.entityLink?.contacts?.find(a => a.id === this.contactId);
        if (contact) {
          this.contactForm.patchValue({
            contactType: contact.contactType,
            value: contact.value
          });
        }
      },
      (error) => {
        console.error('Erro ao obter agente:', error);
      }
    );
  }


  onSubmit() {

    if (this.contactForm.valid) {

      const type = this.contactForm.value.contactType;
      const value = this.contactForm.value.value;

      // Validação simples de email
      if (type == 1) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          this.contactForm.get('value')?.setErrors({ email: true });
          return;
        }
      }

      const contactData: contact = {
        id: this.contactId,
        contactType: Number(type),
        value: value,
      };

      this.agentService.agentUpdateContact(contactData, this.agent.id, this.contactId).subscribe(
        (response) => {
          this.router.navigate(['/main-page/agent-contact-list', this.agent.id]);
        },
        (error) => {
          console.error('Erro ao adicionar contacto:', error);
        }
      );


    }
  }
}
