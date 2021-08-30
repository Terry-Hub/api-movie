import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
 private readonly URL = '';

  constructor(private http: HttpClient) { }

  resolveItems(): Observable<any> {
    return this.http.get(this.URL);
  }
}
