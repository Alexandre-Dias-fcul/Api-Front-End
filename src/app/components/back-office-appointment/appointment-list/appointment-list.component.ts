import { Component } from '@angular/core';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { agentParticipant } from '../../../models/agentParticipant';
import { AgentService } from '../../../services/back-office/agent.service';
import { AppointmentService } from '../../../services/back-office-appointment/appointment.service';
import { staffParticipant } from '../../../models/staffParticipant';
import { StaffService } from '../../../services/back-office-staff/staff.service';


@Component({
  selector: 'app-appointment-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {

  employeesParticipants: agentParticipant | staffParticipant = {
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
    private staffService: StaffService,
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
          if (data !== null) {
            this.employeesParticipants = data;
          }
          else {
            this.staffService.getByIdWithParticipants(id).subscribe(
              {
                next: (response) => {
                  this.employeesParticipants = response;
                }
                , error: (error) => {
                  console.error('Error fetching staffParticipants', error);
                }
              }
            )
          }

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
      this.appointmentService.deleteParticipant(idAppointment, participantId).subscribe({
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
