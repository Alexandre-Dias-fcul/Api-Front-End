import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { catchError, Observable, throwError } from 'rxjs';
import { account } from '../../models/account';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlUser = 'https://localhost:7212/api/User';

  constructor(private http: HttpClient) {

  }

  getAllUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.urlUser);
  }

  getUserById(id: number): Observable<user> {

    return this.http.get<user>(`${this.urlUser}/${id}`);
  }

  addUser(user: user): Observable<user> {
    return this.http.post<user>(this.urlUser, user,
      {
        headers: { 'Content-Type': 'application/json' }
      }).pipe(
        catchError((error) => {
          console.error('Erro na chamada addUser:', error);
          return throwError(() => new Error('Erro ao adicionar usuário.'));
        })
      );
  }

  updateUser(user: user): Observable<user> {
    return this.http.put<user>(`${this.urlUser}/${user.id}}`,
      user, { headers: { 'Content-Type': 'application/json' } }).pipe(
        catchError((error) => {
          console.error('Erro na chamada updateUser:', error)
          return throwError(() => new Error('Erro ao atualizar usuário.'))
        })
      );
  }

  deleteUser(id: number): Observable<user> {
    return this.http.delete<user>(`${this.urlUser}/${id}`);
  }

  userAddAccount(account: account, userId: number): Observable<user> {
    return this.http.post<user>(`${this.urlUser}/AddAccount/${userId}`, account, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada userAddAccount:', error);
        return throwError(() => new Error('Erro ao adicionar conta ao usuário.'));
      })
    );
  }
}
