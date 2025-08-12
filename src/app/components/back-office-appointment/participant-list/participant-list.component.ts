import { Component } from '@angular/core';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppointmentService } from '../../../services/back-office-appointment/appointment.service';
import { AgentService } from '../../../services/back-office/agent.service';
import { appointmentWithParticipants } from '../../../models/appointmentWithParticipants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participant-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './participant-list.component.html',
  styleUrl: './participant-list.component.css'
})
export class ParticipantListComponent {

  appointment: appointmentWithParticipants =
    {
      id: 0,
      title: '',
      description: '',
      date: new Date(),
      hourStart: '',
      hourEnd: '',
      status: 0,
      participants: []
    }

  agentsParticipants: any[] = [];

  constructor(private authorization: AuthorizationService,
    private router: Router,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private agentService: AgentService,
  ) {

    const role = this.authorization.getRole();

    if (!role || (role !== 'Staff' && role !== 'Agent' && role !== 'Manager'
      && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']);

      return;
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/main-page/appointment-list']);
      return;
    }

    this.appointmentService.getAppointmentByIdWithParticipants(id).subscribe({
      next: (data) => {
        this.appointment = data;
        this.getAgents(this.appointment);
      },
      error: (err) => {
        console.error('Error fetching appointment:', err);
      }
    });
  }

  deleteParticipant(participantId: number) {
    if (confirm('Tem a certeza que quer apagar a sua participação na reunião?')) {
      this.appointmentService.deleteParticipant(this.appointment.id, participantId).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.error('Error deleting participant:', err);
        }
      });
    }
  }


  private getAgents(appointment: appointmentWithParticipants): void {
    for (const participant of appointment.participants) {
      this.agentService.getByIdWithAll(participant.employeeId).subscribe({
        next: (agent) => {
          this.agentsParticipants.push([agent, participant]);
        },
        error: (err) => {
          console.error('Error fetching agent:', err);
        }
      });
    }
  }
}

