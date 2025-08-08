import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { AppointmentService } from '../../../services/back-office-appointment/appointment.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-appointment-new',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './appointment-new.component.html',
  styleUrl: './appointment-new.component.css'
})
export class AppointmentNewComponent {

  appointmentForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authorization: AuthorizationService,
    private router: Router,
    private appointmentService: AppointmentService
  ) {

    this.appointmentForm = this.fb.group({

      title: ['', [Validators.required]],
      description: [''],
      date: [null, [Validators.required]],
      hourStart: ['', Validators.required],
      hourEnd: ['', Validators.required],
      status: ['', Validators.required]
    });

    const role = this.authorization.getRole();

    if (!role || (role !== 'Staff' && role !== 'Agent' && role !== 'Manager' && role !== 'Broker' && role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']);

      return;
    }

  }

  onSubmit() {

  }
}
