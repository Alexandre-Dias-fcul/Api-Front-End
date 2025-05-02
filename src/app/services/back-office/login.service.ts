import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../../models/login';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  UrlLoginEmployee:string = 'https://localhost:7212/api/Authentication/AuthenticationEmployee';
  UrlLoginUser:string = 'https://localhost:7212/api/Authentication/AuthenticationUser';

  constructor(private http:HttpClient) 
  { 

  }

  loginEmployee(login:login):Observable<string>
  {
    return this.http.post(this.UrlLoginEmployee,login,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' // Informa que a resposta é texto, não JSON
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada loginEmployee:', error);
        return throwError(() => new Error('Erro ao autenticar funcionário.'));
      })
      );
  }

  loginUser(login:login):Observable<string>
  {
    return this.http.post(this.UrlLoginUser,login,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada loginUser:', error);
        return throwError(() => new Error('Erro ao autenticar uitilizador.'));
      })
      );
  }
}
