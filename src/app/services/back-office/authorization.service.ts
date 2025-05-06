import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  constructor() { }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getTokenPayload(): any {

    const token = this.getToken();

    if (token) {
      try {
        // Decodifica o token usando jwt-decode
        return jwtDecode(token);

        // Decodifica o token
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
      }
    }
    return null;
  }

  getRole(): string | null {

    const payload = this.getTokenPayload();

    if (payload && payload.Role) {
      return payload.Role;
    }

    return null;
  }

  getId(): string | null {
    const payload = this.getTokenPayload();

    if (payload && payload.Id) {
      return payload.Id;
    }

    return null;
  }

  getEmail(): string | null {

    const payload = this.getTokenPayload();

    if (payload && payload.Email) {
      return payload.Email;
    }

    return null;

  }

  clearToken(): void {
    localStorage.removeItem('token');
  }
}

