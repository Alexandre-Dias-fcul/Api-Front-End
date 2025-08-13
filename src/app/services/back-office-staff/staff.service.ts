import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { staff } from '../../models/staff';
import { account } from '../../models/account';
import { address } from '../../models/address';
import { contact } from '../../models/contact';
import { catchError, Observable, throwError } from 'rxjs';
import { staffAll } from '../../models/staffAll';

@Injectable({
  providedIn: 'root'
})
export class StaffService {


  urlStaff: string = 'https://localhost:7212/api/Staff';

  constructor(private http: HttpClient) {

  }

  getAllStaff(): Observable<staff[]> {
    return this.http.get<staff[]>(this.urlStaff);
  }

  getStaffById(id: number): Observable<staff> {
    return this.http.get<staff>(`${this.urlStaff}/${id}`);

  }

  getStaffByEmail(email: string): Observable<staff> {
    return this.http.get<staff>(`${this.urlStaff}/GetByEmail?email=${email}`);
  }

  getByIdWithAll(id: number): Observable<staffAll> {
    return this.http.get<staffAll>(` ${this.urlStaff}/GetByIdWithAll/${id}`);
  }

  addStaff(staff: staff): Observable<staff> {
    return this.http.post<staff>(this.urlStaff, staff,
      { headers: { 'Content-Type': 'application/json' } }).pipe(
        catchError((error) => {
          console.error('Erro na chamada addStaff:', error);
          return throwError(() => new Error('Erro ao adicionar staff.'));
        })
      )
  }

  updateStaff(staff: staff): Observable<staff> {
    return this.http.put<staff>(`${this.urlStaff}/${staff.id}`, staff,
      { headers: { 'Content-type': 'application/json' } }).pipe(
        catchError((error) => {
          console.error('Erro na chamada updateStaff:', error);
          return throwError(() => new Error('Erro ao atualizar staff.'));
        })
      );
  }

  deleteStaff(id: number): Observable<staff> {
    return this.http.delete<staff>(`${this.urlStaff}/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Erro na chamada deleteStaff:', error);
          return throwError(() => new Error('Erro ao excluir staff.'));
        })
      );
  }

  staffAddAccount(account: account, staffId: number): Observable<staff> {
    return this.http.post<staff>(`${this.urlStaff}/AddAccount/${staffId}`, account,
      { headers: { 'Content-Type': 'application/json' } }
    ).pipe(
      catchError((error) => {
        console.error('Erro na chamada staffAddAccount:', error);
        return throwError(() => new Error('Erro ao adicionar conta ao staff.'));
      })
    );
  }

  staffAddAddress(address: address, staffId: number): Observable<staff> {
    return this.http.post<staff>(`${this.urlStaff}/AddAddress/${staffId}`, address,
      { headers: { 'Content-Type': 'application/json' } }
    ).pipe(
      catchError((error) => {
        console.error('Erro na chamada staffAddAddress:', error);
        return throwError(() => new Error('Erro ao adicionar endereço ao staff.'));
      })
    );
  }

  staffAddContact(contact: contact, staffId: number): Observable<staff> {
    return this.http.post<staff>(`${this.urlStaff}/AddContact/${staffId}`, contact,
      { headers: { 'Content-Type': 'application/json' } }
    ).pipe(
      catchError((error) => {
        console.error('Erro na chamada staffAddContact:', error);
        return throwError(() => new Error('Erro ao adicionar contato ao staff.'));
      })
    );
  }

  staffUpdateAccount(account: account, staffId: number): Observable<staff> {
    return this.http.put<staff>(`${this.urlStaff}/UpadateAccount/${staffId}`,
      account, { headers: { 'Content-Type': 'application/json' } })
      .pipe(
        catchError((error) => {
          console.error('Erro na chamada staffUpdateAccount:', error);
          return throwError(() => new Error('Erro ao atualizar conta do staff.'));
        })
      );
  }

  staffUpdateAddress(address: address, staffId: number): Observable<staff> {

    return this.http.put<staff>(` ${this.urlStaff}/UpdateAddress/${staffId}`,
      address, { headers: { 'Content-Type': 'application/json' } }
    ).pipe
      (
        catchError((error) => {
          console.error('Erro na chamada staffUpdateAddress:', error);
          return throwError(() => new Error('Erro ao atualizar endereço do staff.'));
        })
      )
  }

  staffUpdateContact(contact: contact, staffId: number): Observable<staff> {

    return this.http.put<staff>(`${this.urlStaff}/UpdateContact/${staffId}`,
      contact, { headers: { 'Content-Type': 'application/json' } })
      .pipe(
        catchError((error) => {
          console.error('Erro na chamada staffUpdateContact:', error);
          return throwError(() => new Error('Erro ao atualizar contato do staff.'));
        })
      )
  }

  staffDeleteAccount(staffId: number): Observable<staff> {
    return this.http.delete<staff>(`${this.urlStaff}/DeleteAccount/${staffId}`)
      .pipe(
        catchError((error) => {
          console.error('Erro na chamada staffDeleteAccount:', error);
          return throwError(() => new Error('Erro ao excluir conta do staff.'));
        })
      );
  }

  satffDeleteAddress(staffId: number, addressId: number): Observable<staff> {
    return this.http.delete<staff>(`${this.urlStaff}/DeleteAddress/${staffId}/${addressId}`)
      .pipe(
        catchError((error) => {
          console.error('Erro na chamada satffDeleteAddress:', error);
          return throwError(() => new Error('Erro ao excluir endereço do staff.'));
        })
      );
  }

  staffDeleteContact(staffId: number, contactId: number): Observable<staff> {
    return this.http.delete<staff>(`${this.urlStaff}/DeleteContact/${staffId}/${contactId}`)
      .pipe(
        catchError((error) => {
          console.error('Erro na chamada staffDeleteContact:', error);
          return throwError(() => new Error('Erro ao excluir contato do staff.'));
        })
      );
  }
}