import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { agent } from '../../models/agent';
import { account } from '../../models/account';

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

  deleteAgent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlAgent}/${id}`);
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
}
