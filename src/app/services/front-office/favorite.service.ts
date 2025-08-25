import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { favorite } from '../../models/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  urlFavorite = 'https://localhost:7212/api/Favorite';

  constructor(private http: HttpClient) {


  }

  getAllFavorites(): Observable<favorite[]> {
    return this.http.get<favorite[]>(this.urlFavorite);
  }

  getFavoriteById(id: number): Observable<favorite> {
    return this.http.get<favorite>(`${this.urlFavorite}/${id}`);
  }

  deleteFavorite(id: number): Observable<favorite> {
    return this.http.delete<favorite>(`${this.urlFavorite}/${id}`);
  }

  addFavorite(idListing: number): Observable<favorite> {
    return this.http.post<favorite>(`${this.urlFavorite}/${idListing}`,
      { headers: { 'Content-Type': 'application/json' } }).pipe
      (
        catchError((error) => {
          console.error('Erro na chamada addFavorite:', error);
          return throwError(() => new Error('Erro ao adicionar favorito.'));
        })
      );
  }
}
