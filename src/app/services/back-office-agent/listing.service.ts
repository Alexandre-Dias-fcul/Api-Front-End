import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { listing } from '../../models/listing';

@Injectable({
  providedIn: 'root'
})

export class ListingService {

  urlListing = 'https://localhost:7212/api/Listing';

  constructor(private http: HttpClient) { }

  getAllListings(): Observable<listing[]> {
    return this.http.get<listing[]>(this.urlListing);
  }

  getListingById(id: number): Observable<listing> {
    return this.http.get<listing>(`${this.urlListing}/${id}`);
  }

  addListing(listing: listing): Observable<listing> {
    return this.http.post<listing>(this.urlListing, listing, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada addListing:', error);
        return throwError(() => new Error('Erro ao adicionar listing.'));
      })
    );
  }

  updateListing(listing: listing): Observable<listing> {
    return this.http.put<listing>(`${this.urlListing}/${listing.id}`, listing, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada updateListing:', error);
        return throwError(() => new Error('Erro ao atualizar listing.'));
      })
    );
  }

  deleteListing(id: number): Observable<listing> {
    return this.http.delete<listing>(`${this.urlListing}/${id}`);
  }

  selfReassign(id: number) {
    return this.http.post(`${this.urlListing}/SelfReassign/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada de selfReassign:', error);
        return throwError(() => new Error('Erro ao fazer o reassign.'));
      })
    );
  }

  reassignTo(idListing: number, idAgent: number) {
    return this.http.post(`${this.urlListing}/SelfReassignTo/${idListing}/${idAgent}`, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada de reassignTo:', error);
        return throwError(() => new Error('Erro ao fazer o reassign.'));
      })
    );
  }

  reassignBetween(idListing: number, idAgent: number) {
    return this.http.post(`${this.urlListing}/BetweenReassign/${idListing}/${idAgent}`, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada de reassignBetween:', error);
        return throwError(() => new Error('Erro ao fazer o reassign.'));
      })
    );
  }

}
