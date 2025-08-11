import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DogBreed, PaginationInfo } from '../models/dog-breed.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DogBreedsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;
  private readonly apiKey = environment.apiKey;
  private paginationSubject = new BehaviorSubject<PaginationInfo>({
    currentPage: 0,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0
  });

  paginations = this.paginationSubject.asObservable();

  getBreeds(page: number = 0, limit: number = 10): Observable<DogBreed[]> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('api_key', this.apiKey);

    return this.http.get<DogBreed[]>(this.baseUrl, { params }).pipe(
      map((breeds: DogBreed[]) => {
        this.paginationSubject.next({
          currentPage: page,
          itemsPerPage: limit,
          totalItems: 264, 
          totalPages: Math.ceil(264 / limit)
        });
        return breeds;
      })
    );
  }

  getAllBreeds(): Observable<DogBreed[]> {
    const params = new HttpParams()
      .set('api_key', this.apiKey);

    return this.http.get<DogBreed[]>(this.baseUrl, { params });
  }

  getBreedById(id: number): Observable<DogBreed> {
    const params = new HttpParams()
      .set('api_key', this.apiKey);

    return this.http.get<DogBreed>(`${this.baseUrl}/${id}`, { params });
  }
}
