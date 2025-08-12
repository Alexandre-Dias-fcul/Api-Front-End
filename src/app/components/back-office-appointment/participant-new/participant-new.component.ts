import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { agent } from '../../../models/agent';
import { AgentService } from '../../../services/back-office/agent.service';
import { appointment } from '../../../models/appointment';
import { AppointmentService } from '../../../services/back-office-appointment/appointment.service';

@Component({
  selector: 'app-participant-new',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './participant-new.component.html',
  styleUrl: './participant-new.component.css'
})
export class ParticipantNewComponent {

  participantForm: FormGroup;

  idAppointment: number = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authorization: AuthorizationService,
    private fb: FormBuilder,
    private agentService: AgentService,
    private appointmentService: AppointmentService
  ) {

    this.participantForm = this.fb.group({
      type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    const role = this.authorization.getRole();

    if (!role || (role !== 'Staff' && role !== 'Agent' && role !== 'Manager'
      && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']);

      return;
    }

    this.idAppointment = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.idAppointment) {
      this.router.navigate(['/main-page/appointment-list']);
      return;
    }

  }


  onSubmit() {

    if (this.participantForm.valid) {

      const type = this.participantForm.get('type')?.value;
      const email = this.participantForm.get('email')?.value;

      if (type === 'Agent') {
        this.agentService.getAgentByEmail(email).subscribe({

          next: (agent: agent) => {
            if (agent) {
              this.appointmentService.addParticipant(this.idAppointment, agent.id).subscribe({
                next: () => {
                  this.router.navigate(['/main-page', 'participant-list', this.idAppointment]);
                },
                error: (err) => {
                  console.error('Error adding participant:', err);
                }
              });
            } else {
              this.participantForm.get('email')?.setErrors({ notFound: true });
            }
          }
        });
      }
      else if (type === 'Staff') {

      }
    }
    else {
      console.error('Form is invalid');
    }
  }

}
