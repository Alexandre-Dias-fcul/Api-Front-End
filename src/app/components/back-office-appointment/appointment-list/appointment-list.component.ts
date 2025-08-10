import { Component } from '@angular/core';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { agentParticipant } from '../../../models/agentParticipant';
import { AgentService } from '../../../services/back-office/agent.service';
import { AppointmentService } from '../../../services/back-office-appointment/appointment.service';


@Component({
  selector: 'app-appointment-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {

  agentParticipant: agentParticipant = {
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
    participants: []

  }

  constructor(private authorization: AuthorizationService,
    private router: Router,
    private agentService: AgentService,
    private appointmentService: AppointmentService) {

    const role = this.authorization.getRole();

    if (!role || (role !== 'Staff' && role !== 'Agent' && role !== 'Manager'
      && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']);

      return;
    }

    const id = Number(authorization.getId());

    if (!id) {

      this.router.navigate(['/front-page', 'login']);

      return;
    }

    this.agentService.getByIdWithParticipants(id).subscribe(
      {
        next: (data) => {
          this.agentParticipant = data;
        },
        error: (err) => {
          console.error('Error fetching agentWithParticipants:', err);
        }
      }
    );
  }


  deleteAppointment(idAppointment: number) {
    if (confirm('Tem a certeza que pretende apagar a reunião?')) {
      this.appointmentService.deleteAppointment(idAppointment).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.error('Error deleting appointment:', err);
        }
      });
    }
  }


  deleteParticipant(idAppointment: number, participantId: number) {
    if (confirm('Tem a certeza que quer apagar a sua participação na reunião?')) {
      this.appointmentService.deleteParticiant(idAppointment, participantId).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.error('Error deleting participant:', err);
        }
      });
    }
  }

}
