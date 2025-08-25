import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { feedBack } from '../../models/feedBack';

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {

  urlFeedBack = 'https://localhost:7212/api/FeedBack';

  constructor(private http: HttpClient) {

  }

  getAllFeedBacks(): Observable<feedBack[]> {
    return this.http.get<feedBack[]>(this.urlFeedBack);
  }

  getFeedBackById(id: number): Observable<feedBack> {
    return this.http.get<feedBack>(`${this.urlFeedBack}/${id}`);
  }

  getFeedBackByListingId(idListing: number): Observable<feedBack[]> {
    return this.http.get<feedBack[]>(`${this.urlFeedBack}/GetByListingId/${idListing}`);
  }

  addFeedBack(feedBack: feedBack): Observable<feedBack> {
    return this.http.post<feedBack>(this.urlFeedBack, feedBack, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erro na chamada addFeedBack:', error);
        return throwError(() => new Error('Erro ao adicionar feedBack.'));
      })
    );

  }

  deleteFeedBack(id: number): Observable<feedBack> {
    return this.http.delete<feedBack>(`${this.urlFeedBack}/${id}`);
  }
}
