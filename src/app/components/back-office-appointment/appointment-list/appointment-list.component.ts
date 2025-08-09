import { Component } from '@angular/core';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { Router, RouterLink } from '@angular/router';
import { AppointmentService } from '../../../services/back-office-appointment/appointment.service';
import { CommonModule } from '@angular/common';
import { appointmentAll } from '../../../models/appointmentAll';

@Component({
  selector: 'app-appointment-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {

  appointments: appointmentAll[] = [];

  id: number = 0;

  constructor(private authorization: AuthorizationService,
    private router: Router,
    private appointmentService: AppointmentService) {

    const role = this.authorization.getRole();

    if (!role || (role !== 'Staff' && role !== 'Agent' && role !== 'Manager'
      && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']);

      return;
    }

    this.id = Number(authorization.getId());

    if (!this.id) {
      this.router.navigate(['/front-page', 'login']);

      return;
    }

    this.appointmentService.getAllAppointmentsWithParticipants().subscribe(
      {
        next: (data) => {
          this.appointments = data;
        },
        error: (err) => {
          console.error('Error fetching appointments:', err);
        }
      }
    );
  }


  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.error('Error deleting appointment:', err);
      }
    });
  }


  deleteParticipant(id: number, participantId: number) {
    this.appointmentService.deleteParticiant(id, participantId).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.error('Error deleting participant:', err);
      }
    });
  }

}
