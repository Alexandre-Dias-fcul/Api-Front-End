import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  constructor() { }


  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    console.warn('localStorage não está disponível no ambiente atual.');
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
    } else {
      console.warn('localStorage não está disponível no ambiente atual.');
    }
  }

  clearToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    } else {
      console.warn('localStorage não está disponível no ambiente atual.');
    }
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
}

