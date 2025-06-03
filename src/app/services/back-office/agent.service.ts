import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { agent } from '../../models/agent';
import { account } from '../../models/account';
import { address } from '../../models/address';
import { contact } from '../../models/contact';
import { agentAll } from '../../models/agentAll';
import { agentListing } from '../../models/agentListing';
@Injectable({
  providedIn: 'root'
})
export class AgentService {

  urlAgent: string = 'https://localhost:7212/api/Agent';
  constructor(private http: HttpClient) { }

  getAllAgents(): Observable<agent[]> {
    return this.http.get<agent[]>(this.urlAgent);
  }

  getAgentById(id: number): Observable<agent> {
    return this.http.get<agent>(`${this.urlAgent}/${id}`);
  }

  getAgentByEmail(email: string): Observable<agent> {
    return this.http.get<agent>(`${this.urlAgent}/GetByEmail?email=${email}`);
  }

  getByIdWithAll(id: number): Observable<agentAll> {
    return this.http.get<agentAll>(`${this.urlAgent}/GetByIdWithAll/${id}`);
  }

  getByIdwithListings(id: number): Observable<agentListing> {
    return this.http.get<agentListing>(`${this.urlAgent}/GetByIdWithListings/${id}`);
  }

  addAgent(agent: agent): Observable<agent> {
    return this.http.post<agent>(this.urlAgent, agent, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada addAgent:', error);
        return throwError(() => new Error('Erro ao adicionar agente.'));
      })
    );
  }

  updateAgent(agent: agent): Observable<agent> {
    return this.http.put<agent>(`${this.urlAgent}/${agent.id}`, agent,
      { headers: { 'Content-Type': 'application/json' } }).pipe(
        catchError((error) => {
          console.error('Erro na chamada updateAgent:', error);

          return throwError(() => new Error('Erro ao atualizar agente.'));
        })
      );
  }

  deleteAgent(id: number): Observable<agent> {
    return this.http.delete<agent>(`${this.urlAgent}/${id}`);
  }

  agentAddAccount(account: account, agentId: number): Observable<account> {
    return this.http.post<account>(`${this.urlAgent}/AddAccount/${agentId}`, account, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada agentAddAccount:', error);
        return throwError(() => new Error('Erro ao adicionar conta ao agente.'));
      })
    );
  }

  agentAddAddress(address: address, agentId: number): Observable<address> {
    return this.http.post<address>(`${this.urlAgent}/AddAddress/${agentId}`, address, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada agentAddAddress:', error);
        return throwError(() => new Error('Erro ao adicionar endereço ao agente.'));
      })
    );
  }

  agentAddContact(contact: contact, agentId: number): Observable<contact> {
    return this.http.post<contact>(`${this.urlAgent}/AddContact/${agentId}`, contact, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada agentAddContact:', error);
        return throwError(() => new Error('Erro ao adicionar contato ao agente.'));
      })
    );
  }

  agentUpdateAccount(account: account, agentId: number): Observable<account> {
    return this.http.put<account>(`${this.urlAgent}/UpdateAccount/${agentId}`, account, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada agentUpdateAccount:', error);
        return throwError(() => new Error('Erro ao atualizar conta do agente.'));
      })
    );
  }

  agentUpdateAddress(address: address, agentId: number, addressId: number): Observable<address> {
    return this.http.put<address>(`${this.urlAgent}/UpdateAddress/${agentId}/${addressId}`, address, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada agentUpdateAddress:', error);
        return throwError(() => new Error('Erro ao atualizar endereço do agente.'));
      })
    );
  }

  agentUpdateContact(contact: contact, agentId: number, contactId: number): Observable<contact> {
    return this.http.put<contact>(`${this.urlAgent}/UpdateContact/${agentId}/${contactId}`, contact, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada agentUpdateContact:', error);
        return throwError(() => new Error('Erro ao atualizar contato do agente.'));
      })
    );
  }
}
