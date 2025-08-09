import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { appointment } from '../../models/appointment';
import { participant } from '../../models/participant';
import { appointmentAll } from '../../models/appointmentAll';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  urlAppointment = 'https://localhost:7212/api/Appointment';
  constructor(private http: HttpClient) { }

  getAllAppointments(): Observable<appointment[]> {
    return this.http.get<appointment[]>(this.urlAppointment);
  }

  getAllAppointmentsWithParticipants(): Observable<appointmentAll[]> {
    return this.http.get<appointmentAll[]>(`${this.urlAppointment}/GetAllWithParticipants`);
  }

  getAppointmentById(id: number): Observable<appointment> {
    return this.http.get<appointment>(`${this.urlAppointment}/${id}`);
  }

  getAppointmentByIdWithParticipants(id: number): Observable<appointment> {
    return this.http
      .get<appointment>(`${this.urlAppointment}/GetByIdWithParticipants/${id}`);
  }

  addAppointment(appointment: appointment): Observable<appointment> {
    return this.http.post<appointment>(this.urlAppointment, appointment, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada addAppointment', error);
        return throwError(() => new Error('Erro ao adicionar appointment'));
      })
    )
  }

  updateAppointment(appointment: appointment): Observable<appointment> {
    return this.http.put<appointment>(`${this.urlAppointment}/${appointment.id}`,
      appointment, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada updateAppointment', error);
        return throwError(() => new Error('Erro ao atualizar appointment'));
      })
    )
  }

  deleteAppointment(id: number): Observable<appointment> {
    return this.http.delete<appointment>(`${this.urlAppointment}/${id}`);
  }

  addParticipant(idAppointment: number, idEmployee: number): Observable<participant> {
    return this.http
      .post<participant>(`${this.urlAppointment}/AddParticipant/
        ${idAppointment}/${idEmployee}`, {
        headers: { 'Content-Type': 'application/json' }
      }).pipe(
        catchError((error) => {
          console.error('Erro na chamada addParticipant', error);
          return throwError(() => new Error('Erro ao adicionar appointment'))
        })
      );
  }

  deleteParticiant(idAppointment: number, idEmployee: number): Observable<participant> {
    return this.http.delete<participant>(`${this.urlAppointment}/DeleteParticipant/
      ${idAppointment}/${idEmployee}`);
  }
}
